import './button.css'

interface ButtonProps {
    onClick?: () => void,
    onSubmit?: () => void,
    children: React.ReactNode,
    style?: React.CSSProperties,
    type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<ButtonProps> = ({ style, type, children, onClick }) => {

    return (
        <button className="customButton" style={style} type={type} onClick={onClick}>
            {children}
        </button>
    )
}