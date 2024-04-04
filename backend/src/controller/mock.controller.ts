import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  Res,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { MockService } from 'src/service/mock.service';
import { MockRequest } from 'src/service/request/mock.request';

@Controller('mocks')
export class MockController {
  constructor(private mockService: MockService) {}

  @Post()
  @HttpCode(200)
  async incluir(@Body() registro: MockRequest, @Res() res: Response) {
    const id = await this.mockService.incluir(registro);
    res.status(HttpStatus.OK).json({ id: id });
  }

  @Put(':id')
  async alterar(@Body() registro: MockRequest, @Param() params) {
    await this.mockService.alterar(params.id, registro);
  }

  @Delete(':id')
  async deletar(@Param() params) {
    return await this.mockService.remover(params.id);
  }

  @Get(':id')
  async pesquisar(@Param() params) {
    return await this.mockService.pesquisar(params.id);
  }

  @Get()
  async listar() {
    return await this.mockService.listar();
  }

  @Delete(':id/requisicoes')
  async deletarRequisicoes(@Param() params) {
    return await this.mockService.limparRequisicoes(params.id);
  }
}
