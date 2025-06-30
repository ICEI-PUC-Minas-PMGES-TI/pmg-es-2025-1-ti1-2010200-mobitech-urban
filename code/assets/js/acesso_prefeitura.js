document.addEventListener('DOMContentLoaded', function() {
    const btnAcessar = document.getElementById('btnAcessar');
    const senhaInput = document.getElementById('senhaPrefeitura');
    const mensagemErro = document.getElementById('mensagemErro');
    
    // Senha de acesso (em produção, use um sistema mais seguro)
    const SENHA_CORRETA = "prefeitura";
    
    btnAcessar.addEventListener('click', function() {
        // Verifica se a senha está correta
        if(senhaInput.value === SENHA_CORRETA) {
            // Armazena no sessionStorage que o usuário está autenticado
            sessionStorage.setItem('prefeituraAutenticada', 'true');
            
            // Redireciona para a página da prefeitura
            window.location.href = "prefeitura.html";
        } else {
            // Mostra mensagem de erro
            mensagemErro.style.display = 'block';
            senhaInput.focus();
            
            // Adiciona animação de shake
            senhaInput.classList.add('shake');
            setTimeout(() => {
                senhaInput.classList.remove('shake');
            }, 500);
        }
    });
    
    // Limpa a mensagem de erro quando o usuário começa a digitar
    senhaInput.addEventListener('input', function() {
        mensagemErro.style.display = 'none';
    });
    
    // Permite login com Enter
    senhaInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            btnAcessar.click();
        }
    });
});