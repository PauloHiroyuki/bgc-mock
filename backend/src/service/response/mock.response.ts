import { Requisicao } from "src/domain/requisicao";
import { Mock } from "../../domain/mock";
import { RequisicaoResponse } from "./requisicao.response";
import { CasoEspecial } from "src/domain/caso-especial";
import { CasoEspecialResponse } from "./caso-especial.response";

export class MockResponse {
    id: string;
    endereco: string;
    httpStatus: number;
    contentType: string;
    charset: string;
    headers: string;
    body: string; 
    requisicoes: RequisicaoResponse[];
    ativo: boolean;
    gravarRequisicao: boolean;
    metodos: string[];
    casosEspeciais: CasoEspecialResponse[]

    static convert(mock: Mock, mostrarRequisicoes: boolean): MockResponse {
        if (mock == null) return null;
        var registro = new MockResponse();
        registro.id = mock.id;
        registro.endereco = mock.endereco;
        registro.httpStatus = mock.httpStatus;
        registro.contentType = mock.contentType;
        registro.charset = mock.charset;
        registro.headers = mock.headers;
        registro.body = mock.body; 
        if (mostrarRequisicoes) {
            registro.requisicoes = RequisicaoResponse.convertList(mock.requisicoes);
        }
        registro.ativo = mock.ativo;
        registro.gravarRequisicao = mock.gravarRequisicao;
        registro.metodos = mock.metodos;
        registro.casosEspeciais = CasoEspecialResponse.convertList(mock.casosEspeciais);
        return registro;
    }
    
    static convertList(lista: Mock[]): any {
        if (lista == null) return null;
        return lista.map(mock => this.convert(mock, false));
    }
}