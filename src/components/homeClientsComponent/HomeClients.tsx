import styles from './styles.module.css'
import { IClient } from '../../interfaces/clients'

interface HomeClientsProps {
    onClick?: () => void
    style?: React.CSSProperties,
    type: string
    number: string
    clientsArray: IClient[]
    img: string
}

export const HomeClientsTable: React.FC<HomeClientsProps> = ({ style, type, onClick, number, clientsArray, img }) => {
    return (
        <section style={style} className={styles.conteiner}>
            <header className={styles.header}>
                <div style={{
                    display: "flex",
                    gap: "9px"
                }}>
                    <img src={img} alt="imageComponent" />
                    <h1 className={styles.text}>{type}</h1>
                </div>
                {type === "Clientes Inadimplentes" &&
                    <div className={styles.conteinerNumber} style={{
                        background: " #FFEFEF"
                    }}>
                        <p className={styles.styleNumberCobrancas} style={{
                            color: "#971D1D"
                        }}>{number}</p>
                    </div>}
                {type === "Clientes em dia" &&
                    <div className={styles.conteinerNumber} style={{
                        background: "#EEF6F6"
                    }}>
                        <p className={styles.styleNumberCobrancas} style={{
                            color: "#1FA7AF"
                        }}>{number}</p>
                    </div>}
            </header>
            <div className={styles.stylePrincipalConteiner}>
                <section className={styles.alingClassification}>
                    <h2 className={styles.styleClassification}>Cliente</h2>
                    <h2 className={styles.styleClassification}>ID da clie.</h2>
                    <h2 className={styles.styleClassification}>CPF</h2>
                </section>
                {clientsArray.slice(0, 4).map((person) =>
                    <section className={styles.alingItens}>
                        <p className={styles.styleItens}>{person.nome}</p>
                        <p className={styles.styleItens}>{person.id}</p>
                        <p className={styles.styleItens}>{person.cpf}</p>
                    </section>
                )

                }
                <footer className={styles.styleFooter}>
                    <h3 onClick={onClick} className={styles.textFooter}>Ver todos</h3>
                </footer>
            </div>
        </section>
    )
}
