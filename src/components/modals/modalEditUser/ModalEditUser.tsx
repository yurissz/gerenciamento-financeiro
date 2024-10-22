import styles from './styles.module.css'
import close from '../../../assets/clients/close.png'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { Button } from '../../buttons/buttonComponent/Button';
import api from '../../../services/api';
import { IeditUser } from '../../../interfaces/signIn';

const schema = yup.object({
    nome: yup.string().required('Este campo deve ser preenchido'),
    email: yup.string().email().required('Este campo deve ser preenchido'),
    cpf: yup.string().required("Este campo deve ser preenchido"),
    senha: yup.string().required("Este campo deve ser preenchido"),
    telefone: yup.string().required("Este campo deve ser preenchido"),
    confirmSenha: yup.string().required("Este campo deve ser preenchido").oneOf([yup.ref('senha'), null], 'As senhas devem coincidir')
});

interface ModalProps {
    isOpen?: boolean,
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
    setIsEditSucess?: React.Dispatch<React.SetStateAction<boolean>>
    id_cob?: string
}

export const ModalEditUser = ({ isOpen, setIsOpen, id_cob, setIsEditSucess }: ModalProps) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const handleForm = async (inputValue: IeditUser) => {
        try {
            const { data } = await api.put("/updateUser", {
                nome: inputValue.nome,
                email: inputValue.email,
                cpf: inputValue.cpf,
                telefone: inputValue.telefone,
                senha: inputValue.senha,
            });
            console.log(data);
            setIsOpen(false)
            setIsEditSucess(true)
        } catch (error) {
            console.log(error);

            alert('Ocorreu um erro');
        }
    };



    return (
        <div className={styles.styleBackground}>
            <section className={styles.styleModal}>
                <header className={styles.styleHeader}>
                    <div>
                        <h1>Edição de cadastro</h1>
                    </div>
                    <img src={close} alt="closeIcon" onClick={() => setIsOpen(false)} />
                </header>
                <div>
                    <form onSubmit={handleSubmit(handleForm)}>
                        <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                            <label htmlFor="" className={styles.styleLabelNome} >Nome*</label>
                            <input type={"text"} {...register("nome")} className={`${errors.nome?.message ? styles.erroStyleInput : styles.styleInputNome}`} placeholder={"Digite seu nome"} />
                            <p className={styles.errorText}>{errors.nome?.message}</p>
                        </div>
                        <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                            <label htmlFor="" className={styles.styleLabelNome}>Email*</label>
                            <input {...register("email")} className={`${errors.email?.message ? styles.erroStyleInput : styles.styleInputNome}`} placeholder={"Digite seu email"} />
                            <p className={styles.errorText}>{errors.email?.message}</p>
                        </div>
                        <div className={styles.alingSpaces}>
                            <div className={styles.alingErrors}>
                                <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                                    <label htmlFor="" className={styles.styleLabelNome}>CPF</label>
                                    <input type={"text"} {...register("cpf")} className={`${errors.cpf?.message ? styles.erroStyleInput : styles.styleInputNome}`} placeholder={"Digite seu CPF"} style={{ width: "12em" }} />
                                    <p className={styles.errorText}>{errors.cpf?.message}</p>
                                </div>
                            </div>
                            <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                                <label htmlFor="" className={styles.styleLabelNome}>Telefone</label>
                                <input type={"text"} {...register("telefone")} className={`${errors.telefone?.message ? styles.erroStyleInput : styles.styleInputNome}`} placeholder={"Digite o telefone"} style={{ width: "12em" }} />
                                <p className={styles.errorText}>{errors.telefone?.message}</p>
                            </div>
                        </div>
                        <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                            <label htmlFor="" className={styles.styleLabelNome}>Nova Senha*</label>
                            <input className={`${errors.senha?.message ? styles.erroStyleInput : styles.styleInputNome}`} type={"password"} {...register("senha")} placeholder={"Digite sua senha"} />
                            <p className={styles.errorText}>{errors.senha?.message}</p>
                            <label htmlFor="" className={styles.styleLabelNome} style={{ paddingTop: "15px" }}>Confirmar senha*</label>
                            <input className={`${errors.confirmSenha?.message ? styles.erroStyleInput : styles.styleInputNome}`} type={"password"} {...register("confirmSenha")} placeholder={"Digite sua senha"} />
                            <p className={styles.errorText}>{errors.confirmSenha?.message}</p>
                        </div>
                        <div style={{
                            display: "flex"
                        }}>
                            <Button
                                type={"submit"}
                                style={{
                                    marginTop: "4%",
                                    width: "42%",
                                    marginLeft: "28%",
                                }}>Aplicar</Button>
                        </div>
                    </form>
                </div>
            </section >
        </div >
    )
}