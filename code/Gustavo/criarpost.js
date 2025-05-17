document.addEventListener('DOMContentLoaded', function () {
    const PATH_CONFIG = {
        IMG_UPLOADS: '../assets/img/'
    };

    const iconeImagem = document.getElementById('image-icon');
    const inputImagem = document.getElementById('image-upload');
    const previewImagem = document.getElementById('image-preview');
    const botaoPostar = document.querySelector('.post-botton');
    const textareaPost = document.querySelector('.post-textarea');
    const iconeLocalizacao = document.querySelector('.fa-location-dot');
    
    let currentLocation = JSON.parse(localStorage.getItem('ultimaLocalizacao')) || null;

    // Função para gerar nome único para a imagem
    function generateImageName(originalName) {
        const timestamp = Date.now();
        const extension = originalName.split('.').pop();
        return `post_${timestamp}.${extension}`;
    }

// Função para geolocalização
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

    // Upload de imagem
    iconeImagem.addEventListener('click', function() {
        inputImagem.click();
    });

    inputImagem.addEventListener('change', function(e) {
        const arquivo = e.target.files[0];
        if (arquivo) {
            if (!arquivo.type.match('image.*')) {
                alert('Por favor, selecione um arquivo de imagem válido!');
                return;
            }

            const novoNome = generateImageName(arquivo.name);
            const caminhoRelativo = `${PATH_CONFIG.IMG_UPLOADS}${novoNome}`;

            // Armazena a referência da imagem
            localStorage.setItem('imagemPendente', JSON.stringify({
                nomeOriginal: arquivo.name,
                nomeArmazenado: novoNome,
                caminhoRelativo: caminhoRelativo
            }));

            // Preview da imagem
            const leitor = new FileReader();
            leitor.onload = function(evento) {
                previewImagem.innerHTML = '';
                const img = document.createElement('img');
                img.src = evento.target.result;
                img.classList.add('img-preview');

                const btnRemover = document.createElement('button');
                btnRemover.innerHTML = '×';
                btnRemover.classList.add('btn-remover-imagem');
                btnRemover.addEventListener('click', function() {
                    previewImagem.innerHTML = '';
                    inputImagem.value = '';
                    localStorage.removeItem('imagemPendente');
                });

                const container = document.createElement('div');
                container.classList.add('container-imagem');
                container.appendChild(img);
                container.appendChild(btnRemover);
                previewImagem.appendChild(container);
            };
            leitor.readAsDataURL(arquivo);
        }
    });

    // Postagem
    botaoPostar.addEventListener('click', function() {
        const texto = textareaPost.value.trim();
        const imagemPendente = JSON.parse(localStorage.getItem('imagemPendente'));
        const temImagem = inputImagem.files.length > 0 || imagemPendente;

        if (!texto && !temImagem) {
            alert('Escreva algo ou adicione uma imagem para postar!');
            return;
        }

        const novaPostagem = {
            id: Date.now(),
            texto: texto,
            imagem: imagemPendente ? imagemPendente.caminhoRelativo : null,
            localizacao: currentLocation,
            data: new Date().toISOString()
        };

        // Salva no localStorage
        let postagens = JSON.parse(localStorage.getItem('postagens')) || [];
        postagens.unshift(novaPostagem);
        localStorage.setItem('postagens', JSON.stringify(postagens));

        // Limpa o formulário
        textareaPost.value = '';
        inputImagem.value = '';
        previewImagem.innerHTML = '';
        localStorage.removeItem('imagemPendente');
        currentLocation = null;

        alert('Post criado com sucesso!');
    });
});