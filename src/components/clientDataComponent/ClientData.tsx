import styles from './styles.module.css'
import { useEffect, useState } from 'react'


interface ClientDataProps {
    onClick?: () => void
    style?: React.CSSProperties,
    idCob: string,
    setIdCob: React.Dispatch<React.SetStateAction<string>>,
    clientId: number,
    isOpenDetailClientPage: boolean,
    detail: {
        nome: string,
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
        usuario_id: string
    },
    setIsOpenEditClient: React.Dispatch<React.SetStateAction<boolean>>,
}


export const ClientData: React.FC<ClientDataProps> = ({ style, idCob, setIdCob, clientId, detail,
    isOpenDetailClientPage, setIsOpenEditClient
}) => {

    useEffect(() => {
        setIdCob(idCob)


        console.log(idCob);
    }, [idCob, isOpenDetailClientPage])

    return (
        <section style={style} className={styles.conteiner}>
            <div className={styles.stylePrincipalConteiner}>
                <div className={styles.headTable}>
                    <h1 className={styles.tableText}>Dados do cliente</h1>
                    <button className={styles.botaoEditClient} onClick={() => setIsOpenEditClient(true)}>Editar Cliente</button>
                </div>
                <section className={styles.alingConteinerItens1}>
                    <div>
                        <label htmlFor="" className={styles.styleLabel}>Email</label>
                        <p className={styles.styleNames}>{detail.email}</p>
                    </div>
                    <div>
                        <label htmlFor="" className={styles.styleLabel} >Telefone</label>
                        <p className={styles.styleNames}>{detail.telefone}</p>
                    </div>
                    <div>
                        <label htmlFor="" className={styles.styleLabel} >CPF</label>
                        <p className={styles.styleNames}>{detail.cpf}</p>
                    </div>
                </section>
                <section className={styles.alingConteinerItens2}>
                    <div>
                        <label htmlFor="" className={styles.styleLabel}>Endereço</label>
                        <p className={styles.styleNames}>{detail.endereco}</p>
                    </div>
                    <div>
                        <label htmlFor="" className={styles.styleLabel} >Bairro</label>
                        <p className={styles.styleNames}>{detail.bairro}</p>
                    </div>
                    <div>
                        <label htmlFor="" className={styles.styleLabel} >Complemento</label>
                        <p className={styles.styleNames}>{detail.complemento}</p>
                    </div>
                    <div>
                        <label htmlFor="" className={styles.styleLabel} >CEP</label>
                        <p className={styles.styleNames}>{detail.cep}</p>
                    </div>
                    <div>
                        <label htmlFor="" className={styles.styleLabel} >Cidade</label>
                        <p className={styles.styleNames}>{detail.cidade}</p>
                    </div>
                    <div>
                        <label htmlFor="" className={styles.styleLabel} >UF</label>
                        <p className={styles.styleNames}>{detail.uf}</p>
                    </div>
                </section>
            </div>
        </section>
    )
}