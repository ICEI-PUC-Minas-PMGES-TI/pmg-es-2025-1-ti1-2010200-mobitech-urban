document.addEventListener('DOMContentLoaded', function () {

    const iconeImagem = document.getElementById('image-icon');
const inputImagem = document.getElementById('image-upload');
const previewImagem = document.getElementById('image-preview');
const botaoPostar = document.querySelector('.post-botton');
const textareaPost = document.querySelector('.post-textarea');
let currentLocation = null;


// Função para geolocalização
const iconeLocalizacao = document.querySelector('.fa-location-dot');
iconeLocalizacao.addEventListener('click', function () {

    if (!navigator.geolocation) {
        alert('Seu navegador não suporta geolocalização');
        return;
    }


    const permissao = confirm('Deseja ativar a localização? Isso nos ajuda a sugerir lugares próximos a você.');

    if (permissao) {
        // Recebe a localização
        navigator.geolocation.getCurrentPosition(
            function (posicao) {
                const latitude = posicao.coords.latitude;
                const longitude = posicao.coords.longitude;
                alert(`Localização ativada com sucesso!`);
                currentLocation = {
                    latitude: posicao.coords.latitude,
                    longitude: posicao.coords.longitude
                };
            },
            function (erro) {
                alert('Não foi possível obter sua localização: ' + erro.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }
});

// Função para upload de imagem
iconeImagem.addEventListener('click', function () {
    inputImagem.click();
});

inputImagem.addEventListener('change', function (e) {
    const arquivo = e.target.files[0];
    if (arquivo) {
        // Verifica se é uma imagem
        if (!arquivo.type.match('image.*')) {
            alert('Por favor, selecione um arquivo de imagem válido!');
            return;
        }

        const leitor = new FileReader();
        leitor.onload = function (evento) {
            previewImagem.innerHTML = '';

            const img = document.createElement('img');
            img.src = evento.target.result;
            img.classList.add('img-preview');

            // Botão para remover a imagem
            const btnRemover = document.createElement('button');
            btnRemover.innerHTML = '×';
            btnRemover.classList.add('btn-remover-imagem');
            btnRemover.addEventListener('click', function () {
                previewImagem.innerHTML = '';
                inputImagem.value = '';
            });

            const containerImagem = document.createElement('div');
            containerImagem.classList.add('container-imagem');
            containerImagem.appendChild(img);
            containerImagem.appendChild(btnRemover);

            previewImagem.appendChild(containerImagem);
        };
        leitor.readAsDataURL(arquivo);
    }
});

// Função para postar
botaoPostar.addEventListener('click', function () {
    const texto = textareaPost.value.trim();
    const temImagem = inputImagem.files.length > 0;

    if (!texto && !temImagem) {
        alert('Escreva algo ou adicione uma imagem para postar!');
        return;
    }

    // Cria nova postagem
    const novaPostagem = {
        "id-postagem": Math.floor(Math.random() * 10000),
        "nome_usuario": "Usuário Atual",
        "texto": texto,
        "imagem_url": temImagem ? URL.createObjectURL(inputImagem.files[0]) : null,
        "localizacao": currentLocation,
        "data": new Date().toISOString()
    };

    let postagens = JSON.parse(localStorage.getItem('postagens_simuladas')) || [];
    
    postagens.unshift(novaPostagem); 

    localStorage.setItem('postagens_simuladas', JSON.stringify(postagens));

    // Limpa o formulário
    textareaPost.value = '';
    inputImagem.value = '';
    previewImagem.innerHTML = '';
    currentLocation = null;

    alert('Post criado com sucesso!');
    console.log('Postagens atualizadas:', postagens);
    
    if(typeof renderizarPostagens === 'function') {
        renderizarPostagens(postagens);
    }
});
});