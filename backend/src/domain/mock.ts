//import { ValidationDomain } from "../common/util/validation.model";

import { CasoEspecial } from "./caso-especial";
import { Requisicao } from "./requisicao";

export class Mock {
    id: string;
    metodos: string[];
    endereco: string;
    httpStatus: number;
    contentType: string;
    charset: string;
    headers: string;
    body: string; 
    requisicoes: Requisicao[];
    casosEspeciais: CasoEspecial[]
    ativo: boolean;
    gravarRequisicao: boolean;

    constructor(id: string, endereco: string, httpStatus: number, contentType: string, charset: string, headers: string, body: string, requisicoes: Requisicao[], ativo: boolean, gravarRequisicao: boolean, metodos: string[]) {        
        //this.login = ValidationDomain.notNull(login, 'Campo login é obrigatório');
        //this.senha = ValidationDomain.notNull(senha, 'Campo senha é obrigatório');
        this.id = id;
        this.endereco = endereco;
        this.httpStatus = httpStatus;
        this.contentType = contentType;
        this.charset = charset;
        this.headers = headers;
        this.body = body;
        this.requisicoes = requisicoes;
        this.ativo = ativo;
        this.gravarRequisicao = gravarRequisicao;
        this.metodos = metodos;
        
        if (this.requisicoes == null){
            this.requisicoes = [];
        }
        this.casosEspeciais = [];
    }
}