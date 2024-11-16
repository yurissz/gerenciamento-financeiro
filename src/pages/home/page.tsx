import styles from './styles.module.css'
import { formatarParaReais } from '../../utils/formatToReais'
import selectionedHouseIcon from '../../assets/home/selectionedHouseIcon.png'
import clientsIcon from '../../assets/home/clientsIcon.png'
import pastIcon from '../../assets/home/pastIcon.png'
import perfilIcon from '../../assets/home/perfilIcon.png'
import chevronDown from '../../assets/home/chevron-down.png'
import cobrancaPagaIcon from '../../assets/home/cobrancaPagaIcon.png'
import cobrancaPendenteIcon from '../../assets/home/cobrancaPendenteIcon.png'
import cobrancaVencidaIcon from '../../assets/home/cobrancaVencidaIcon.png'
import clientsEmDiaIcon from '../../assets/home/clienteEmdiaIcon.png'
import clientsInadimplentesIcon from '../../assets/home/clienteInadiplenteIcon.png'
import { Cobrancas } from '../../components/cobrancasComponent/Cobrancas'
import { CobrancasTable } from '../../components/cobrancasTableComponent/CobrancasTable'
import { HomeClientsTable } from '../../components/homeClientsComponent/HomeClients'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { EditAndLogoutModal } from '../../components/buttons/buttonEditAndLogOutUser/EditAndLogoutModal'
import { ModalEditUser } from '../../components/modals/modalEditUser/ModalEditUser'
import { ModalEditConfirm } from '../../components/modals/modalEditConfirm/modalEditConfirm'

export default function Home() {
    const navigate = useNavigate()

    const [isOpenUserButton, setIsOpenUserButton] = useState(false)
    const [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false)
    const [isConfirmedEdit, setIsConfirmedEdit] = useState(false)

    const [clients, setClients] = useState({
        clientesEmdia: {
            clientes: [],
            quantidade: ""
        },
        clientesInadimplentes: {
            clientes: [],
            quantidade: ""
        }
    })

    const [charges, setCharges] = useState({
        Pendente: {
            charges: [],
            total: 0,
            quantidade: 0
        },
        Paga: {
            charges: [],
            total: 0,
            quantidade: 0
        },
        Vencida: {
            charges: [],
            total: 0,
            quantidade: 0
        }
    })

    const getClients = async () => {
        try {
            const { data } = await api.get('/dashboardClients')

            if (data) {
                setClients(data)
            }
        } catch (error) {
        }
    }

    const getCharges = async () => {
        try {
            const { data } = await api.get('/dashboardCharges')


            if (data) {
                setCharges(data)
            }

        } catch (error) {
        }
    }


    useEffect(() => {
        getClients()
        getCharges()
    }, [])

    return (
        <section className={styles.screenBackground}>
            <aside className={styles.screenAside}>
                <div className={styles.positionSelectionedIcons}>
                    <img src={selectionedHouseIcon} alt="houseIcon"></img>
                    <p className={styles.styleSelectionedIconText}>Home</p>
                </div>
                <div className={styles.positionIcons} onClick={() => navigate("/clientes")}>
                    <img src={clientsIcon} alt="clientsIcon"></img>
                    <p className={styles.styleIconText}>Clientes</p>
                </div>
                <div className={styles.positionIcons}    >
                    <img src={pastIcon} alt="houseIcon" onClick={() => navigate("/cobrancas")}></img>
                    <p className={styles.styleIconText}>Cobranças</p>
                </div>
            </aside>
            <div style={{
                width: "100%",
            }}>
                <header className={styles.alingHeader}>
                    <h1 className={styles.pageTitle}>Resumo das cobranças</h1>
                    <section className={styles.alingUserImage} onClick={isOpenUserButton ? () => setIsOpenUserButton(false) : () => setIsOpenUserButton(true)}>
                        <img src={perfilIcon} alt={"perfilIcon"}></img>
                        <div className={styles.alingUserName}>
                            <p className={styles.styleUserName}>{"Perfil"}</p>
                            <img src={chevronDown} alt={"chevronDown"}></img>
                        </div>
                        {isOpenUserButton && <EditAndLogoutModal style={{ position: "relative", top: "4em", right: "1em" }} setIsOpen={setIsOpenUserButton} setModalEditUser={setIsOpenModalEditUser}></EditAndLogoutModal>}
                    </section>
                    {isOpenModalEditUser && <ModalEditUser setIsEditSucess={setIsConfirmedEdit} setIsOpen={setIsOpenModalEditUser}></ModalEditUser>}
                </header>
                {isConfirmedEdit && <ModalEditConfirm setIsOpen={setIsConfirmedEdit}></ModalEditConfirm>}
                <section style={{
                    display: "flex"
                }}>
                    <Cobrancas img={cobrancaPagaIcon} type={'Cobranças Pagas'}
                        style={{
                            marginTop: "40px",
                            marginLeft: "90px",
                            background: "#EEF6F6"
                        }}>{formatarParaReais(charges.Paga.total)}</Cobrancas>

                    <Cobrancas img={cobrancaVencidaIcon} type={'Cobranças Vencidas'} style={{
                        marginTop: "40px",
                        marginLeft: "79px",
                        background: "#FFEFEF"
                    }}>{formatarParaReais(charges.Vencida.total)}</Cobrancas>

                    <Cobrancas img={cobrancaPendenteIcon} type={'Cobranças Previstas'} style={{
                        marginTop: "40px",
                        marginLeft: "65px",
                        background: "#FCF6DC"
                    }}>{formatarParaReais(charges.Pendente.total)}</Cobrancas>
                </section>
                <section style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "auto",
                    width: "auto",
                    marginLeft: '1.5%',
                    alignItems: "flex-start "
                }}>
                    <CobrancasTable type={'Cobranças Vencidas'}
                        number={charges.Vencida.quantidade}
                        chargesArray={charges.Vencida.charges}
                        onClick={() => navigate("/cobrancas")}
                        style={{
                            marginTop: "40px",
                            width: "435px",
                            marginLeft: "4%",
                        }} />
                    <CobrancasTable type={'Cobranças Previstas'}
                        number={charges.Pendente.quantidade}
                        chargesArray={charges.Pendente.charges}
                        onClick={() => navigate("/cobrancas")}
                        style={{
                            marginTop: "40px",
                            width: "435px",
                            marginLeft: "3%",
                        }} />
                    <CobrancasTable type={'Cobranças Pagas'}
                        number={charges.Paga.quantidade}
                        chargesArray={charges.Paga.charges}
                        onClick={() => navigate("/cobrancas")}
                        style={{
                            marginTop: "40px",
                            marginLeft: "3%",
                            width: "435px"
                        }} />

                </section>
                <section style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "auto",
                    width: "auto",
                }}>
                    <HomeClientsTable type={'Clientes Inadimplentes'}
                        img={clientsInadimplentesIcon}
                        clientsArray={clients.clientesInadimplentes.clientes}
                        number={clients.clientesInadimplentes.quantidade}
                        onClick={() => navigate("/clientes")}
                        style={{
                            marginTop: "80px",
                            width: "680px",
                            marginLeft: "5.4%"
                        }} />
                    <HomeClientsTable type={'Clientes em dia'}
                        img={clientsEmDiaIcon}
                        clientsArray={clients.clientesEmdia.clientes}
                        number={clients.clientesEmdia.quantidade}
                        onClick={() => navigate("/clientes")}
                        style={{
                            marginTop: "80px",
                            width: "680px",
                            marginLeft: "3%",
                        }} />
                </section>
            </div>
        </section>
    )

}