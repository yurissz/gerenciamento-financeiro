import styles from './styles.module.css'
import houseIcon from '../../assets/home/houseIcon.png'
import clientsIcon from '../../assets/clients/clientsSelected.png'
import perfilIcon from '../../assets/home/perfilIcon.png'
import chevronDown from '../../assets/home/chevron-down.png'
import past from '../../assets/cobrancas/past.png'
import filter from '../../assets/cobrancas/filter.png'
import search from '../../assets/cobrancas/search.png'
import pastIcon from '../../assets/home/pastIcon.png'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import { ClientsPage } from '../../components/clientsPageComponent/ClientsPage'
import { ModalRegisterClient } from '../../components/modals/modalRegisterClient/ModalRegisterClient'
import { ModalRegisterCharge } from '../../components/modals/modalRegisterCharge/ModalRegisterCharge'
import { useNavigate } from 'react-router-dom'
import { EditAndLogoutModal } from '../../components/buttons/buttonEditAndLogOutUser/EditAndLogoutModal'
import { ModalEditUser } from '../../components/modals/modalEditUser/ModalEditUser'
import { ModalEditConfirm } from '../../components/modals/modalEditConfirm/modalEditConfirm'
import { ClientData } from '../../components/clientDataComponent/ClientData'
import { CobrancasDoCliente } from '../../components/cobrancasDoClienteComponent/CobrancaDoCliente'
import { IChargesCobrancasPage } from '../../interfaces/charges'
import { IClientsClientesPage } from '../../interfaces/clients'
import { ModalEditClient } from '../../components/modals/modalEditClient/ModalEditClient'
import modalClientsIcom from '../../assets/clients/modalClientsIcon.png'

