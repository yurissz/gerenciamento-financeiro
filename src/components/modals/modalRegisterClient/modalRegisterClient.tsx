import styles from './styles.module.css'
import modalClientIcon from '../../../assets/clients/modalClientsIcon.png'
import close from '../../../assets/clients/close.png'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { Button } from '../../buttons/buttonComponent/Button';
import api from '../../../services/api';
import { IClientsForm } from '../../../interfaces/clients';
import ModalInput from '../../inputs/inputForModalsComponent/ModalInput';

const schema = yup.object({
    nome: yup.string().required('Este campo deve ser preenchido'),
    email: yup.string().required('Este campo deve ser preenchido').email("O campo deve ser um email"),
    cpf: yup.string().required("Este campo deve ser preenchido"),
    telefone: yup.string().required("Este campo deve ser preenchido"),
    endereco: yup.string(),
    complemento: yup.string(),
    cep: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    uf: yup.string()
});

interface ModalProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export const ModalRegisterClient = ({ setIsOpen }: ModalProps) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleForm = async (inputValue: IClientsForm) => {
        try {
            api.post('/registerClient', {
                nome: inputValue.nome,
                email: inputValue.email,
                cpf: inputValue.cpf,
                telefone: inputValue.telefone,
                endereco: inputValue.endereco,
                complemento: inputValue.complemento,
                cep: inputValue.cep,
                bairro: inputValue.bairro,
                cidade: inputValue.cidade,
                uf: inputValue.uf
            });
            setIsOpen(false)


        } catch (error) {
            alert('Ocorreu um erro');
        }
    };

    return (
        <div className={styles.styleBackground}>
            <section className={styles.styleModal}>
                <header className={styles.styleHeader}>
                    <div>
                        <img src={modalClientIcon} alt="modalClientIcon" />
                        <h1>Cadastro do Cliente</h1>
                    </div>
                    <img src={close} alt="closeIcon" onClick={() => setIsOpen(false)} />
                </header>
                <div>
                    <form onSubmit={handleSubmit(handleForm)}>
                        <ModalInput {...register("nome")} error={errors.nome?.message} placeholder={"Digite o nome"} style={{ paddingTop: "15px" }}>Nome*</ModalInput>
                        <p className={styles.errorText}>{errors.nome?.message}</p>
                        <ModalInput {...register("email")} error={errors.email?.message} placeholder={"Digite o email"} style={{ paddingTop: "20px" }}>Email*</ModalInput>
                        <p className={styles.errorText}>{errors.email?.message}</p>
                        <div className={styles.alingSpaces}>
                            <div className={styles.alingErrors}>
                                <ModalInput {...register("cpf")} error={errors.cpf?.message} placeholder={"Digite o CPF"} styleInput={{ width: "14em" }}>CPF*</ModalInput>
                                <p className={styles.errorText}>{errors.cpf?.message}</p>
                            </div>
                            <div className={styles.alingErrors}>
                                <ModalInput {...register("telefone")} error={errors.telefone?.message} placeholder={"Digite o telefone"} styleInput={{ width: "14em" }}> Telefone*</ModalInput>
                                <p className={styles.errorText}>{errors.telefone?.message}</p>
                            </div>
                        </div>

                        <ModalInput {...register("endereco")} error={errors.endereco?.message} placeholder={"Digite o endereço"} style={{ paddingTop: "15px" }} >Endereço</ModalInput>
                        <p className={styles.errorText}>{errors.endereco?.message}</p>
                        <ModalInput {...register("complemento")} error={errors.complemento?.message} placeholder={"Digite o complemento"} style={{ paddingTop: "15px" }} >Complemento</ModalInput>
                        <p className={styles.errorText}>{errors.complemento?.message}</p>
                        <div className={styles.alingSpaces}>
                            <div className={styles.alingErrors}>
                                <ModalInput {...register("cep")} placeholder={"Digite o CEP"} styleInput={{ width: "14em" }}>CEP</ModalInput>
                                <p className={styles.errorText}>{errors.cep?.message}</p>
                            </div>
                            <div className={styles.alingErrors}>
                                <ModalInput {...register("bairro")} placeholder={"Digite o bairro"} styleInput={{ width: "14em" }}>Bairro</ModalInput>
                                <p className={styles.errorText}>{errors.bairro?.message}</p>
                            </div>
                        </div>

                        <ModalInput {...register("cidade")} placeholder={"Digite o cidade"} style={{ paddingTop: "15px" }}>Cidade</ModalInput>
                        <p className={styles.errorText}>{errors.complemento?.message}</p>
                        <ModalInput {...register("uf")} placeholder={"Digite o UF"} style={{ paddingTop: "15px" }}>UF</ModalInput>
                        <p className={styles.errorText}>{errors.uf?.message}</p>
                        <div style={{
                            display: "flex"
                        }}>
                            <Button
                                onClick={() => setIsOpen(false)}
                                type={"reset"}
                                style={{
                                    color: "#0E8750",
                                    background: "#F8F8F9",
                                    border: "1px solid #DEDEE9",
                                    marginTop: "4%",
                                    width: "42%"
                                }}>Cancelar</Button>
                            <Button
                                type={"submit"}
                                style={{
                                    marginTop: "4%",
                                    width: "42%",
                                    marginLeft: "16%",
                                }}>Aplicar</Button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}