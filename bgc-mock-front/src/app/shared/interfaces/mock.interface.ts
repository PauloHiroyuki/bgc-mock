export interface MockDTO {
    id: string,
    endereco: string
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
    headers: string,
    body: string
}