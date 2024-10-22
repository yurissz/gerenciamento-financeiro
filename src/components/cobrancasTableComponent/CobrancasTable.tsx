import { ICharges } from '../../interfaces/charges'
import { formatarParaReais } from '../../utils/formatToReais'
import styles from './styles.module.css'

interface CobrancasProps {
    onClick?: () => void
    style?: React.CSSProperties,
    type: string
    number: number
    chargesArray: ICharges[]
}

export const CobrancasTable: React.FC<CobrancasProps> = ({ style, type, onClick, number, chargesArray }) => {


    return (
        <section style={style} className={styles.conteiner}>
            <header className={styles.header}>
                <h1 className={styles.text}>{type}</h1>
                {type == "Cobranças Vencidas" &&
                    <div className={styles.conteinerNumber} style={{
                        background: "#FFEFEF"
                    }}>
                        <p className={styles.styleNumberCobrancas} style={{
                            color: "#971D1D"
                        }}>{number}</p>
                    </div>
                }
                {type == "Cobranças Previstas" &&
                    <div className={styles.conteinerNumber} style={{
                        background: "#FCF6DC"
                    }}>
                        <p className={styles.styleNumberCobrancas} style={{
                            color: "#C5A605"
                        }}>{number}</p>
                    </div>
                }
                {type == "Cobranças Pagas" &&
                    <div className={styles.conteinerNumber} style={{
                        background: "#EEF6F6"
                    }}>
                        <p className={styles.styleNumberCobrancas} style={{
                            color: "#1FA7AF"
                        }}>{number}</p>
                    </div>
                }

            </header>
            <div className={styles.stylePrincipalConteiner}>
                <section className={styles.alingClassification}>
                    <h2 className={styles.styleClassification}>Cliente</h2>
                    <h2 className={styles.styleClassification}>ID da cob.</h2>
                    <h2 className={styles.styleClassification}>Valor</h2>
                </section>
                {
                    chargesArray.slice(0, 4).map((charge) => <section className={styles.alingItens}>
                        <p className={styles.styleItens}>{charge.nome}</p>
                        <p className={styles.styleItens}>{charge.id_cob}</p>
                        <p className={styles.styleItens}>{formatarParaReais(charge.valor)}</p>
                    </section>)
                }
            </div>
            <footer className={styles.styleFooter}>
                <h3 onClick={onClick} className={styles.textFooter}>Ver todos</h3>
            </footer>
        </section>
    )
}
