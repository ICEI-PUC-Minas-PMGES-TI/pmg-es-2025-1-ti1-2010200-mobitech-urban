document.addEventListener("DOMContentLoaded", function () {
    // elementos do DOM
    const postsContainer = document.getElementById('posts-container');
    let posts = [];

    // carrega posts do json
    fetch('./posts.json')
        .then(response => {
            if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
            return response.json();
        })
        .then(loadedPosts => {
            // Garante que likes são números
            posts = loadedPosts.map(post => ({
                ...post,
                likes: Number(post.likes) || 0
            }));
            renderPosts();
        })
        .catch(error => {
            console.error('Erro ao carregar posts:', error);
            postsContainer.innerHTML = `<p class="error">Erro ao carregar postagens. Recarregue a página.</p>`;
        });

    // renderiza os posts
    function renderPosts() {
        postsContainer.innerHTML = '';
        
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';

            // imagem do post 
            const imageHTML = post.image ? `
                <img src="${post.image}" 
                     alt="Imagem: ${post.title}"
                     class="post-image"
                     onerror="this.remove()">` : '';

            // HTML do post
            postElement.innerHTML = `
                ${imageHTML}
                <div class="post-header">
                    <h3>${post.title}</h3>
                    <span class="post-date">${post.date}</span>
                </div>
                <p class="post-content">${post.content}</p>
                <p class="post-author">- ${post.author}</p>
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

        // eventos para os botoes de like
        document.querySelectorAll('.like-btn').forEach(button => {
            button.addEventListener('click', function() {
                const postId = parseInt(this.getAttribute('data-id'));
                const post = posts.find(p => p.id === postId);
                const likeCountElement = this.querySelector('.like-count');
                
                if (!post) return;

                // Verifica se já está curtido
                const isLiked = localStorage.getItem(`like_${postId}`);
                
                if (isLiked) {
                    // Remove like (garantindo que não vá para negativo)
                    post.likes = Math.max(0, post.likes - 1);
                    localStorage.removeItem(`like_${postId}`);
                    this.classList.remove('liked');
                } else {
                    // Adiciona like
                    post.likes++;
                    localStorage.setItem(`like_${postId}`, 'true');
                    this.classList.add('liked');
                }

                likeCountElement.textContent = post.likes;
                
                // DEBUG: Mostra no console a alteração
                console.log(`Post ${postId}: Likes = ${post.likes}`, typeof post.likes);
            });
        });
    }
});