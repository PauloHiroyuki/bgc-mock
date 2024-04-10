import { Controller, Get, Post, Body, Put, Param, Delete, Res, Patch, Req } from "@nestjs/common";
import { Response, Request } from "express";
import path from "path";
import { Mock } from "src/domain/mock";
import { Requisicao } from "src/domain/requisicao";
import { MockService } from "src/service/mock.service";
import { CasoEspecialResponse } from "src/service/response/caso-especial.response";
import { MockResponse } from "src/service/response/mock.response";

@Controller('')
export class ExecMockController {
  constructor(private mockService: MockService){}

  @Post('*')
  async incluir(@Body() registro: String, @Param() params, @Res() response: Response, @Req() request: Request) {
    return this.executar(params, response, request);
  }

  @Put('*')
  async alterar(@Body() registro: String, @Param() params, @Res() response: Response, @Req() request: Request) {
    return this.executar(params, response, request);
  }

  @Delete('*')
  async deletar(@Param() params, @Res() response: Response, @Req() request: Request) {
    return this.executar(params, response, request);
  }

  @Get('*')
  async pesquisar(@Param() params, @Res() response: Response, @Req() request: Request) {
    return this.executar(params, response, request);
  }

  @Patch('*')
  async patch(@Param() params, @Res() response: Response, @Req() request: Request) {
    return this.executar(params, response, request);
  }

  async executar(params, response: Response, request: Request) {
    let endereco = params[0];
    let mock = await this.mockService.pesquisarPorEndereco(endereco);
    if (mock == null) {
      return response
        .status(404)
        .send('Não foi entrado mock para esta endereco "/' + endereco + '"');
    }
    if (!mock.ativo) {
      return response
        .status(422)
        .send('Mock está desativado para esta endereco "/' + endereco + '"');
    }
    if (mock.metodos.includes(request.method) == false) {
      return response
        .status(405)
        .send('Método não permitido para esta endereco "/' + endereco + '"');
    }
    if (mock.gravarRequisicao) {
      let requisicao = new Requisicao(request.headers.referer, JSON.stringify(request.headers), JSON.stringify(request.body), request.originalUrl, request.method);
      this.mockService.adicionarRequisicao(mock.id, requisicao);
    }
    if (mock.casosEspeciais.length > 0) {
      var pathParams = this.getPathParams(mock.endereco, endereco);
      var casoEspecial = this.verificarSeCasoEspecial(mock, request, pathParams);
      if (!casoEspecial) {
        this.devolverPadrao(response, mock);
      } else {
        this.devolverCasoEspecial(response, casoEspecial);
      }
    }  else {
      this.devolverPadrao(response, mock);
    }
  }

  private getPathParams(padrao: string, entrada: string) {
    // Construindo a expressão regular a partir do padrão
    let regexPadrao = new RegExp("^" + padrao.replace(/:\w+/g, "(\\w+)") + "$");

    // Executando a expressão regular na string de entrada
    let match = regexPadrao.exec(entrada);
    if (match) {
        // Extrair os parâmetros e valores
        let validacao = padrao.match(/:\w+/g);
        if (validacao == null) return {};
        let parametros = validacao.map(param => param.slice(1));
        let valores = match.slice(1);

        // Criar o objeto dinâmico com os parâmetros e valores
        let objetoDinamico = {};
        parametros.forEach((param, index) => {
            objetoDinamico[param] = valores[index];
        });

        return objetoDinamico;
    } else {
        return null;
    }
  }

  private verificarSeCasoEspecial(mock: MockResponse, request: Request, pathParams): CasoEspecialResponse {
    for (let index = 0; index < mock.casosEspeciais.length; index++) {
      const caso = mock.casosEspeciais[index];  
      var validador = eval(caso.validador);      
      var retorno = validador(request.body, request.query, pathParams);
      if (retorno) return caso;
    }
    return null;
  }

  private devolverCasoEspecial(response: Response, casoEspecial: CasoEspecialResponse) {
    if (casoEspecial.headers != null && casoEspecial.headers != '') {
      let header = JSON.parse(casoEspecial.headers);
      response.header(header);
    }
    
    return response
      .status(casoEspecial.httpStatus)
      .contentType(casoEspecial.contentType)
      .send(casoEspecial.body);
  }

  private devolverPadrao(response: Response, mock: MockResponse) {
    if (mock.headers != null && mock.headers != '') {
      let header = JSON.parse(mock.headers);
      response.header(header);
    }
    
    return response
      .status(mock.httpStatus)
      .contentType(mock.contentType)
      .send(mock.body);
  }
}