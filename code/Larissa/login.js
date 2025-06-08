document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");

    // Função para verificar se o usuário existe
    function verificarLogin(email, senha) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        return usuarios.find(user => user.email === email && user.senha === senha);
    }

    // Função para mostrar erro
    function mostrarErro(input, mensagem) {
        input.classList.add("erro");
        alert(mensagem);
    }

    // Função para remover erro
    function removerErro(input) {
        input.classList.remove("erro");
    }

    // Função para validar email
    function verificarEmail(emailStr) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(emailStr);
    }

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Validação do email
        if (!verificarEmail(email.value)) {
            mostrarErro(email, "E-mail inválido.");
            return;
        }

        // Tentativa de login
        const usuario = verificarLogin(email.value, senha.value);
        
        if (usuario) {
            // Login bem-sucedido
            localStorage.setItem('usuarioAtual', JSON.stringify(usuario));
            alert("Login realizado com sucesso!");
            window.location.href = "home.html";
        } else {
            // Login falhou
            mostrarErro(email, "E-mail ou senha incorretos.");
            mostrarErro(senha, "E-mail ou senha incorretos.");
        }
    });

    // Remover classe de erro quando o usuário começar a digitar
    email.addEventListener("input", () => removerErro(email));
    senha.addEventListener("input", () => removerErro(senha));
}); 