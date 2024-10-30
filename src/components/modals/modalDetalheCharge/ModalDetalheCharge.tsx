import styles from './styles.module.css'
import modalChargeIcon from '../../../assets/cobrancas/past.png'
import close from '../../../assets/clients/close.png'
import api from '../../../services/api';
import { useEffect, useState } from 'react';
import { formatDate } from '../../../utils/formatToDate';
import { formatarParaReais } from '../../../utils/formatToReais';


interface ModalProps {
    isOpen?: boolean,
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
    id_cob?: string,
}

export const ModalDetalheCharge = ({ setIsOpen, id_cob }: ModalProps) => {

    const [clientName, setClientName] = useState("")
    const [chargeDescription, setChargeDescription] = useState("")
    const [chargeVencimento, setChargeVencimento] = useState("")
    const [chargeValue, setChargeValue] = useState(0)
    const [chargeID] = useState(id_cob)
    const [chargeStatus, setChargeStatus] = useState("")

    const searchChargeDescription = async (id_cob: string | undefined) => {
        try {
            const { data } = await api.get(`/chargeDetails/${id_cob}`)
            setClientName(data.cliente_nome)
            setChargeDescription(data.descricao)
            setChargeVencimento(data.data_venc)
            setChargeValue(data.valor)
            setChargeStatus(data.status)

        } catch (error) {
        }
    }

    useEffect(() => {
        searchChargeDescription(id_cob)
    }, [])


    return (
        <div className={styles.styleBackground}>
            <section className={styles.styleModal}>
                <header className={styles.styleHeader}>
                    <div>
                        <img src={modalChargeIcon} alt="modalClientIcon" />
                        <h1>Detalhe da Cobrança</h1>
                    </div>
                    <img src={close} alt="closeIcon" onClick={() => {
                        if (setIsOpen) {
                            setIsOpen(false);
                        }
                    }} />
                </header>
                <div>
                    <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                        <label htmlFor="" className={styles.styleLabelNome}>Nome</label>
                        <h3 className={styles.styleItens}>{clientName}</h3>
                    </div>
                    <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                        <label htmlFor="" className={styles.styleLabelNome}>Descrição</label>
                        <h3 className={styles.styleItens}>{chargeDescription}</h3>
                    </div>
                    <div className={styles.alingSpaces}>
                        <div className={styles.alingErrors}>
                            <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                                <label htmlFor="" className={styles.styleLabelNome}>Vencimento</label>
                                <h3 className={styles.styleItens}>{formatDate(chargeVencimento)}</h3>
                            </div>
                        </div>
                        <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                            <label htmlFor="" className={styles.styleLabelNome}>Valor</label>
                            <h3 className={styles.styleItens}>{formatarParaReais(chargeValue)}</h3>
                        </div>
                    </div>
                    <div className={styles.alingSpaces}>
                        <div className={styles.alingErrors}>
                            <label htmlFor="" className={styles.styleLabelNome}>ID cobranças</label>
                            <h3 className={styles.styleItens}>{chargeID}</h3>
                        </div>
                        <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                            <label htmlFor="" className={styles.styleLabelNome}>Status</label>
                            <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                                {chargeStatus === "Vencida" ? (
                                    <div className={styles.conteinerStatus} style={{ background: "#FFEFEF" }}>
                                        <p className={styles.styleItemStatus} style={{ color: "#971D1D" }}>{chargeStatus}</p>
                                    </div>
                                ) : chargeStatus === "Pendente" ? (
                                    <div className={styles.conteinerStatus} style={{ background: "#FCF6DC" }}>
                                        <p className={styles.styleItemStatus} style={{ color: "#C5A605" }}>{chargeStatus}</p>
                                    </div>
                                ) : (
                                    <div className={styles.conteinerStatus} style={{ background: "#EEF6F6" }}>
                                        <p className={styles.styleItemStatus} style={{ color: "#1FA7AF" }}>{chargeStatus}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}