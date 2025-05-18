
document.addEventListener("DOMContentLoaded", function() {
    const telefone = document.querySelector('#telefone');
    const cep = document.querySelector('#endereco');
    const telefoneMask = {
        mask: '(00) 00000-0000'
    };
    const cepMask = {
        mask: '00000-000'
    };
    const senha = document.querySelector("#senha");
    const senhaConfirmar = document.querySelector("#senha-confirmar");
    const form = document.querySelector("form.form-prefeitura");
    const email = document.querySelector("#email");
    const emailResp = document.querySelector("#email-responsavel");
    const prefeitura = document.querySelector("#prefeitura");
    const nomeResponsavel = document.querySelector("#nome-responsavel");
    const site = document.querySelector("#site");
    const inputPrefeitura = {
         prefeitura: prefeitura.value,
         site: site.value,
         cep: cep.value,
         email: email.value,
         nomeResponsavel: nomeResponsavel.value,
         telefone: telefone.value,
         emailResposavel: emailResp.value,
         senha: senha.value
     }
    let cadastrosPrefeitura = JSON.parse(localStorage.getItem('cadastrosPrefeitura')) || [];
    IMask(cep, cepMask);
    IMask(telefone, telefoneMask);

     function gerarId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    function salvarDadosLocalStorage(){
            const userPrefeitura = {
                id: gerarId(),
                prefeitura: prefeitura.value,
                site: site.value,
                cep: cep.value,
                email: email.value,
                nomeResponsavel: nomeResponsavel.value,
                telefone: telefone.value,
                emailResposavel: emailResp.value,
                senha: senha.value,
                dataCadastro: new Date().toISOString()
         }
         cadastrosPrefeitura.push(userPrefeitura);
         localStorage.setItem('cadastrosPrefeitura', JSON.stringify(cadastrosPrefeitura));
         alert(`Cadastro salvo com sucesso!`);
        console.log("Cadastros atualizados:", cadastrosPrefeitura);
    }

    function veriifcarCEP(){
        let count = 0;
        const verificarCep = cep.value.replace(/\D/g, '');
        if (verificarCep.length !== 8){
            mostrarErro(cep,"CEP inválido");
            count++;
            return false;
        }
        else{
            removerErro(cep);
        }
        if (/^(\d)\1{7}$/.test(verificarCep)) {
            mostrarErro(cep, "CEP inválido");
            count++;
            return false;
        }
        else if(count<1){
            removerErro(cep);
            return true;
        }
    }
   
    function verificarEmail(email){
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;
        return  regex.test(email);

    }


    function verificarTelefone(){
        let count = 0;
        const tel = telefone.value.replace(/\D/g, '');
        if (tel.length !==11){
            mostrarErro(telefone,"Telefone inválido, são necessários 11 digitos");
            count++;
            return false;
        }
        else{
            removerErro(telefone);
            return true;
        }
         verificarDDD(count);
 
    }
    function verificarDDD(count){
        const telStr = telefone.value.replace(/\D/g, '');
        const dddStr = telStr.substring(0, 2);
        const dddNum = parseInt(dddStr);
        console.log(dddNum);
        if(dddNum < 11 || dddNum > 99){
            mostrarErro(telefone,"Telefone inválido, não foi possível indentifcar o DDD");
            count++;
            return false;
        }
        else if(count<1){
           removerErro(telefone);
           return true;
        }
    }


    function verificarSenha(){
        const senhaValor = senha.value;
        const ConfirmarSenharValor = senhaConfirmar.value;

        if (ConfirmarSenharValor != senhaValor){
            mostrarErro(senhaConfirmar,"Senha Incorreta");
            return false;
        }
        else{
            removerErro(senhaConfirmar);
        }
            
        if(senhaValor.length<8){
            mostrarErro(senha,"Senha deve ter pelo menos 8 caracteres");
            return false;
        }
        else{
             removerErro(senha);
        }
    
        return true;
        
    }

    function mostrarErro(input, mensagem) {
        input.classList.add("error");
        
      
        const errosExistentes = input.parentNode.querySelectorAll('.mensagem-erro');
        errosExistentes.forEach(erro => erro.remove());
        
     
        const mensagemErro = document.createElement('span');
        mensagemErro.className = 'mensagem-erro';
        mensagemErro.textContent = mensagem;
        input.parentNode.insertBefore(mensagemErro, input.nextSibling);
    }
    
    function removerErro(input) {
        input.classList.remove("error");
        const mensagemErro = input.parentNode.querySelector('.mensagem-erro');
        if (mensagemErro) {
            mensagemErro.remove();
        }
    }
    
     
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            veriifcarCEP();
            const EmailPrefeitura = verificarEmail(email.value);
            if (!EmailPrefeitura){
                mostrarErro(email,"Email inválido");
            }
            else{
                removerErro(email);
            }
            const EmailResponsalvel = verificarEmail(emailResp.value);
            if (!EmailResponsalvel){
                mostrarErro(emailResp,"Email inválido");
            }
            else{
                removerErro(emailResp);
            }
            let valido = verificarSenha() && verificarTelefone() && veriifcarCEP() && EmailResponsalvel && EmailPrefeitura;
            console.log(valido);
            if (valido == true){
                salvarDadosLocalStorage();
                form.reset();
            }
            else{
                alert('Cadastro Invalido!');
                console.log("Invalido");
            }
            
        
    });


});

