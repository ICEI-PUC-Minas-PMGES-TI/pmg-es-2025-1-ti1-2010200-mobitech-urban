document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-prefeitura");
    const nome = document.getElementById("nome_usuario");
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const bairro = document.getElementById("bairro");
    const senha = document.getElementById("senha");
    const senhaConfirmar = document.getElementById("senha-confirmar");

    var perfis = JSON.parse(localStorage.getItem('usuarios')) || [];

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

  // Função para buscar o bairro pelo CEP 
async function buscarBairroPorCEP(cepValue) {
    try {
        // Mostrar loading
        bairro.placeholder = "Buscando...";
        bairro.disabled = true;
        cep.disabled = true;

        const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
        const data = await response.json();

        if (data.erro) {
            mostrarErro(cep, "CEP não encontrado.");
            bairro.value = "";
        } else if (data.localidade.toUpperCase() !== "BELO HORIZONTE") {
            mostrarErro(cep, "Este CEP não pertence a Belo Horizonte. Insira um CEP válido para BH.");
            bairro.value = "";
        } else {
            // CEP válido (de BH)
            bairro.value = data.bairro || "(Bairro não especificado)";
            removerErro(cep);
        }
    } catch (error) {
        mostrarErro(cep, "Erro ao buscar CEP. Tente novamente.");
        console.error("Erro na API ViaCEP:", error);
    } finally {
        // Resetar estado dos campos
        bairro.placeholder = "";
        bairro.disabled = false;
        cep.disabled = false;
    }
}

// Máscara para CEP e busca automática 
cep.addEventListener("input", function() {
    let value = cep.value.replace(/\D/g, "").slice(0, 8);
    if (value.length > 5) {
        cep.value = value.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");
    } else {
        cep.value = value;
    }
    
    // Busca automática quando o CEP estiver completo
    if (value.length === 8) {
        buscarBairroPorCEP(value);
    }
});

// Função de verificação do CEP para o submit
function verificarCEP() {
    const cepValue = cep.value.replace(/\D/g, '');
    if (cepValue.length !== 8) {
        mostrarErro(cep, "CEP inválido (8 dígitos necessários)");
        return false;
    }
    
    // Verifica se o bairro foi preenchido (indica que o CEP é válido)
    if (!bairro.value || bairro.value === "(Bairro não especificado)") {
        mostrarErro(cep, "CEP inválido ou não pertence a BH");
        return false;
    }
    
    return true;
}


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

        // Validações
        if (!verificarSenha() || !verificarTelefone() || !verificarCEP()) {
            return;
        }

        if (!verificarEmail(email.value)) {
            mostrarErro(email, "E-mail inválido.");
            return;
        }

        if (emailJaCadastrado(email.value)) {
            mostrarErro(email, "Este e-mail já está cadastrado.");
            return;
        }

        // Cadastro do usuário
        let idNovo = calcularId();
        let user = {
            id: idNovo,
            nome: nome.value.trim(),
            email: email.value,
            telefone: telefone.value,
            cep: cep.value,
            bairro: bairro.value,
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