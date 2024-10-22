export interface ICharges {
    nome: string,
    id_cob: string,
    valor: number,
    status: string
}

export interface IChargesCobrancasPage {
    nome: string,
    id_cob: string,
    valor: number,
    data_venc: string,
    status: string,
    descricao: string,
    usuario_id: number,
    id: number
}

export interface IAddCharge {
    cliente_id: string,
    descricao: string,
    data_venc: Date,
    valor: number,
    status: string
}