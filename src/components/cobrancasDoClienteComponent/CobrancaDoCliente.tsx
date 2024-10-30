import styles from './styles.module.css'
import trash from '../../assets/cobrancas/trash.png'
import pen from '../../assets/cobrancas/pen.png'
import setas from '../../assets/cobrancas/setas.png'
import { IChargesCobrancasPage } from '../../interfaces/charges'
import { formatarParaReais } from '../../utils/formatToReais'
import { useEffect } from 'react'
import { ModalEditCharge } from '../modals/modalEditCharge/ModalEditCharge'
import { ModalDeleteCharge } from '../modals/modalDeleteCharge/ModalDeleteCharge'
import { ModalDetalheCharge } from '../modals/modalDetalheCharge/ModalDetalheCharge'

interface CobrancasProps {
    onClick?: () => void
    style?: React.CSSProperties,
    arrayCharges: IChargesCobrancasPage[],
    idCob: string,
    setIdCob: React.Dispatch<React.SetStateAction<string>>,
    isOpenEditCharge: boolean,
    setIsOpenEditCharge: React.Dispatch<React.SetStateAction<boolean>>,
    isOpenDeleteAlart: boolean,
    setIsOpenDeleteAlart: React.Dispatch<React.SetStateAction<boolean>>,
    isOpenDescriptionChargeModal: boolean,
    setIsOpenDescriptionChargeModal: React.Dispatch<React.SetStateAction<boolean>>,
    setIsOpenRegisterCharge: React.Dispatch<React.SetStateAction<boolean>>,
}

export const CobrancasDoCliente: React.FC<CobrancasProps> = ({ style, arrayCharges, idCob, setIdCob,
    isOpenDeleteAlart, setIsOpenDeleteAlart, isOpenEditCharge, setIsOpenEditCharge,
    setIsOpenDescriptionChargeModal, isOpenDescriptionChargeModal,
    setIsOpenRegisterCharge
}) => {

    const editClick = (id_cob: string) => {
        setIdCob(id_cob)
        setIsOpenEditCharge(true)
    }

    const deleteClick = (id_cob: string) => {
        setIdCob(id_cob)
        setIsOpenDeleteAlart(true)
    }

    const descriptionClick = (id_cob: string) => {
        setIdCob(id_cob)
        setIsOpenDescriptionChargeModal(true)
    }

    useEffect(() => {
        setIdCob(idCob)
    }, [idCob])

    return (
        <section style={style} className={styles.conteiner}>
            <div className={styles.stylePrincipalConteiner}>
                <div className={styles.headTable}>
                    <h1 className={styles.tableText}>Cobranças do Cliente</h1>
                    <button className={styles.botaoRegisterCharge} onClick={() => setIsOpenRegisterCharge(true)}>Nova cobrança</button>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.alingClassification}>
                            <th>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={setas} alt="setasImg" />
                                    <h2 className={styles.styleClassification}>ID Cob.</h2>
                                </div>
                            </th>
                            <th >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={setas} alt="setasImg" />
                                    <th className={styles.styleClassification}>Data de venc</th>
                                </div>
                            </th>
                            <th className={styles.styleClassification}>Valor</th>
                            <th className={styles.styleClassification}>Status</th>
                            <th className={styles.styleClassification}>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrayCharges.map((charge, index) => (
                            <tr key={index} className={styles.alingItens}>
                                <td className={styles.styleItens} onClick={() => descriptionClick(charge.id_cob)}>{charge.id_cob}</td>
                                <td className={styles.styleItens} onClick={() => descriptionClick(charge.id_cob)}>{charge.data_venc}</td>
                                <td className={styles.styleItens} onClick={() => descriptionClick(charge.id_cob)}>{formatarParaReais(charge.valor)}</td>
                                <td onClick={() => descriptionClick(charge.id_cob)}>
                                    {charge.status === "Vencida" ? (
                                        <div className={styles.conteinerStatus} style={{ background: "#FFEFEF" }}>
                                            <p className={styles.styleItemStatus} style={{ color: "#971D1D" }}>{charge.status}</p>
                                        </div>
                                    ) : charge.status === "Pendente" ? (
                                        <div className={styles.conteinerStatus} style={{ background: "#FCF6DC" }}>
                                            <p className={styles.styleItemStatus} style={{ color: "#C5A605" }}>{charge.status}</p>
                                        </div>
                                    ) : (
                                        <div className={styles.conteinerStatus} style={{ background: "#EEF6F6" }}>
                                            <p className={styles.styleItemStatus} style={{ color: "#1FA7AF" }}>{charge.status}</p>
                                        </div>
                                    )}
                                </td >
                                <td className={styles.styleItens} onClick={() => descriptionClick(charge.id_cob)}>{charge.descricao}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <div onClick={() => editClick(charge.id_cob)} className={styles.actionIcon}>
                                            <img src={pen} alt="penIcon" />
                                            <p className={styles.styleButtonText} style={{ color: "#747488" }}>Editar</p>
                                        </div>
                                        {
                                            isOpenDeleteAlart &&
                                            <ModalDeleteCharge id_cob={idCob} setIsOpen={setIsOpenDeleteAlart}>
                                            </ModalDeleteCharge>
                                        }
                                        {
                                            isOpenEditCharge &&
                                            <ModalEditCharge id_cob={idCob} setIsOpen={setIsOpenEditCharge} >
                                            </ModalEditCharge>
                                        }
                                        {
                                            isOpenDescriptionChargeModal &&
                                            <ModalDetalheCharge
                                                isOpen={isOpenDescriptionChargeModal}
                                                setIsOpen={setIsOpenDescriptionChargeModal}
                                                id_cob={idCob}></ModalDetalheCharge>
                                        }
                                        <div className={styles.actionIcon} onClick={() => deleteClick(charge.id_cob)}>
                                            <img src={trash} alt="trashIcon" />
                                            <p className={styles.styleButtonText} style={{ color: "#AE1100" }}>Excluir</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}