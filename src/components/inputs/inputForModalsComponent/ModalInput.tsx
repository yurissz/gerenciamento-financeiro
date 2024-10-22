import React, { forwardRef } from 'react';
import styles from './styles.module.css'; // Import do CSS Module

interface ModalInputProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: () => void;
    placeholder?: string;
    id?: string;
    type?: string;
    styleInput?: React.CSSProperties;
    styleP?: React.CSSProperties;
    value?: string;
    [key: string]: any;
    error?: boolean
}

const ModalInput = forwardRef<HTMLInputElement, ModalInputProps>(
    ({ children, style, onClick, placeholder, id, type, styleInput, styleP, value, error, ...props }, ref) => {
        return (
            <div className={styles.styleContainer} style={style}>
                <label className={styles.styleP} style={styleP}>
                    {children}
                </label>
                <input
                    className={`${error ? styles.erroStyleInput : styles.styleInput}`}
                    ref={ref}
                    {...props}
                    onClick={onClick}
                    placeholder={placeholder}
                    id={id}
                    type={type}
                    style={styleInput}
                    value={value}
                />
            </div>
        );
    }
);

export default ModalInput;


