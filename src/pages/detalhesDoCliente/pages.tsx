// import styles from './styles.module.css'
// import houseIcon from '../../assets/home/houseIcon.png'
// import clientsIcon from '../../assets/home/clientsIcon.png'
// import perfilIcon from '../../assets/home/perfilIcon.png'
// import chevronDown from '../../assets/home/chevron-down.png'
// import past from '../../assets/cobrancas/past.png'
// import seletionedPast from '../../assets/cobrancas/selectionedPast.png'
// import api from '../../services/api'
// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { EditAndLogoutModal } from '../../components/buttons/buttonEditAndLogOutUser/EditAndLogoutModal'
// import { ModalEditUser } from '../../components/modals/modalEditUser/ModalEditUser'
// import { ModalEditConfirm } from '../../components/modals/modalEditConfirm/modalEditConfirm'
// import { CobrancasDoCliente } from '../../components/cobrancasDoClienteComponent/CobrancaDoCliente'
// import { ClientData } from '../../components/clientDataComponent/ClientData'

// interface ClientDetailsProps {
//     style?: React.CSSProperties,
//     setClientEmail?: React.Dispatch<React.SetStateAction<string>>,
//     clientEmail?: string
// }

// export const ClientDetails: React.FC<ClientDetailsProps> = ({ style, setClientEmail, clientEmail }) => {
//     const navigate = useNavigate()


//     const [isOpenUserButton, setIsOpenUserButton] = useState(false)
//     const [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false)
//     const [isConfirmedEdit, setIsConfirmedEdit] = useState(false)
//     const [userName, setUserName] = useState("")
//     const [isOpenDescriptionChargeModal, setIsOpenDescriptionChargeModal] = useState(false)
//     const [idCob, setIdCob] = useState("")
//     const [isOpenEditCharge, setIsOpenEditCharge] = useState(false)
//     const [isOpenDeleteAlart, setIsOpenDeleteAlart] = useState(false)


//     let user = localStorage.getItem("user")
//     if (user == null) return
//     user = JSON.parse(user)


//     const [charges, setCharges] = useState([
//         {
//             nome: "",
//             id_cob: "",
//             valor: 0,
//             data_venc: "",
//             status: "",
//             descricao: "",
//             usuario_id: 0,
//             id: 0
//         }
//     ])


//     const getCharges = async () => {
//         try {
//             const { data } = await api.get('/allCharges')
//             console.log(data);

//             if (data) {
//                 setCharges(data)
//             }

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const getUser = async () => {
//         try {
//             const { data } = await api.get(`/userDetails/${user.id}`);
//             console.log(data.user.nome);
//             setUserName(data.user.nome)

//         } catch (error) {
//             console.log(error);

//         }
//     }

//     useEffect(() => {
//         getCharges()
//         getUser()

//     }, [isOpenModalEditUser, isConfirmedEdit, isOpenDeleteAlart, isOpenEditCharge, isOpenDeleteAlart])

//     return (
//         <section className={styles.screenBackground}>
//             <aside className={styles.screenAside} style={{
//                 zIndex: "11"
//             }}>
//                 <div className={styles.positionIcons} onClick={() => navigate("/home")}>
//                     <img src={houseIcon} alt="houseIcon"></img>
//                     <p className={styles.styleIconText}>Home</p>
//                 </div>
//                 <div className={styles.positionIcons} onClick={() => navigate("/clientes")}>
//                     <img src={clientsIcon} alt="clientsIcon"></img>
//                     <p className={styles.styleIconText}>Clientes</p>
//                 </div>
//                 <div className={styles.positionSelectionedIcons}    >
//                     <img src={seletionedPast} alt="houseIcon"></img>
//                     <p className={styles.styleSelectionedIconText}>Cobranças</p>
//                 </div>
//             </aside>
//             <div style={{
//                 width: "100%",
//             }}>
//                 <header className={styles.alingHeader}>
//                     <h1 className={styles.pageTitle}>Clientes</h1>
//                     <section className={styles.alingUserImage} onClick={isOpenUserButton ? () => setIsOpenUserButton(false) : () => setIsOpenUserButton(true)}>
//                         <img src={perfilIcon} alt={"perfilIcon"}></img>
//                         <div className={styles.alingUserName}>
//                             <p className={styles.styleUserName}>{userName}</p>
//                             <img src={chevronDown} alt={"chevronDown"}></img>
//                         </div>
//                         {isOpenUserButton && <EditAndLogoutModal style={{ position: "relative", top: "4em", right: "1em" }} setIsOpen={setIsOpenUserButton} setModalEditUser={setIsOpenModalEditUser}></EditAndLogoutModal>}
//                     </section>
//                     {isOpenModalEditUser && <ModalEditUser setIsEditSucess={setIsConfirmedEdit} setIsOpen={setIsOpenModalEditUser}></ModalEditUser>}
//                 </header>
//                 {isConfirmedEdit && <ModalEditConfirm setIsOpen={setIsConfirmedEdit}></ModalEditConfirm>}
//                 <section className={styles.alingNavBar}>
//                     <div className={styles.alingTitleImage}>
//                         <img src={past} alt={'pastCobrancas'} />
//                         <h1 className={styles.navBarTitle}>Cobranças</h1>
//                     </div>

//                 </section>
//                 <ClientData
//                     idCob={idCob}
//                     setIdCob={setIdCob}
//                     isOpenDeleteAlart={isOpenDeleteAlart}
//                     setIsOpenDeleteAlart={setIsOpenDeleteAlart}
//                     isOpenEditCharge={isOpenEditCharge}
//                     setIsOpenEditCharge={setIsOpenEditCharge}
//                     arrayCharges={charges}
//                     isOpenDescriptionChargeModal={isOpenDescriptionChargeModal}
//                     setIsOpenDescriptionChargeModal={setIsOpenDescriptionChargeModal}
//                     style={{
//                         marginTop: "40px",
//                         marginLeft: "9%",
//                         width: "80%",
//                     }}></ClientData>
//                 <CobrancasDoCliente
//                     idCob={idCob}
//                     setIdCob={setIdCob}
//                     isOpenDeleteAlart={isOpenDeleteAlart}
//                     setIsOpenDeleteAlart={setIsOpenDeleteAlart}
//                     isOpenEditCharge={isOpenEditCharge}
//                     setIsOpenEditCharge={setIsOpenEditCharge}
//                     arrayCharges={charges}
//                     isOpenDescriptionChargeModal={isOpenDescriptionChargeModal}
//                     setIsOpenDescriptionChargeModal={setIsOpenDescriptionChargeModal}
//                     style={{
//                         marginTop: "40px",
//                         marginLeft: "9%",
//                         width: "80%",
//                     }}></CobrancasDoCliente>
//             </div>
//         </section>

//     )

// }