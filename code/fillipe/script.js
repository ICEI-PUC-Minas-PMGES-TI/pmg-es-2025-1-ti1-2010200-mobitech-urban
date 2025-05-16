document.addEventListener("DOMContentLoaded", function () {
    fetch("./posts.json")  
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('posts-container');

            // imagens
            const imagens = [
                "../assets/img/post1.webp",
                "../assets/img/post2.jpg",
                "../assets/img/post3.jpg",
                "../assets/img/post4.webp",
                "../assets/img/post5.jpg"
            ];

            posts.forEach((post, index) => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                // Se o índice for par, adiciona uma imagem correspondente da lista
                let imageHTML = '';
                if (index % 2 === 0 && index / 2 < imagens.length) {
                    imageHTML = `<img src="${imagens[index / 2]}" alt="Imagem do post">`;
                }

                // Contadores de Like/Dislike
                let likeCount = 0;
                let dislikeCount = 0;

                postElement.innerHTML = `
                    ${imageHTML}
                    <div class="post-header">
                        <h3>${post.title}</h3>
                        <span class="post-date">${post.date}</span>
                    </div>
                    <p class="post-content">${post.content}</p>
                    <p class="post-author">- ${post.author}</p>

                    <!-- Botões de Reação -->
                    <div class="reaction-buttons">
                        <button class="like-btn" data-id="${index}">Like <span class="like-count">${likeCount}</span></button>
                        <button class="dislike-btn" data-id="${index}">Dislike <span class="dislike-count">${dislikeCount}</span></button>
                    </div>
                `;

                postsContainer.appendChild(postElement);
            });

            // Adicionar eventos para os botões de like e dislike
            document.querySelectorAll('.like-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const postId = this.getAttribute('data-id');
                    const likeCountElement = this.querySelector('.like-count');
                    likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
                });
            });

            document.querySelectorAll('.dislike-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const postId = this.getAttribute('data-id');
                    const dislikeCountElement = this.querySelector('.dislike-count');
                    dislikeCountElement.textContent = parseInt(dislikeCountElement.textContent) + 1;
                });
            });
        })
        .catch(error => {
            console.error('Erro ao carregar as postagens:', error);
        });
});
