export class Requisicao {
    referer: string;
    url: string;
    body: string;
    headers: string;
    data: string;
    metodo: string;

    constructor(referer: string, headers: string, body: string, url: string, metodo: string) {        
        //this.login = ValidationDomain.notNull(login, 'Campo login é obrigatório');
        //this.senha = ValidationDomain.notNull(senha, 'Campo senha é obrigatório');
        this.referer = referer;
        this.headers = headers;
        this.body = body;
        this.url = url;
        this.data = new Date().toISOString();
        this.metodo = metodo;
    }    
}