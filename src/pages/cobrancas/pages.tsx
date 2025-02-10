import styles from './styles.module.css'
import houseIcon from '../../assets/home/houseIcon.png'
import clientsIcon from '../../assets/home/clientsIcon.png'
import perfilIcon from '../../../public/iconperfil.png'
import chevronDown from '../../assets/home/chevron-down.png'
import past from '../../assets/cobrancas/past.png'
import filter from '../../assets/cobrancas/filter.png'
import search from '../../assets/cobrancas/search.png'
import seletionedPast from '../../assets/cobrancas/selectionedPast.png'
import { CobrancasPage } from '../../components/cobrancasPageComponent/CobrancasPage'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EditAndLogoutModal } from '../../components/buttons/buttonEditAndLogOutUser/EditAndLogoutModal'
import { ModalEditUser } from '../../components/modals/modalEditUser/ModalEditUser'
import { ModalEditConfirm } from '../../components/modals/modalEditConfirm/modalEditConfirm'

export default function UserCobrancas() {
    const navigate = useNavigate()

    const [isOpenUserButton, setIsOpenUserButton] = useState(false)
    const [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false)
    const [isConfirmedEdit, setIsConfirmedEdit] = useState(false)
    const [isOpenDescriptionChargeModal, setIsOpenDescriptionChargeModal] = useState(false)

    const [idCob, setIdCob] = useState("")
    const [isOpenEditCharge, setIsOpenEditCharge] = useState(false)
    const [isOpenDeleteAlart, setIsOpenDeleteAlart] = useState(false)


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


    const getCharges = async () => {
        try {
            const { data } = await api.get('/allCharges')

            if (data) {
                setCharges(data)
            }

        } catch (error) {
        }
    }

    useEffect(() => {
        getCharges()

    }, [isOpenModalEditUser, isConfirmedEdit, isOpenDeleteAlart, isOpenEditCharge])

    return (
        <section className={styles.screenBackground}>
            <aside className={styles.screenAside} style={{
                zIndex: "11"
            }}>
                <div className={styles.positionIcons} onClick={() => navigate("/home")}>
                    <img src={houseIcon} alt="houseIcon"></img>
                    <p className={styles.styleIconText}>Home</p>
                </div>
                <div className={styles.positionIcons} onClick={() => navigate("/clientes")}>
                    <img src={clientsIcon} alt="clientsIcon"></img>
                    <p className={styles.styleIconText}>Clientes</p>
                </div>
                <div className={styles.positionSelectionedIcons}    >
                    <img src={seletionedPast} alt="houseIcon"></img>
                    <p className={styles.styleSelectionedIconText}>Cobranças</p>
                </div>
            </aside>
            <div style={{
                width: "100%",
            }}>
                <header className={styles.alingHeader}>
                    <h1 className={styles.pageTitle}>Cobranças</h1>
                    <section className={styles.alingUserImage} onClick={isOpenUserButton ? () => setIsOpenUserButton(false) : () => setIsOpenUserButton(true)}>
                        <img src={perfilIcon} alt={"perfilIcon"} style={{ width: 50, height: 50 }}></img>
                        <div className={styles.alingUserName}>
                            <p className={styles.styleUserName}>{"Perfil"}</p>
                            <img src={chevronDown} alt={"chevronDown"}></img>
                        </div>
                        {isOpenUserButton && <EditAndLogoutModal style={{ position: "relative", top: "4em", right: "1em" }} setIsOpen={setIsOpenUserButton} setModalEditUser={setIsOpenModalEditUser}></EditAndLogoutModal>}
                    </section>
                    {isOpenModalEditUser && <ModalEditUser setIsEditSucess={setIsConfirmedEdit} setIsOpen={setIsOpenModalEditUser}></ModalEditUser>}
                </header>
                {isConfirmedEdit && <ModalEditConfirm setIsOpen={setIsConfirmedEdit}></ModalEditConfirm>}
                <section className={styles.alingNavBar}>
                    <div className={styles.alingTitleImage}>
                        <img src={past} alt={'pastCobrancas'} />
                        <h1 className={styles.navBarTitle}>Cobranças</h1>
                    </div>
                    <div className={styles.alingSearchConteiner}>
                        <img src={filter} alt={'filterCobrancas'} />
                        <div className={styles.styleSearchConteiner}>
                            <input placeholder={'Pesquisar'} type={'search'}></input>
                            <img src={search} alt={'searchImageCobrancas'}></img>
                        </div>
                    </div>
                </section>
                <CobrancasPage
                    idCob={idCob}
                    setIdCob={setIdCob}
                    isOpenDeleteAlart={isOpenDeleteAlart}
                    setIsOpenDeleteAlart={setIsOpenDeleteAlart}
                    isOpenEditCharge={isOpenEditCharge}
                    setIsOpenEditCharge={setIsOpenEditCharge}
                    arrayCharges={charges}
                    isOpenDescriptionChargeModal={isOpenDescriptionChargeModal}
                    setIsOpenDescriptionChargeModal={setIsOpenDescriptionChargeModal}
                    style={{
                        marginTop: "40px",
                        marginLeft: "9%",
                        width: "80%",
                    }}></CobrancasPage>
            </div>
        </section>

    )

}