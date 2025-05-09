document.addEventListener("DOMContentLoaded", function () {
    fetch('/code/fillipe/posts.json')  // Caminho para o arquivo JSON
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('posts-container');
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                postElement.innerHTML = `
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
