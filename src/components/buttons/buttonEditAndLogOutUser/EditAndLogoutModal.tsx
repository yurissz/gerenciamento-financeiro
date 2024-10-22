import styles from './styles.module.css'
import pen from '../../../assets/cobrancas/pen.png'
import logout from '../../../assets/auth/logoutIcon.png'
import { SetStateAction } from 'react'
import { useNavigate } from "react-router-dom";
interface EditAndLogoutModalProps {
    onClick?: () => void
    style?: React.CSSProperties,
    setIsOpen: React.Dispatch<SetStateAction<boolean>>,
    setModalEditUser: React.Dispatch<SetStateAction<boolean>>,
}

export const EditAndLogoutModal: React.FC<EditAndLogoutModalProps> = ({ style, setModalEditUser }) => {

    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/');
        localStorage.clear();
    }

    return (
        <section style={style} className={styles.styleConteiner}>
            <div onClick={() => setModalEditUser(true)}>
                <img src={pen} alt="penIcon" />
                <p className={styles.styleText}>Editar</p>
            </div>
            <div onClick={handleLogout}>
                <img src={logout} alt="logOutIcon" />
                <p className={styles.styleText}>Sair</p>
            </div>
        </section>
    )
}