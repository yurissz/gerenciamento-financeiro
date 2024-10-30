import styles from './styles.module.css'
import confirmIcom from '../../../assets/home/confirmIcon.png'

interface ModalProps {
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalEditConfirm: React.FC<ModalProps> = ({ setIsOpen }) => {

    const handleClose = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }
    };


    return (
        <div className={styles.styleBackground} onClick={handleClose}>
            <section className={styles.styleModal} onClick={(e) => e.stopPropagation()}>
                <img src={confirmIcom} alt="confirmIcon" className={styles.image} />
                <h1 className={styles.title}>Cadastro alterado com sucesso!</h1>
            </section >
        </div >
    )
}