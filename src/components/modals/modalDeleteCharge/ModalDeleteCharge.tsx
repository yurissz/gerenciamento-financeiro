import styles from './styles.module.css'
import alertIcon from '../../../assets/cobrancas/alertIcon.png'
import api from '../../../services/api'


interface CobrancasProps {
    onClick?: () => void
    style?: React.CSSProperties,
    id_cob: string,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalDeleteCharge: React.FC<CobrancasProps> = ({ id_cob, setIsOpen }) => {

    console.log(id_cob);

    const deleteCharge = async (id_cob: string) => {
        try {
            await api.delete(`/deleteCharge/${id_cob}`)
        } catch (error) {

        }
    }


    return (
        <div className={styles.styleBackground} onClick={() => setIsOpen(false)}>
            <section className={styles.styleModal}>
                <img src={alertIcon} alt="alertIcon" className={styles.image} />
                <h1 className={styles.title}>Tem certeza que deseja excluir esta cobrança?</h1>
                <div className={styles.alingButtons}>
                    <button className={styles.negativeButton} onClick={() => setIsOpen(false)}>Não</button>
                    <button className={styles.positiveButton} onClick={() => deleteCharge(id_cob)}>Sim</button>
                </div>
            </section >
        </div >
    )
}