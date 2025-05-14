document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-prefeitura");
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const senha = document.getElementById("senha");
    const senhaConfirmar = document.getElementById("senha-confirmar");

    // Máscara para telefone
    telefone.addEventListener("input", function () {
        let value = telefone.value.replace(/\D/g, "");

        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 10) {
            telefone.value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
        } else if (value.length > 5) {
            telefone.value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
        } else if (value.length > 2) {
            telefone.value = value.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
        } else {
            telefone.value = value.replace(/^(\d{0,2})$/, "($1");
        }
    });

    // Máscara para CEP
    cep.addEventListener("input", function () {
        let value = cep.value.replace(/\D/g, "");
        if (value.length > 8) value = value.slice(0, 8);
        if (value.length > 5) {
            cep.value = value.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");
        } else {
            cep.value = value;
        }
    });

    // Validação ao submeter o formulário
    form.addEventListener("submit", function (e) {
        let erros = [];

        // Validação de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            erros.push("E-mail inválido.");
        }

        // Validação de telefone
        const telefoneRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
        if (!telefoneRegex.test(telefone.value)) {
            erros.push("Telefone inválido. Use o formato (XX) XXXXX-XXXX.");
        }

        // Validação de CEP
        const cepRegex = /^\d{5}-\d{3}$/;
        if (!cepRegex.test(cep.value)) {
            erros.push("CEP inválido. Use o formato XXXXX-XXX.");
        }

        // Verificação de senha
        if (senha.value !== senhaConfirmar.value) {
            erros.push("As senhas não coincidem.");
        }

        if (erros.length > 0) {
            e.preventDefault();
            alert(erros.join("\n"));
        }
    });
});