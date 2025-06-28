document.addEventListener('DOMContentLoaded', function() {
    inicializarMascaras();
    inicializarValidacoes();
    
    const formCadastro = document.getElementById('cadastro-prefeitura');
    if (formCadastro) {
        formCadastro.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validarFormulario()) {
                enviarFormulario();
            }
        });
    }
    
    const btnVoltar = document.getElementById('btn-voltar');
    if (btnVoltar) {
        btnVoltar.addEventListener('click', function() {
            window.location.href = 'cad_usuario.html'; 
        });
    }
});

function inicializarMascaras() {
    // Máscara para CEP (8 dígitos)
    const cepInput = document.getElementById('endereco');
    if (cepInput) {
        const cepMask = IMask(cepInput, {
            mask: '00000-000',
            prepare: function(str) {
                return str.replace(/\D/g, '');
            }
        });
        
        cepInput.addEventListener('blur', function() {
            const cep = cepMask.unmaskedValue;
            if (cep.length === 8) {
                buscarCEP(cep);
            }
        });
    }
    
    // Máscara para telefone (com DDD)
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        IMask(telefoneInput, {
            mask: [
                { 
                    mask: '(00) 0000-0000' 
                },
                { 
                    mask: '(00) 00000-0000' 
                }
            ],
            dispatch: function(appended, dynamicMasked) {
                const number = (dynamicMasked.value + appended).replace(/\D/g,'');
                return dynamicMasked.compiledMasks[number.length > 10 ? 1 : 0];
            }
        });
    }
}

function buscarCEP(cep) {
    const cepInput = document.getElementById('endereco');
    cepInput.disabled = true;
    cepInput.classList.add('loading');
    
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                // Verificar se o CEP pertence a Belo Horizonte
                if (data.localidade.toUpperCase() !== 'BELO HORIZONTE') {
                    mostrarErro(cepInput, 'Apenas CEPs de Belo Horizonte são permitidos.');
                    // Limpar outros campos de endereço
                    const bairroInput = document.getElementById('bairro');
                    if (bairroInput) bairroInput.value = '';
                    return;
                }
                
                const bairroInput = document.getElementById('bairro');
                if (bairroInput) {
                    bairroInput.value = data.bairro || '';
                    const event = new Event('blur');
                    bairroInput.dispatchEvent(event);
                }
            } else {
                mostrarErro(cepInput, 'CEP não encontrado. Por favor, verifique o número.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            mostrarErro(cepInput, 'Erro ao consultar CEP. Tente novamente.');
        })
        .finally(() => {
            cepInput.disabled = false;
            cepInput.classList.remove('loading');
        });
}

function inicializarValidacoes() {
    const campos = document.querySelectorAll('#cadastro-prefeitura input[required], #cadastro-prefeitura select[required]');
    campos.forEach(campo => {
        campo.addEventListener('blur', () => validarCampo(campo));
        campo.addEventListener('input', () => {
            if (campo.classList.contains('error')) {
                validarCampo(campo);
            }
        });
    });
    
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('senha-confirmar');
    
    if (senhaInput && confirmarSenhaInput) {
        confirmarSenhaInput.addEventListener('blur', () => {
            if (senhaInput.value !== confirmarSenhaInput.value) {
                mostrarErro(confirmarSenhaInput, 'As senhas não coincidem.');
            } else {
                removerErro(confirmarSenhaInput);
            }
        });
    }
}

function validarFormulario() {
    let valido = true;
    const campos = document.querySelectorAll('#cadastro-prefeitura input[required], #cadastro-prefeitura select[required]');
    
    campos.forEach(campo => {
        if (!validarCampo(campo)) {
            valido = false;
        }
    });
    
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('senha-confirmar');
    
    if (senhaInput && confirmarSenhaInput && senhaInput.value !== confirmarSenhaInput.value) {
        mostrarErro(confirmarSenhaInput, 'As senhas não coincidem.');
        valido = false;
    }
    
    // Verificação adicional para CEP de BH
    const cepInput = document.getElementById('endereco');
    if (cepInput) {
        const cepLimpo = cepInput.value.replace(/\D/g, '');
        if (cepLimpo.length === 8) {
            // Se houver mensagem de erro sobre CEP não ser de BH, considerar inválido
            const erro = cepInput.parentNode.querySelector('.mensagem-erro');
            if (erro && erro.textContent.includes('Belo Horizonte')) {
                valido = false;
            }
        }
    }
    
    return valido;
}