export default function UserClients() {

    const navigate = useNavigate()
    const [isOpenUserButton, setIsOpenUserButton] = useState(false)


    let user = localStorage.getItem("user")
    if (user == null) return
    user = JSON.parse(user)

    const [isOpenAddClientModel, setIsOpenAddClientModel] = useState(false)
    const [isOpenAddChargeModel, setIsOpenAddChargeModel] = useState(false)
    const [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false)
    const [isConfirmedEdit, setIsConfirmedEdit] = useState(false)
    const [userName, setUserName] = useState("")

    const [isOpenDescriptionChargeModal, setIsOpenDescriptionChargeModal] = useState(false)
    const [idCob, setIdCob] = useState("")
    const [isOpenEditCharge, setIsOpenEditCharge] = useState(false)
    const [isOpenDeleteAlart, setIsOpenDeleteAlart] = useState(false)

    const [isOpenDetailClientPage, setIsOpenDetailClientPage] = useState(false)
    const [clientEmail, setClientEmail] = useState("")
    const [clientId, setClientId] = useState(0)

    const [isOpenEditClient, setIsOpenEditClient] = useState(false)
    const [isOpenRegisterCharge, setIsOpenRegisterCharge] = useState(false)

    const [clients, setClients] = useState([
        {
            id: 0,
            nome: "",
            cpf: "",
            email: "",
            telefone: "",
            status: ""
        }
    ])

    const [charges, setCharges] = useState([
        {
            nome: "",
            id_cob: "",
            valor: 0,
            data_venc: "",
            status: "",
            descricao: "",
            usuario_id: 0,
            id: 0
        }
    ])

    const [detail, setDetail] = useState({
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        endereco: "",
        complemento: "",
        cep: "",
        bairro: "",
        cidade: "",
        uf: "",
        status: "",
        usuario_id: ""
    })

    const getClients = async () => {
        try {
            const { data } = await api.get('/searchClients')
            console.log(data);

            if (data) {
                setClients(data)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const getUser = async () => {
        try {
            const { data } = await api.get(`/userDetails/${user.id}`);
            console.log(data.user.nome);
            setUserName(data.user.nome)

        } catch (error) {
            console.log(error);

        }
    }

    const getCharges = async () => {
        try {

            const clientArray = await api.get('/consultClient')

            const consultClient = clientArray.data.filter((client: IClientsClientesPage) => client.email === clientEmail)

            const clientId = consultClient[0].id

            setClientId(clientId)
            console.log(clientId);


            const { data } = await api.get('/allCharges')
            console.log(data);

            const arrayFiltrado = data.filter((charge: IChargesCobrancasPage) => charge.id === clientId)
            console.log(arrayFiltrado);
            setCharges(arrayFiltrado)

            const clientDetails = await api.get(`/clientDetails/${clientId}`)
            console.log(clientDetails.data.client);
            setDetail(clientDetails.data.client)

        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        getClients()
        getUser()
        getCharges()
    }, [isOpenModalEditUser, isOpenAddClientModel, isOpenDetailClientPage, isOpenEditClient, isOpenRegisterCharge])


    return (
        <section className={styles.screenBackground} >
            <aside className={styles.screenAside} style={{
                zIndex: "11"
            }}>
                <div className={styles.positionIcons} onClick={() => navigate("/home")} >
                    <img src={houseIcon} alt="houseIcon"></img>
                    <p className={styles.styleIconText}>Home</p>
                </div>
                <div className={styles.positionSelectionedIcons}>
                    <img src={clientsIcon} alt="clientsIcon"></img>
                    <p className={styles.styleSelectionedIconText}>Clientes</p>
                </div>
                <div className={styles.positionIcons} onClick={() => navigate("/cobrancas")} >
                    <img src={pastIcon} alt="houseIcon"></img>
                    <p className={styles.styleIconText}>Cobranças</p>
                </div>
            </aside>

            {isOpenDetailClientPage === false &&
                <div style={{
                    width: "100%",
                }}>
                    <header className={styles.alingHeader}>
                        <h1 className={styles.pageTitle}>Clientes</h1>
                        <section className={styles.alingUserImage} onClick={isOpenUserButton ? () => setIsOpenUserButton(false) : () => setIsOpenUserButton(true)}>
                            <img src={perfilIcon} alt={"perfilIcon"}></img>
                            <div className={styles.alingUserName}>
                                <p className={styles.styleUserName}>{userName}</p>
                                <img src={chevronDown} alt={"chevronDown"}></img>
                            </div>
                            {isOpenUserButton && <EditAndLogoutModal style={{ position: "relative", top: "4em", right: "1em" }} setIsOpen={setIsOpenUserButton} setModalEditUser={setIsOpenModalEditUser}></EditAndLogoutModal>}
                        </section>
                        {isOpenModalEditUser && <ModalEditUser setIsEditSucess={setIsConfirmedEdit} setIsOpen={setIsOpenModalEditUser}></ModalEditUser>}
                    </header>
                    {isConfirmedEdit && <ModalEditConfirm setIsOpen={setIsConfirmedEdit}></ModalEditConfirm>}
                    <section className={styles.alingNavBar}>
                        <div className={styles.alingTitleImage}>
                            <img src={modalClientsIcom} alt={'icon'} />
                            <h1 className={styles.navBarTitle}>Clientes</h1>
                        </div>
                        <div className={styles.alingSearchConteiner}>
                            <button className={styles.botaoAddClient} onClick={() => setIsOpenAddClientModel(true)}>Adicionar clientes</button>
                            <img src={filter} alt={'filterCobrancas'} />
                            <div className={styles.styleSearchConteiner}>
                                <input placeholder={'Pesquisar'} type={'search'}></input>
                                <img src={search} alt={'searchImageCobrancas'}></img>
                            </div>
                        </div>
                    </section>
                    <ClientsPage
                        setClientEmail={setClientEmail}
                        setClientId={setClientId}
                        setIsOpenAddChargeModal={setIsOpenAddChargeModel}
                        setIsOpenDetailClientPage={setIsOpenDetailClientPage}
                        arrayClients={clients}
                        style={{
                            marginTop: "40px",
                            marginLeft: "9%",
                            width: "80%",
                        }}></ClientsPage>

                </div>
            }
            {isOpenDetailClientPage === true &&
                <div style={{
                    width: "100%",
                }}>
                    <header className={styles.alingHeader}>
                        <h1 className={styles.pageTitle}>Clientes</h1>
                        <section className={styles.alingUserImage} onClick={isOpenUserButton ? () => setIsOpenUserButton(false) : () => setIsOpenUserButton(true)}>
                            <img src={perfilIcon} alt={"perfilIcon"}></img>
                            <div className={styles.alingUserName}>
                                <p className={styles.styleUserName}>{userName}</p>
                                <img src={chevronDown} alt={"chevronDown"}></img>
                            </div>
                            {isOpenUserButton && <EditAndLogoutModal style={{ position: "relative", top: "4em", right: "1em" }}
                                setIsOpen={setIsOpenUserButton}
                                setModalEditUser={setIsOpenModalEditUser}>
                            </EditAndLogoutModal>}
                        </section>
                        {isOpenModalEditUser && <ModalEditUser setIsEditSucess={setIsConfirmedEdit}
                            setIsOpen={setIsOpenModalEditUser}>
                        </ModalEditUser>}
                    </header>
                    {isConfirmedEdit && <ModalEditConfirm setIsOpen={setIsConfirmedEdit}></ModalEditConfirm>}
                    <section className={styles.alingNavBar}>
                        <div className={styles.alingTitleImage}>
                            <img src={modalClientsIcom} alt={'icon'} />
                            <h1 className={styles.navBarTitle}>{detail.nome}</h1>
                        </div>
                        {isOpenRegisterCharge &&
                            <ModalRegisterCharge clientId={clientId}
                                isOpen={isOpenRegisterCharge}
                                setIsOpen={setIsOpenRegisterCharge}>
                            </ModalRegisterCharge>
                        }
                    </section>
                    <ClientData
                        detail={detail}
                        idCob={idCob}
                        setIdCob={setIdCob}
                        clientId={clientId}
                        isOpenDetailClientPage={isOpenDetailClientPage}
                        setIsOpenEditClient={setIsOpenEditClient}
                        style={{
                            marginTop: "40px",
                            marginLeft: "9%",
                            width: "80%",
                        }}></ClientData>
                    {isOpenEditClient && <ModalEditClient isOpen={isOpenEditClient}
                        setIsOpen={setIsOpenEditClient}
                        clientId={clientId}
                    ></ModalEditClient>}
                    <CobrancasDoCliente
                        idCob={idCob}
                        setIdCob={setIdCob}
                        isOpenDeleteAlart={isOpenDeleteAlart}
                        setIsOpenDeleteAlart={setIsOpenDeleteAlart}
                        isOpenEditCharge={isOpenEditCharge}
                        setIsOpenEditCharge={setIsOpenEditCharge}
                        arrayCharges={charges}
                        isOpenDescriptionChargeModal={isOpenDescriptionChargeModal}
                        setIsOpenDescriptionChargeModal={setIsOpenDescriptionChargeModal}
                        setIsOpenRegisterCharge={setIsOpenRegisterCharge}
                        style={{
                            marginTop: "40px",
                            marginLeft: "9%",
                            width: "80%",
                        }}></CobrancasDoCliente>
                </div>
            }
            {isOpenAddClientModel && <ModalRegisterClient setIsOpen={setIsOpenAddClientModel} isOpen={isOpenAddClientModel}></ModalRegisterClient>}
            {isOpenAddChargeModel && <ModalRegisterCharge clientId={clientId} setIsOpen={setIsOpenAddChargeModel}></ModalRegisterCharge>}
        </section >

    )

}