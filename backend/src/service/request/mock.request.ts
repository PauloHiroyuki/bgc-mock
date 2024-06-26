import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { CasoEspecialRequest } from './caso-especial.request';

export class MockRequest {
    
    @IsNotEmpty({
        message: 'endereco é obrigatório.'
    })
    endereco: string;
    
    @IsNotEmpty({
        message: 'Status Code é obrigatório.'
    })
    httpStatus: number;
    contentType: string;
    charset: string;
    headers: string;
    body: string; 
    ativo: boolean;
    gravarRequisicao: boolean;    
    metodos: string[];
    casosEspeciais: CasoEspecialRequest[];
}