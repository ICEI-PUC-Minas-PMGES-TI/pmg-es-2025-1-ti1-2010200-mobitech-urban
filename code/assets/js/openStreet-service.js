export class openStreet{

    constructor(){
        this.urlBase =  "https://nominatim.openstreetmap.org";
    }
    async getCord(endereco, cidade, uf) {
        // Monta a query de busca de forma mais flexível
        const query = encodeURIComponent(`${endereco}, ${cidade}, ${uf}`);
        const resposta = await fetch(`${this.urlBase}/search?q=${query}&format=json`);
        if (!resposta.ok) {
            throw new Error('Não foi possível acessar as coords deste usuário');
        }
        return resposta.json();
    }

}