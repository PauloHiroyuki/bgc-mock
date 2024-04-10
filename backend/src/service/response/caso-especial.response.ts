import { CasoEspecial } from "src/domain/caso-especial";

export class CasoEspecialResponse {
    descricao: string;
    validador: string;
    httpStatus: number;
    contentType: string;
    charset: string;    
    headers: string;
    body: string; 

    static convert(caso: CasoEspecial): CasoEspecialResponse {
        if (caso == null) return null;
        var registro = new CasoEspecialResponse();
        registro.validador = caso.validador;
        registro.headers = caso.headers;
        registro.body = caso.body;
        registro.httpStatus = caso.httpStatus;
        registro.contentType = caso.contentType;
        registro.charset = caso.charset;
        registro.descricao = caso.descricao;
        return registro;
    }
    
    static convertList(lista: CasoEspecial[]): any {
        if (lista == null) return null;
        return lista.map(mock => this.convert(mock));
    }
}