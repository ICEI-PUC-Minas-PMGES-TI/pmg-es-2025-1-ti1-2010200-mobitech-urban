//  document.addEventListener("DOMContentLoaded", function () {
//         const telefone = document.querySelector('#telefone');
//         const cep = document.querySelector('#endereco');
//         const telefoneMask = {
//             mask: '(00) 00000-0000'
//         };
//         const cepMask = {
//             mask: '00000-000'
//         };
//         const senha = document.querySelector("#senha");
//         const senhaConfirmar = document.querySelector("#senha-confirmar");
//         const form = document.querySelector(".form-prefeitura");



//      IMask(cep,cepMask);
//      IMask(telefone,telefoneMask);


//      form.addEventListener('submit',function(e) {
//         e.preventDefault();
//         alert("cadastro");
//         ;
//     });
    
   

//  });

// cad_prefeitura.js - Versão Simplificada para Teste
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

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        verificarSenha();
        console.log("SUCESSO: Evento submit capturado (versão simplificada)");
        alert("SUCESSO: Formulário está funcionando!");
        
    });




    function verificarSenha(){
        const senhaValor = senha.value;
        const ConfirmarSenharValor = senhaConfirmar.value;

        if (ConfirmarSenharValor != senhaValor){
            errorInput(senhaConfirmar);
        }
        else{
            const formItem = senhaConfirmar;
            formItem.classList = "info-input"
        }
    }

    function errorInput(input){
        const formItem = input;
        formItem.className = "info-input error";
    }


    const btn = document.getElementById("btn-cadastro");
    if (btn) {
        console.log("Botão encontrado. Tipo:", btn.type);
        btn.addEventListener('click', function() {
            console.log("Click no botão detectado");
        });
    }
});

