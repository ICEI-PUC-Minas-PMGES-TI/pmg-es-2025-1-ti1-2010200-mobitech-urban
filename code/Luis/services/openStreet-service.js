export class findCoords{

    constructor(){
        this.urlBase =  "https://nominatim.openstreetmap.org";
    }
    async getCord(bairro,cidade,uf){
        
        const resposta = await fetch(`${this.urlBase}/search?q=${bairro}+${bairro}+${uf}&format=json`);
    

        if(!resposta.ok){
             throw new Error('Não foi possível acessar as coords deste usuário');
        }
       return resposta.json();
    }

}