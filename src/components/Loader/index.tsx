import styles from "./Loader.module.css"

export function Loader() {
    return (
        <div className={styles.conteiner}>
            <div className={styles.loader}></div>
        </div>
    )
}