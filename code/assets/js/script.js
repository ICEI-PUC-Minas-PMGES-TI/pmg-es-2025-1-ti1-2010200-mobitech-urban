document.addEventListener("DOMContentLoaded", function () {
    // Elementos do DOM
    const postsContainer = document.getElementById('posts-container');
    const createPostBtn = document.getElementById('createPostBtn');
    const postModal = new bootstrap.Modal(document.getElementById('postModal'));
    const postForm = document.getElementById('postForm');
    const submitPostBtn = document.getElementById('submitPostBtn');
    const postImage = document.getElementById('postImage');
    const imagePreview = document.getElementById('imagePreview');
    const includeLocation = document.getElementById('includeLocation');
    const locationInfo = document.getElementById('locationInfo');
    
    let posts = [];
    let currentLocation = null;

    // Carrega posts apenas da API
    async function loadPosts() {
        try {
            const response = await fetch('http://localhost:3000/posts');
            if (response.ok) {
                posts = await response.json();
                renderPosts();
            } else {
                throw new Error('Servidor não disponível');
            }
        } catch (error) {
            postsContainer.innerHTML = `<p class="error">Erro ao carregar postagens da API. Verifique se o servidor está rodando.<br><small>${error.message}</small></p>`;
        }
    }

    // Renderiza os posts na tela
    function renderPosts() {
        postsContainer.innerHTML = '';

        // Ordena posts por data (mais recente primeiro)
        const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';

            // Formata a data
            const postDate = new Date(post.date);
            const formattedDate = postDate.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            // HTML do post (com botão de exclusão para posts de usuário)
            postElement.innerHTML = `
                ${post.image ? `<img src="${post.image}" alt="Imagem do post" class="post-image">` : ''}
                ${post.problemTypes ? `
                    <div class="problem-types top-right">
                        <strong>Tipos de Problema:</strong>
                        <div class="problem-tags">
                            ${post.problemTypes.map(type => `<span class="problem-tag">${type}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                <div class="post-header">
                    <h3>${post.title}</h3>
                    ${post.userCreated ? `<button class="delete-post-btn" data-id="${post.id}">🗑️</button>` : ''}
                    <span class="post-date">${formattedDate}</span>
                    ${post.location ? `<span class="post-location">📍 ${post.location}</span>` : ''}
                </div>
                <p class="post-content">${post.content}</p>
                <p class="post-author">- ${post.author || 'Usuário'}</p>
                <div class="reaction-buttons">
                    <button class="like-btn ${localStorage.getItem(`like_${post.id}`) ? 'liked' : ''}" 
                            data-id="${post.id}">
                        👍 <span class="like-count">${post.likes}</span>
                    </button>
                </div>
                <div class="comment-section" data-id="${post.id}">
                    <button class="comment-toggle-btn">💬 Comentar</button>
                    <div class="comment-box" style="display:none;">
                        <textarea class="comment-input" placeholder="Digite seu comentário"></textarea>
                        <button class="submit-comment-btn">Enviar</button>
                        <ul class="comment-list"></ul>
                    </div>
                </div>
            `;

            postsContainer.appendChild(postElement);
        });

        setupInteractions();
        setupCommentEvents(); // Garante que os comentários são configurados
    }

    // Configura interações (likes e exclusão)
    function setupInteractions() {
        // Likes
        document.querySelectorAll('.like-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Permitir like só para usuário logado
                const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
                if (!isLoggedIn) {
                    alert('Você precisa estar logado para curtir posts!');
                    return;
                }
                const postId = this.getAttribute('data-id');
                const post = posts.find(p => p.id == postId);
                if (!post) return;
                const isLiked = localStorage.getItem(`like_${postId}`);
                const likeCountElement = this.querySelector('.like-count');
                if (isLiked) {
                    post.likes = Math.max(0, post.likes - 1);
                    localStorage.removeItem(`like_${postId}`);
                    this.classList.remove('liked');
                } else {
                    post.likes++;
                    localStorage.setItem(`like_${postId}`, 'true');
                    this.classList.add('liked');
                }
                likeCountElement.textContent = post.likes;
                updatePost(postId, { likes: post.likes });
            });
        });

        // Exclusão de posts
        document.querySelectorAll('.delete-post-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const postId = parseInt(this.getAttribute('data-id'));
                
                if (confirm('Tem certeza que deseja excluir este post?')) {
                    // Remove o post do array
                    posts = posts.filter(post => post.id !== postId);
                    
                    // Salva as alterações
                    savePosts();
                    
                    // Re-renderiza os posts
                    renderPosts();
                    
                    // Remove comentários e likes associados
                    localStorage.removeItem(`comments_${postId}`);
                    localStorage.removeItem(`like_${postId}`);
                }
            });
        });
    }

    // Configura o sistema de comentários (atualizado para incluir edição)
    function setupCommentEvents() {
        // Alternar a exibição da caixa de comentários
        document.querySelectorAll('.comment-toggle-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const commentBox = this.nextElementSibling;
                // Checa login
                const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
                if (!isLoggedIn) {
                    alert('Você precisa estar logado para comentar!');
                    return;
                }
                commentBox.style.display = commentBox.style.display === 'none' ? 'block' : 'none';
                // Carrega comentários quando aberto
                if (commentBox.style.display === 'block') {
                    const postId = this.closest('.comment-section').getAttribute('data-id');
                    loadComments(postId, commentBox.querySelector('.comment-list'));
                }
            });
        });

        // Envio de comentários
        document.querySelectorAll('.submit-comment-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Checa login
                const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
                if (!isLoggedIn) {
                    alert('Você precisa estar logado para comentar!');
                    return;
                }
                const commentSection = this.closest('.comment-section');
                const postId = commentSection.getAttribute('data-id');
                const commentInput = commentSection.querySelector('.comment-input');
                const commentList = commentSection.querySelector('.comment-list');
                const commentText = commentInput.value.trim();
                if (commentText === '') return;
                // Adiciona o novo comentário
                addComment(postId, commentText, commentList);
                // Limpa o campo de input
                commentInput.value = '';
            });
        });
    }

    // Carrega comentários para um post
    function loadComments(postId, commentListElement) {
        const savedComments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
        commentListElement.innerHTML = '';
        
        savedComments.forEach(comment => {
            addCommentToList(commentListElement, comment);
        });
    }

    // Adiciona um novo comentário
    function addComment(postId, commentText, commentListElement) {
        // Recupera o nome do usuário logado
        let userName = 'Usuário';
        const userEmail = localStorage.getItem('userEmail');
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (userEmail) {
            const user = usuarios.find(u => u.email === userEmail);
            if (user && user.nome) userName = user.nome;
        }
        const commentObj = {
            id: Date.now(),
            text: commentText,
            timestamp: new Date().toISOString(),
            user: userName
        };
        // Carrega comentários existentes
        const savedComments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
        savedComments.push(commentObj);
        // Salva no localStorage
        localStorage.setItem(`comments_${postId}`, JSON.stringify(savedComments));
        // Adiciona ao DOM
        addCommentToList(commentListElement, commentObj);
    }

    // Adiciona comentário na lista do DOM (layout tradicional, sem ponto, sem coração)
    function addCommentToList(commentListElement, commentObj) {
        function timeAgo(dateString) {
            const now = new Date();
            const commentDate = new Date(dateString);
            const diffMs = now - commentDate;
            const diffMin = Math.floor(diffMs / 60000);
            if (diffMin < 1) return 'agora';
            if (diffMin < 60) return `${diffMin}m`;
            const diffH = Math.floor(diffMin / 60);
            if (diffH < 24) return `${diffH}h`;
            const diffD = Math.floor(diffH / 24);
            return `${diffD}d`;
        }
        const userName = commentObj.user || 'Usuário';
        const timeString = timeAgo(commentObj.timestamp);
        // Cria o elemento do comentário (sem ponto, sem coração)
        const div = document.createElement('div');
        div.className = 'comment-list-item';
        div.innerHTML = `
            <div class="comment-header"><strong>${userName}</strong> <span class="comment-time">${timeString}</span></div>
            <div class="comment-body">${commentObj.text}</div>
            <div class="comment-actions">
                <button class="edit-comment-btn" data-comment-id="${commentObj.id}">✏️</button>
                <button class="delete-comment-btn" data-comment-id="${commentObj.id}">❌</button>
            </div>
        `;
        // Configura o botão de exclusão
        const deleteBtn = div.querySelector('.delete-comment-btn');
        deleteBtn.addEventListener('click', function() {
            const commentId = parseInt(this.getAttribute('data-comment-id'));
            const postId = commentListElement.closest('.comment-section').getAttribute('data-id');
            deleteComment(postId, commentId, commentListElement);
        });
        // Configura o botão de edição
        const editBtn = div.querySelector('.edit-comment-btn');
        editBtn.addEventListener('click', function() {
            const commentId = parseInt(this.getAttribute('data-comment-id'));
            const postId = commentListElement.closest('.comment-section').getAttribute('data-id');
            const comment = JSON.parse(localStorage.getItem(`comments_${postId}`)).find(c => c.id === commentId);
            const newText = prompt('Editar comentário:', comment.text);
            if (newText !== null && newText.trim() !== '') {
                updateComment(postId, commentId, newText, commentListElement);
            }
        });
        commentListElement.appendChild(div);
    }

    // Função para atualizar um comentário (nova)
    function updateComment(postId, commentId, newText, commentListElement) {
        let savedComments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
        const commentIndex = savedComments.findIndex(c => c.id === commentId);
        
        if (commentIndex !== -1) {
            // Atualiza o texto e o timestamp
            savedComments[commentIndex].text = newText;
            savedComments[commentIndex].timestamp = new Date().toISOString();
            
            // Atualiza o localStorage
            localStorage.setItem(`comments_${postId}`, JSON.stringify(savedComments));
            
            // Recarrega os comentários
            loadComments(postId, commentListElement);
        }
    }

    // Exclui um comentário
    function deleteComment(postId, commentId, commentListElement) {
        let savedComments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
        savedComments = savedComments.filter(c => c.id !== commentId);
        
        // Atualiza o localStorage
        localStorage.setItem(`comments_${postId}`, JSON.stringify(savedComments));
        
        // Recarrega os comentários
        loadComments(postId, commentListElement);
    }

    // Função para salvar posts na API
    async function savePosts() {
        alert('Salvar posts em massa não é suportado. Use apenas a API para criar/editar posts individualmente.');
    }

    // Função para adicionar novo post na API
    async function addNewPost(postData) {
        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            });
            if (response.ok) {
                await loadPosts();
                return await response.json();
            } else {
                throw new Error('Erro ao salvar no servidor');
            }
        } catch (error) {
            alert('Erro ao salvar post na API. Verifique se o servidor está rodando.');
            return null;
        }
    }

    // Função para atualizar post (likes, etc.) na API
    async function updatePost(postId, updates) {
        try {
            const postIndex = posts.findIndex(p => p.id == postId);
            if (postIndex === -1) return;
            const updatedPost = { ...posts[postIndex], ...updates };
            await fetch(`http://localhost:3000/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPost)
            });
            posts[postIndex] = updatedPost;
        } catch (error) {
            alert('Erro ao atualizar post na API. Verifique se o servidor está rodando.');
        }
    }

    // Exclusão de posts na API
    async function deletePost(postId) {
        try {
            await fetch(`http://localhost:3000/posts/${postId}`, {
                method: 'DELETE'
            });
            await loadPosts();
        } catch (error) {
            alert('Erro ao deletar post na API. Verifique se o servidor está rodando.');
        }
    }

    // Evento para abrir o modal de criação de post
    createPostBtn.addEventListener('click', () => {
        // Permitir criar post só para usuário logado
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        if (!isLoggedIn) {
            alert('Você precisa estar logado para criar um post!');
            return;
        }
        postForm.reset();
        imagePreview.innerHTML = '';
        locationInfo.classList.add('d-none');
        postModal.show();
    });

    // Preview da imagem selecionada
    postImage.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imagePreview.innerHTML = `<img src="${event.target.result}" alt="Pré-visualização">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Obter localização
    includeLocation.addEventListener('change', function() {
        if (this.checked) {
            if (navigator.geolocation) {
                locationInfo.textContent = "Obtendo localização...";
                locationInfo.classList.remove('d-none');
                
                navigator.geolocation.getCurrentPosition(
                    position => {
                        currentLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        locationInfo.textContent = `Localização obtida: ${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`;
                    },
                    error => {
                        locationInfo.textContent = "Não foi possível obter a localização: " + error.message;
                        this.checked = false;
                    }
                );
            } else {
                locationInfo.textContent = "Geolocalização não suportada pelo navegador";
                locationInfo.classList.remove('d-none');
                this.checked = false;
            }
        } else {
            currentLocation = null;
            locationInfo.classList.add('d-none');
        }
    });

    // Submeter novo post
    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('postTitle').value.trim();
        const content = document.getElementById('postContent').value.trim();
        
        // Capturar tipos de problema selecionados
        const selectedProblemTypes = [];
        const problemTypeCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="problemType"]');
        
        problemTypeCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                let problemType = checkbox.value;
                
                // Tratar casos especiais
                if (problemType === 'Outros') {
                    const otherInput = document.getElementById('otherProblemInput');
                    if (otherInput && otherInput.value.trim()) {
                        problemType = otherInput.value.trim();
                    }
                } else if (problemType === 'Enchente') {
                    const floodAddress = document.getElementById('floodAddressInput');
                    if (floodAddress && floodAddress.value.trim()) {
                        problemType = `Enchente - ${floodAddress.value.trim()}`;
                    }
                }
                
                selectedProblemTypes.push(problemType);
            }
        });
        
        // Recupera o nome do usuário logado
        let authorName = 'Usuário';
        const userEmail = localStorage.getItem('userEmail');
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (userEmail) {
            const user = usuarios.find(u => u.email === userEmail);
            if (user && user.nome) authorName = user.nome;
        }
        
        if (!title || !content) {
            alert('Por favor, preencha pelo menos o título e o conteúdo');
            return;
        }
        
        if (selectedProblemTypes.length === 0) {
            alert('Por favor, selecione pelo menos um tipo de problema');
            return;
        }
        
        const newPost = {
            id: Date.now(),
            title,
            content,
            date: new Date().toISOString(),
            likes: 0,
            userCreated: true,
            author: authorName,
            problemTypes: selectedProblemTypes
        };
        
        // Adicionar imagem se existir
        if (postImage.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                newPost.image = e.target.result;
                finishPostCreation(newPost);
            };
            reader.readAsDataURL(postImage.files[0]);
        } else {
            finishPostCreation(newPost);
        }
    });

    function finishPostCreation(post) {
        // Adicionar localização se existir
        if (includeLocation.checked && currentLocation) {
            post.location = `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`;
        }

        // Salvar post na API
        addNewPost(post).then(result => {
            if (result) {
                // Salvar estatísticas dos problemas para a prefeitura
                saveProblemStatistics(post.problemTypes);
                postModal.hide();
            }
        });
    }

    // Função para salvar estatísticas dos problemas
    async function saveProblemStatistics(problemTypes) {
        // Usar o sistema de estatísticas global se disponível
        if (typeof window.problemStatistics !== 'undefined') {
            await window.problemStatistics.addProblems(problemTypes, post.author || 'Usuário', post.location || null);
        } else {
            // Fallback para o sistema antigo
            let problemStats = JSON.parse(localStorage.getItem('problemStatistics')) || {};
            
            problemTypes.forEach(problemType => {
                if (problemStats[problemType]) {
                    problemStats[problemType]++;
                } else {
                    problemStats[problemType] = 1;
                }
            });
            
            localStorage.setItem('problemStatistics', JSON.stringify(problemStats));
            
            let problemHistory = JSON.parse(localStorage.getItem('problemHistory')) || [];
            const problemRecord = {
                id: Date.now(),
                date: new Date().toISOString(),
                problemTypes: problemTypes,
                author: post.author || 'Usuário',
                location: post.location || null
            };
            problemHistory.push(problemRecord);
            localStorage.setItem('problemHistory', JSON.stringify(problemHistory));
        }
    }

    // Função de busca
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    function handleSearch() {
        const term = searchInput.value.toLowerCase();
        document.querySelectorAll('.post').forEach(post => {
            const text = post.textContent.toLowerCase();
            post.style.display = text.includes(term) ? 'block' : 'none';
        });
    }

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', handleSearch);
        searchInput.addEventListener('keyup', (e) => e.key === 'Enter' && handleSearch());
    }

    // Inicializa a aplicação
    loadPosts();

    const settingsIcon = document.getElementById('settings-icon-link');
    const userPopup = document.getElementById('user-popup');

    // Exibe o ícone de configurações só se estiver logado
    if (settingsIcon) {
        if (localStorage.getItem('userLoggedIn') === 'true') {
            settingsIcon.style.display = 'flex';
        } else {
            settingsIcon.style.display = 'none';
        }
    }

    // Mostra o pop-up ao clicar no ícone de configurações
    if (settingsIcon && userPopup) {
        settingsIcon.addEventListener('click', function(e) {
            e.preventDefault();
            const email = localStorage.getItem('userEmail') || 'usuário@exemplo.com';
            userPopup.querySelector('.user-email').textContent = email;
            userPopup.style.display = userPopup.style.display === 'block' ? 'none' : 'block';
        });

        // Fecha popup ao clicar fora
        document.addEventListener('click', function(e) {
            if (!userPopup.contains(e.target) && !settingsIcon.contains(e.target)) {
                userPopup.style.display = 'none';
            }
        });

        // Botão de logout
        userPopup.querySelector('.user-logout').addEventListener('click', function() {
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userEmail');
            window.location.href = 'pag_login.html';
        });

        // Botão de alterar senha
        userPopup.querySelector('.user-change-password').addEventListener('click', function() {
            window.location.href = 'alterar_senha.html';
        });
    }
});