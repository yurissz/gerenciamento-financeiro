export interface IClient {
    id: number,
    nome: string,
    cpf: string
}

export interface IClientsClientesPage {
    id: number,
    nome: string,
    cpf: string,
    email: string,
    telefone: string,
    status: string
}

export interface IClientsForm {
    nome: string,
    email: string,
    cpf: string,
    telefone: string,
    endereco: string,
    complemento: string,
    cep: string,
    bairro: string,
    cidade: string,
    uf: string
}

export interface IClientDetails {
    client: {
        nome: string
        cpf: string,
        email: string,
        telefone: string,
        endereco: string,
        complemento: string,
        cep: string,
        bairro: string,
        cidade: string,
        uf: string,
        status: string,
        usuario_id: number
    },
    charges: {
        id_cob: string,
        descricao: string,
        data_venc: string,
        valor: number,
        status: string
    }[]
}
