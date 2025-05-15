
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

    IMask(cep, cepMask);
    IMask(telefone, telefoneMask);

    function veriifcarCEP(){
        let count = 0;
        const verificarCep = cep.value.replace(/\D/g, '');
        if (verificarCep.length !== 8){
            mostrarErro(cep,"CEP inválido");
            count++
        }
        else{
            removerErro(cep);
        }
        if (/^(\d)\1{7}$/.test(verificarCep)) {
            mostrarErro(cep, "CEP inválido");
            count++;
        }
        else if(count<1){
            removerErro(cep);
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
        }
        else{
            removerErro(telefone);
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
        }
        else if(count<1){
           removerErro(telefone);
        }
    }


    function verificarSenha(){
        const senhaValor = senha.value;
        const ConfirmarSenharValor = senhaConfirmar.value;

        if (ConfirmarSenharValor != senhaValor){
            mostrarErro(senhaConfirmar,"Senha Incorreta");
        }
        else{
            const formItem = senhaConfirmar;
            formItem.classList = "info-input"
            removerErro(senhaConfirmar);
        }
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
        verificarSenha();
        verificarTelefone();
        veriifcarCEP();
        const EmailPrefeitura = verificarEmail(email.value);
        if (!EmailPrefeitura){
            mostrarErro(email,"Email inválido");
        }
        else{
            removerErro(email);
            console.log(email.value);
        }
        const EmailResponsalvel = verificarEmail(emailResp.value);
         if (!EmailResponsalvel){
            mostrarErro(emailResp,"Email inválido");
        }
        else{
            removerErro(emailResp);
            console.log(emailResp.value);
        }
        
    });
});

