import { Injectable, Inject, NotFoundException} from "@nestjs/common";
import { Mock } from "src/domain/mock";
import { IMockRepository } from "src/domain/repository/mock.repository";
import { Requisicao } from "src/domain/requisicao";
import { ExcecaoDeNegocio } from "../common/erro/excecao-negocio";
import { MockRequest } from "./request/mock.request";
import { MockResponse } from "./response/mock.response";
import { MockRepository } from "src/repository/json/implementacoes/mock.repository";

@Injectable()
export class MockService {
    constructor(
        @Inject(MockRepository)
        private repositorio: IMockRepository
    ) {}

    async incluir(input: MockRequest): Promise<string> {
        input.endereco = this.removerBarraInicial(input.endereco);
        let mockCadastrado = await this.repositorio.pesquisarPorEndereco(input.endereco);
        if (mockCadastrado.length > 0) {
            throw new ExcecaoDeNegocio('Endereço já cadastrada.');
        }

        var registro = new Mock(null, input.endereco, input.httpStatus, input.contentType, input.charset, input.headers, input.body, [], true, true);
        var registroGravado = this.repositorio.incluir(registro);
        return (await registroGravado).id;
    }

    private removerBarraInicial(str: string): string {
        if (str.startsWith('/')) {
          return str.substring(1);
        }
        return str;
    }

    async alterar(id: string, input: MockRequest) {
        input.endereco = this.removerBarraInicial(input.endereco);
        var mockCadastrado = await this.repositorio.pesquisarPorEnderecoDiferenteDoId(input.endereco, id);
        if (mockCadastrado.length > 0) {
            throw new ExcecaoDeNegocio('Endereço já cadastrada.');
        }

        var registro = await this.repositorio.pesquisar(id);
        if (registro == null) {
            throw new NotFoundException('Registro não encontrado.');
        }

        registro.endereco = input.endereco;
        registro.httpStatus = input.httpStatus;
        registro.contentType = input.contentType;
        registro.charset = input.charset;
        registro.headers = input.headers;
        registro.body = input.body;
        registro.ativo = input.ativo;
        registro.gravarRequisicao = input.gravarRequisicao;

        this.repositorio.alterar(registro);
    }

    async pesquisar(id: string): Promise<MockResponse> {
        let mockCadastrado = await this.repositorio.pesquisar(id);
        if (mockCadastrado == null) {
            throw new NotFoundException('Registro não encontrado.');
        }

        return MockResponse.convert(mockCadastrado, true);
    }

    async pesquisarPorEndereco(endereco: string): Promise<MockResponse> {
        let mocks: Mock[] = await this.repositorio.pesquisarPorEndereco(endereco);
        if (mocks.length == 0) {
            throw new NotFoundException('Endereço não cadastrado.');
        }
        return MockResponse.convert(mocks[0], false);
    }

    async remover(id: string) {
        await this.repositorio.remover(id);
    }

    async listar(): Promise<MockResponse[]> {
        return MockResponse.convertList(await this.repositorio.listar());
    }

    async adicionarRequisicao(id: string, requisicao: Requisicao) {
        let mockCadastrado = await this.repositorio.pesquisar(id);
        if (mockCadastrado == null) {
            throw new NotFoundException('Registro não encontrado.');
        }
        
        mockCadastrado.requisicoes.push(requisicao);
        this.repositorio.alterar(mockCadastrado);
   }

   async limparRequisicoes(id: string) {
        let mockCadastrado = await this.repositorio.pesquisar(id);
        if (mockCadastrado == null) {
            throw new NotFoundException('Registro não encontrado.');
        }

        mockCadastrado.requisicoes = [];
        this.repositorio.alterar(mockCadastrado);
   }
}