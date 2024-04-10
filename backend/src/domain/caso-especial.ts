export class CasoEspecial {
    validador: string;
    httpStatus: number;
    contentType: string;
    charset: string;    
    headers: string;
    body: string; 
    descricao: string;

    constructor(descricao: string, validador: string, httpStatus: number, contentType: string, charset: string, headers: string, body: string) {       
        this.descricao = descricao;
        this.validador = validador;
        this.httpStatus = httpStatus;
        this.contentType = contentType;
        this.charset = charset;
        this.headers = headers;
        this.body = body;
    }
}