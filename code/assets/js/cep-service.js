export class cepService{

    constructor(){
        this.urlBase =  "https://viacep.com.br/ws";
    }
    async getALL(cep){
        
        const resposta = await fetch(`${this.urlBase}/${cep}/json/`);
     

        if(!resposta.ok){
             throw new Error('Não foi possível acessar o cep deste usuário');
        }
       return resposta.json();
    }

}