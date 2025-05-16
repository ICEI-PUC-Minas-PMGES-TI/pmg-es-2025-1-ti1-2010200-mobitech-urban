document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-prefeitura");
    const nome = document.getElementById("nome_usuario")
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const senha = document.getElementById("senha");
    const senhaConfirmar = document.getElementById("senha-confirmar");

    var perfis = JSON.parse(localStorage.getItem('usuarios')) || []

    // Máscara para telefone com correção de apagamento
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

    // Máscara para CEP com ajuste para manter o tamanho da fonte estável
    cep.addEventListener("input", function () {
        let value = cep.value.replace(/\D/g, "").slice(0, 8);
        if (value.length > 5) {
            cep.value = value.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");
        } else {
            cep.value = value;
        }
        cep.style.fontSize = "16px"; // Ajuste visual fixo
    });

    // Funções auxiliares
    function verificarSenha() {
        if (senha.value !== senhaConfirmar.value) {
            mostrarErro(senhaConfirmar, "As senhas não coincidem.");
            return false;
        } else {
            removerErro(senhaConfirmar);
            return true;
        }
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
        alert(mensagem); // você pode trocar por inserção de mensagem na interface
    }

    function removerErro(input) {
        input.classList.remove("erro");
    }

    // Submissão do formulário
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const senhaOK = verificarSenha();
        const telOK = verificarTelefone();
        const cepOK = verificarCEP();
        const emailOK = verificarEmail(email.value);

        if (!emailOK) {
            mostrarErro(email, "E-mail inválido.");
        } else {
            removerErro(email);
        }

        if (senhaOK && telOK && cepOK && emailOK) {
            console.log("Formulário validado com sucesso");
            // só envia se tudo estiver OK
        }

        
        let idNovo = calcularId();
        let user = {
            id: idNovo, 
            nome: nome.value,
            email: email.value,
            cep: cep.value,
            telefone: telefone.value,
            senha: senha.value
        }

        perfis.push(user);
        localStorage.setItem('usuarios', JSON.stringify(perfis))

        alert("Usuário cadastrado com sucesso!")
         form.submit();
    });

   function calcularId() {
    return perfis.length ? perfis[perfis.length - 1].id + 1 : 1;
}

});