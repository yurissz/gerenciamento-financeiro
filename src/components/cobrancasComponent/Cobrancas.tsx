import './cobrancas.css'

interface CobrancasProps {
    children: React.ReactNode,
    style?: React.CSSProperties,
    img: string,
    type: string
}

export const Cobrancas: React.FC<CobrancasProps> = ({ style, children, img, type }) => {

    return (
        <section style={style} className='styleConteiner'>
            <img src={img} alt='Cobranca Icone' className='image' />
            <div className='alingSegundaryConteiner'>
                <h2 className='text'>{type}</h2>
                <p className='number'>{children}</p>
            </div>
        </section>
    )
}
