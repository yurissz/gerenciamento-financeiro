import styles from './styles.module.css'
import confirmIcom from '../../../assets/home/confirmIcon.png'

interface ModalProps {
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalEditConfirm: React.FC<ModalProps> = ({ setIsOpen }) => {
    return (
        <div className={styles.styleBackground} onClick={() => setIsOpen(false)}>
            <section className={styles.styleModal}>
                <img src={confirmIcom} alt="confirmIcon" className={styles.image} />
                <h1 className={styles.title}>Cadastro alterado com sucesso!</h1>
            </section >
        </div >
    )
}