document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-prefeitura");
    const nome = document.getElementById("nome_usuario")
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const senha = document.getElementById("senha");
    const senhaConfirmar = document.getElementById("senha-confirmar");

    var perfis = JSON.parse(localStorage.getItem('usuarios')) || []

    // Máscara para telefone 
    telefone.addEventListener("input", function (e) {
        let value = telefone.value.replace(/\D/g, "").slice(0, 11);
        if (value.length <= 10) {
            telefone.value = value.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})$/, function (_, ddd, parte1, parte2) {
                let out = "";
                if (ddd) out += `(${ddd}`;
                if (parte1) out += `) ${parte1}`;
                if (parte2) out += `-${parte2}`;
                return out;
            });
        } else {
            telefone.value = value.replace(/^(\d{0,2})(\d{0,5})(\d{0,4})$/, function (_, ddd, parte1, parte2) {
                let out = "";
                if (ddd) out += `(${ddd}`;
                if (parte1) out += `) ${parte1}`;
                if (parte2) out += `-${parte2}`;
                return out;
            });
        }
    });

    // Máscara para CEP 
    cep.addEventListener("input", function () {
        let value = cep.value.replace(/\D/g, "").slice(0, 8);
        if (value.length > 5) {
            cep.value = value.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");
        } else {
            cep.value = value;
        }
        cep.style.fontSize = "16px"; 
    });

    // Funções auxiliares
    function verificarSenha() {
    if (senha.value.length < 6) {
        mostrarErro(senha, "A senha deve ter pelo menos 6 caracteres.");
        return false;
    }
    
    if (senha.value !== senhaConfirmar.value) {
        mostrarErro(senhaConfirmar, "As senhas não coincidem.");
        return false;
    }
    
    removerErro(senhaConfirmar);
    return true;
}

    function verificarTelefone() {
        const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
        if (!regex.test(telefone.value)) {
            mostrarErro(telefone, "Telefone inválido. Use o formato (XX) XXXXX-XXXX.");
            return false;
        } else {
            removerErro(telefone);
            return true;
        }
    }

    function verificarCEP() {
        const regex = /^\d{5}-\d{3}$/;
        if (!regex.test(cep.value)) {
            mostrarErro(cep, "CEP inválido. Use o formato XXXXX-XXX.");
            return false;
        } else {
            removerErro(cep);
            return true;
        }
    }

    function verificarEmail(emailStr) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(emailStr);
    }

    function mostrarErro(input, mensagem) {
        input.classList.add("erro");
        alert(mensagem); 
    }

    function removerErro(input) {
        input.classList.remove("erro");
    }

   function emailJaCadastrado(email) {
    return perfis.some(user => user.email === email);
   }


    form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validação das senhas
    if (!verificarSenha()) {
        return;
    }

    // Validação de e-mail duplicado
    if (emailJaCadastrado(email.value)) {
        mostrarErro(email, "Este e-mail já está cadastrado. Use outro.");
        return;
    }

    // Validações individuais (telefone, CEP, e-mail)
    const telValido = verificarTelefone();
    const cepValido = verificarCEP();
    const emailValido = verificarEmail(email.value);

    if (!telValido || !cepValido || !emailValido) {
        
        return;
    }

    // CADASTRO 
    let idNovo = calcularId();
    let user = {
        id: idNovo, 
        nome: nome.value.trim(),
        email: email.value,
        cep: cep.value,
        telefone: telefone.value,
        senha: senha.value
    };

    perfis.push(user);
    localStorage.setItem('usuarios', JSON.stringify(perfis));
    alert("Usuário cadastrado com sucesso!");
    form.reset();
});



   function calcularId() {
    return perfis.length ? perfis[perfis.length - 1].id + 1 : 1;
}

});