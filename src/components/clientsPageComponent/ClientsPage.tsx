import styles from './styles.module.css'
import cobrancaIcon from '../../assets/clients/cobrancaIcon.png'
import setas from '../../assets/cobrancas/setas.png'
import { IClientsClientesPage } from '../../interfaces/clients'

interface CobrancasProps {
    onClick?: () => void
    style?: React.CSSProperties,
    arrayClients: IClientsClientesPage[],
    setIsOpenAddChargeModal: React.Dispatch<React.SetStateAction<boolean>>,
    setClientId: React.Dispatch<React.SetStateAction<number>>,

    setClientEmail: React.Dispatch<React.SetStateAction<string>>,
    setIsOpenDetailClientPage: React.Dispatch<React.SetStateAction<boolean>>
}

export const ClientsPage: React.FC<CobrancasProps> = ({ style, arrayClients,
    setIsOpenAddChargeModal, setClientId, setClientEmail, setIsOpenDetailClientPage }) => {

    const clickCreateCobracaButton = (cliente_id: number) => {
        setIsOpenAddChargeModal(true)
        setClientId(cliente_id)
    }

    const clickOpenClientPage = (email: string) => {
        setClientEmail(email)
        setIsOpenDetailClientPage(true)
    }

    return (
        <section style={style} className={styles.conteiner}>
            <div className={styles.stylePrincipalConteiner}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.alingClassification}>
                            <th style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={setas} alt="setasImg" />
                                <h2 className={styles.styleClassification}>Cliente</h2>
                            </th>
                            <th className={styles.styleClassification}>CPF</th>
                            <th className={styles.styleClassification}>E-mail</th>
                            <th className={styles.styleClassification}>Telefone</th>
                            <th className={styles.styleClassification}>Status</th>
                            <th className={styles.styleClassification}>Criar Cobrança</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrayClients.map((client, index) => (
                            <tr key={index} className={styles.alingItens}>
                                <td className={styles.styleItens} onClick={() => clickOpenClientPage(client.email)}>{client.nome}</td>
                                <td className={styles.styleItens} onClick={() => clickOpenClientPage(client.email)}>{client.cpf}</td>
                                <td className={styles.styleItens} onClick={() => clickOpenClientPage(client.email)}>{client.email}</td>
                                <td className={styles.styleItens} onClick={() => clickOpenClientPage(client.email)}>{client.telefone}</td>
                                <td onClick={() => clickOpenClientPage(client.email)}>
                                    {client.status === "Inadimplente" ? (
                                        <div className={styles.conteinerStatus} style={{ background: "#FFEFEF" }}>
                                            <p className={styles.styleItemStatus} style={{ color: "#971D1D" }}>{client.status}</p>
                                        </div>
                                    ) : (
                                        <div className={styles.conteinerStatus} style={{ background: "#EEF6F6" }}>
                                            <p className={styles.styleItemStatus} style={{ color: "#1FA7AF" }}>{client.status}</p>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <div onClick={() => clickCreateCobracaButton(client.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={cobrancaIcon} alt="cobrancaIcon" />
                                        <p className={styles.styleButtonText} style={{ color: "hsla(328, 99%, 43%, 1)" }}>Cobrança</p>
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
