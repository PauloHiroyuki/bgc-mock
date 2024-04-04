export interface MockDTO {
    id: string,
    endereco: string,
    metodos: string[],
    httpStatus: number,
    contentType: string
    charset: string,
    headers: string,
    body: string,
    requisicoes: RequisicoesDTO[],
    ativo: boolean,
    gravarRequisicao: boolean
}

export interface RequisicoesDTO {
    data: Date,
    url: string,
    headers: string,
    body: string,
    metodo: string
}