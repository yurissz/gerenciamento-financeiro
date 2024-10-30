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
    descricao: string;
    data_venc: string; // Mantenha como string
    valor: string;
    status: string;
}