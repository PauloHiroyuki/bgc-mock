import { Mock } from '../../../domain/mock';
import { Injectable } from '@nestjs/common';
import { IMockRepository } from '../../../domain/repository/mock.repository';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { promisify } from 'util';

@Injectable()
export class MockRepository implements IMockRepository {
  mocks: Mock[] = [];
  caminhoDaPastaDosMocks: string;

  constructor() {
    this.caminhoDaPastaDosMocks = os.tmpdir() + '/mocks';
    this.listarNomesDosArquivosDeUmaPasta(this.caminhoDaPastaDosMocks).then(
      (arquivos: string[]) => {
        arquivos.forEach((nomeArquivo) => {
          this.mocks.push(JSON.parse(fs.readFileSync(nomeArquivo, 'utf8')));
        });
      }
    );
  }

  async listar(): Promise<Mock[]> {
    return new Promise((resolve, reject) => {
      resolve(this.mocks);
    });
  }

  async pesquisar(id: string): Promise<Mock> {
    return new Promise((resolve, reject) => {
      resolve(this.mocks.find((x: Mock) => x.id === id));
    });
  }

  async pesquisarPorEndereco(endereco: string): Promise<Mock[]> {
    return new Promise((resolve, reject) => {
      resolve(
        this.mocks.filter((x: Mock) => this.validarString(x.endereco, endereco))
      );
    });
  }

  private validarString(pattern, str) {
    // Escapar caracteres especiais na string de padrão
    const escapedPattern = pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    // Substituir os parâmetros na string de padrão com um padrão de captura regex
    const regexPattern = escapedPattern.replace(/:[^/]+/g, '([^/]+)');

    // Construir a expressão regular
    const regex = new RegExp('^' + regexPattern + '$');

    // Testar a segunda string contra o padrão
    return regex.test(str);
  }

  async pesquisarPorEnderecoDiferenteDoId(
    endereco: string,
    id: string
  ): Promise<Mock[]> {
    return new Promise((resolve, reject) => {
      const itens = this.mocks.filter(
        (x: Mock) => x.endereco == endereco && x.id != id
      );
      resolve(itens);
    });
  }

  async incluir(registro: Mock): Promise<Mock> {
    registro.id = uuidv4();
    this.mocks.push(registro);
    return new Promise((resolve, reject) => {
      this.escreverArquivo(registro.id, JSON.stringify(registro, null, 2));
      resolve(registro);
    });
  }

  async alterar(registro: Mock) {
    this.escreverArquivo(registro.id, JSON.stringify(registro, null, 2));
  }

  async remover(id: string) {
    this.mocks = this.mocks.filter((x: Mock) => x.id !== id);
    this.excluiArquivo(id);
  }

  private escreverArquivo(nomeArquivo: string, conteudoJSON: string) {
    const pathFile = this.caminhoDaPastaDosMocks + '/' + nomeArquivo + '.json';
    fs.writeFile(pathFile, conteudoJSON, (err) => {
      if (err) {
        console.error('Erro ao criar o arquivo JSON:', err);
        return;
      }
    });
  }

  private excluiArquivo(nomeArquivo: string) {
    const pathFile = this.caminhoDaPastaDosMocks + '/' + nomeArquivo + '.json';
    if (fs.existsSync(pathFile)) {
      // Excluindo o arquivo
      fs.unlink(pathFile, (err) => {
        if (err) {
          console.error('Erro ao excluir o arquivo:', err);
          return;
        }
      });
    } else {
      console.error('O arquivo não existe.');
    }
  }

  private async listarNomesDosArquivosDeUmaPasta(
    caminhoDaPasta: string
  ): Promise<string[]> {
    const readdirAsync = promisify(fs.readdir);
    const files = await readdirAsync(caminhoDaPasta);
    const arquivosComCaminhoCompleto = files.map((file) =>
      path.join(caminhoDaPasta, file)
    );
    return arquivosComCaminhoCompleto;
  }
}
