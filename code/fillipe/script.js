document.addEventListener("DOMContentLoaded", function () {
    fetch('/code/fillipe/posts.json')  // Caminho para o arquivo JSON
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('posts-container');

            // Lista com 5 caminhos diferentes para imagens
            const imagens = [
                "/code/assets/img/post1.webp",
                "/code/assets/img/post2.jpg",
                "/code/assets/img/post3.jpg",
                "/code/assets/img/post4.webp",
                "/code/assets/img/post5.jpg"
            ];

            posts.forEach((post, index) => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                // Se o índice for par, adiciona uma imagem correspondente da lista
                let imageHTML = '';
                if (index % 2 === 0 && index / 2 < imagens.length) {
                    imageHTML = `<img src="${imagens[index / 2]}" alt="Imagem do post">`;
                }

                postElement.innerHTML = `
                    ${imageHTML}
                    <div class="post-header">
                        <h3>${post.title}</h3>
                        <span class="post-date">${post.date}</span>
                    </div>
                    <p class="post-content">${post.content}</p>
                    <p class="post-author">- ${post.author}</p>
                `;

                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar as postagens:', error);
        });
});
