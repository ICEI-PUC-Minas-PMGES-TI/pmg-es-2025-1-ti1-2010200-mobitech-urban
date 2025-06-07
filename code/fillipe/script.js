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

    // Carrega posts do localStorage ou do JSON inicial
    function loadPosts() {
        const savedPosts = localStorage.getItem('userPosts');
        if (savedPosts) {
            posts = JSON.parse(savedPosts);
        } else {
            // Carrega posts iniciais do JSON
            fetch('./posts.json')
                .then(response => {
                    if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
                    return response.json();
                })
                .then(loadedPosts => {
                    posts = loadedPosts.map(post => ({
                        ...post,
                        likes: Number(post.likes) || 0,
                        userCreated: false
                    }));
                    renderPosts();
                })
                .catch(error => {
                    console.error('Erro ao carregar posts:', error);
                    postsContainer.innerHTML = `<p class="error">Erro ao carregar postagens. Recarregue a página.</p>`;
                });
        }
        renderPosts();
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
                savePosts();
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
        const commentObj = {
            id: Date.now(),
            text: commentText,
            timestamp: new Date().toISOString()
        };
        
        // Carrega comentários existentes
        const savedComments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
        savedComments.push(commentObj);
        
        // Salva no localStorage
        localStorage.setItem(`comments_${postId}`, JSON.stringify(savedComments));
        
        // Adiciona ao DOM
        addCommentToList(commentListElement, commentObj);
    }

    // Adiciona comentário na lista do DOM (atualizada para edição)
    function addCommentToList(commentListElement, commentObj) {
        const li = document.createElement('li');
        li.dataset.commentId = commentObj.id;
        li.innerHTML = `
            <span class="comment-text">${commentObj.text}</span>
            <div class="comment-actions">
                <button class="edit-comment-btn" data-comment-id="${commentObj.id}">✏️</button>
                <button class="delete-comment-btn" data-comment-id="${commentObj.id}">❌</button>
            </div>
            <div class="edit-comment-container" style="display:none;">
                <textarea class="edit-comment-input">${commentObj.text}</textarea>
                <button class="save-edit-btn" data-comment-id="${commentObj.id}">Salvar</button>
                <button class="cancel-edit-btn">Cancelar</button>
            </div>
        `;
        
        // Configura o botão de exclusão
        const deleteBtn = li.querySelector('.delete-comment-btn');
        deleteBtn.addEventListener('click', function() {
            const commentId = parseInt(this.getAttribute('data-comment-id'));
            const postId = commentListElement.closest('.comment-section').getAttribute('data-id');
            deleteComment(postId, commentId, commentListElement);
        });
        
        // Configura o botão de edição (novo)
        const editBtn = li.querySelector('.edit-comment-btn');
        editBtn.addEventListener('click', function() {
            const commentItem = this.closest('li');
            const editContainer = commentItem.querySelector('.edit-comment-container');
            const commentText = commentItem.querySelector('.comment-text');
            
            // Mostra o editor e esconde o texto
            commentText.style.display = 'none';
            editContainer.style.display = 'block';
        });
        
        // Configura o botão de cancelar edição (novo)
        const cancelBtn = li.querySelector('.cancel-edit-btn');
        cancelBtn.addEventListener('click', function() {
            const commentItem = this.closest('li');
            const editContainer = commentItem.querySelector('.edit-comment-container');
            const commentText = commentItem.querySelector('.comment-text');
            
            // Esconde o editor e mostra o texto original
            editContainer.style.display = 'none';
            commentText.style.display = 'inline';
        });
        
        // Configura o botão de salvar edição (novo)
        const saveBtn = li.querySelector('.save-edit-btn');
        saveBtn.addEventListener('click', function() {
            const commentId = parseInt(this.getAttribute('data-comment-id'));
            const postId = commentListElement.closest('.comment-section').getAttribute('data-id');
            const commentItem = this.closest('li');
            const editInput = commentItem.querySelector('.edit-comment-input');
            const newText = editInput.value.trim();
            
            if (newText === '') {
                alert('O comentário não pode estar vazio');
                return;
            }
            
            updateComment(postId, commentId, newText, commentListElement);
        });
        
        commentListElement.appendChild(li);
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

    // Função para salvar posts no localStorage
    function savePosts() {
        localStorage.setItem('userPosts', JSON.stringify(posts));
    }

    // Evento para abrir o modal de criação de post
    createPostBtn.addEventListener('click', () => {
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
    submitPostBtn.addEventListener('click', function() {
        const title = document.getElementById('postTitle').value.trim();
        const content = document.getElementById('postContent').value.trim();
        
        if (!title || !content) {
            alert('Por favor, preencha pelo menos o título e o conteúdo');
            return;
        }

        const newPost = {
            id: Date.now(),
            title,
            content,
            date: new Date().toISOString(),
            likes: 0,
            userCreated: true
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

        posts.unshift(post); // Adiciona no início do array
        savePosts();
        renderPosts();
        postModal.hide();
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
});