function validarCampo(campo) {
    const valor = campo.value.trim();
    const idCampo = campo.id;
    
    if (campo.required && !valor) {
        mostrarErro(campo, 'Este campo é obrigatório.');
        return false;
    }
    
    switch(idCampo) {
        case 'email':
        case 'email-responsavel':
            if (!validarEmail(valor)) {
                mostrarErro(campo, 'Por favor, insira um e-mail válido.');
                return false;
            }
            break;
            
        case 'telefone':
            const telefoneLimpo = valor.replace(/\D/g, '');
            if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
                mostrarErro(campo, 'Por favor, insira um telefone válido com DDD.');
                return false;
            }
            break;
            
        case 'endereco':
            const cepLimpo = valor.replace(/\D/g, '');
            if (cepLimpo.length !== 8) {
                mostrarErro(campo, 'Por favor, insira um CEP válido com 8 dígitos.');
                return false;
            }
            break;
            
        case 'site':
            if (valor && !validarURL(valor)) {
                mostrarErro(campo, 'Por favor, insira uma URL válida (comece com http:// ou https://).');
                return false;
            }
            break;
            
        case 'senha':
            if (valor.length < 6) {
                mostrarErro(campo, 'A senha deve ter pelo menos 6 caracteres.');
                return false;
            }
            break;
    }
    
    removerErro(campo);
    return true;
}

function mostrarErro(campo, mensagem) {
    removerErro(campo);
    
    const divErro = document.createElement('div');
    divErro.className = 'mensagem-erro';
    divErro.textContent = mensagem;
    
    campo.classList.add('error');
    campo.parentNode.insertBefore(divErro, campo.nextSibling);
}

function removerErro(campo) {
    campo.classList.remove('error');
    
    const erro = campo.parentNode.querySelector('.mensagem-erro');
    if (erro) {
        erro.remove();
    }
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validarURL(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

function enviarFormulario() {
    const formCadastro = document.getElementById('cadastro-prefeitura');
    const dados = {
        prefeitura: document.getElementById('prefeitura').value,
        site: document.getElementById('site').value,
        cep: document.getElementById('endereco').value,
        bairro: document.getElementById('bairro').value,
        email: document.getElementById('email').value,
        responsavel: document.getElementById('nome-responsavel').value,
        telefone: document.getElementById('telefone').value,
        emailResponsavel: document.getElementById('email-responsavel').value,
        dataCadastro: new Date().toISOString()
    };

    try {
        // Obter cadastros existentes ou inicializar array vazio
        let cadastros = JSON.parse(localStorage.getItem('cadastrosPrefeitura')) || [];
        
        // Adicionar novo cadastro
        cadastros.push(dados);
        
        // Salvar no localStorage
        localStorage.setItem('cadastrosPrefeitura', JSON.stringify(cadastros));
        
        // DEBUG: Mostra no console o que foi salvo
        console.log('Dados salvos:', JSON.parse(localStorage.getItem('cadastrosPrefeitura')));
        
        alert('Cadastro salvo com sucesso!');
        formCadastro.reset();
        
        // Limpar erros
        document.querySelectorAll('.mensagem-erro').forEach(erro => erro.remove());
        document.querySelectorAll('.error').forEach(campo => campo.classList.remove('error'));
        
    } catch (error) {
        console.error('Erro ao salvar:', error);
        alert('Erro ao salvar cadastro. Verifique o console para detalhes.');
    }
}