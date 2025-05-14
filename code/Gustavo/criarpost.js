document.addEventListener('DOMContentLoaded', function() {

    const iconeLocalizacao = document.querySelector('.fa-location-dot');
    iconeLocalizacao.addEventListener('click', function() {

        if (!navigator.geolocation) {
            alert('Seu navegador não suporta geolocalização');
            return;
        }
        

        const permissao = confirm('Deseja ativar a localização? Isso nos ajuda a sugerir lugares próximos a você.');
        
        if (permissao) {
            // Recebe a localização
            navigator.geolocation.getCurrentPosition(
                function(posicao) {
                    const latitude = posicao.coords.latitude;
                    const longitude = posicao.coords.longitude;
                    alert(`Localização ativada com sucesso!`);
                    
                },
                function(erro) {
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
    
    // Funcionalidade do botão Postar
    const botaoPostar = document.querySelector('.post-botton');
    botaoPostar.addEventListener('click', function() {
        const textoPost = document.querySelector('.post-textarea').value;
        
        if (!textoPost.trim()) {
            alert('Escreva algo para que seja possível postar!');
            return;
        }
        

        alert('Post criado com sucesso!');
        document.querySelector('.post-textarea').value = '';
        

        const novaPostagem = {
            conteudo: textoPost,
            data: new Date().toISOString()
        };
        console.log('Nova postagem:', novaPostagem);
    });
});