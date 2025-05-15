
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

    IMask(cep, cepMask);
    IMask(telefone, telefoneMask);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        verificarSenha();
        verificarTelefone();
        // console.log("SUCESSO: Evento submit capturado (versão simplificada)");
        // alert("SUCESSO: Formulário está funcionando!");
        
    });

    function verificarTelefone(){
    
        const tel = telefone.value.replace(/\D/g, '').toString();
        if (tel.length != 11){
            mostrarErro(telefone,"Telefone inválido, são necessários 11 digitos")
        }
        else{
            removerErro(telefone);
        }
        tel.toString();
        const dddStr = tel.substring(0, 2);
        const dddNum = parseInt(dddStr);
        console.log(dddNum);
        if(dddNum < 11 || dddNum > 99){
            mostrarErro(telefone,"Telefone inválido, não foi possível indentifcar o DDD");
        }
        else{
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

     

    const btn = document.getElementById("btn-cadastro");
    if (btn) {
        console.log("Botão encontrado. Tipo:", btn.type);
        btn.addEventListener('click', function() {
            console.log("Click no botão detectado");
        });
    }
});

