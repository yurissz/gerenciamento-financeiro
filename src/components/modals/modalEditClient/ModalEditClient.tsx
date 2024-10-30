import styles from './styles.module.css';
import modalClientIcon from '../../../assets/clients/modalClientsIcon.png';
import close from '../../../assets/clients/close.png';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { Button } from '../../buttons/buttonComponent/Button';
import api from '../../../services/api';
import { IClientsForm } from '../../../interfaces/clients';
import ModalInput from '../../inputs/inputForModalsComponent/ModalInput';

// Definindo o esquema de validação com Yup
const schema = yup.object({
    nome: yup.string().required('O nome é obrigatório'),
    email: yup.string().required('O email é obrigatório').email("O campo deve ser um email"),
    cpf: yup.string().required("O CPF é obrigatório"),
    telefone: yup.string().required("O telefone é obrigatório"),
    endereco: yup.string(),
    complemento: yup.string(),
    cep: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    uf: yup.string()
});

interface ModalProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    clientId: number
}

export const ModalEditClient = ({ setIsOpen, clientId }: ModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IClientsForm>({
        resolver: yupResolver(schema),
    });

    // Função para lidar com o envio do formulário
    const handleForm = async (inputValue: IClientsForm) => {
        try {
            await api.put(`/updateClient/${clientId}`, inputValue);
            setIsOpen(false); // Fecha o modal após a atualização
        } catch (error) {
            alert('Ocorreu um erro ao atualizar o cliente');
        }
    };

    return (
        <div className={styles.styleBackground}>
            <section className={styles.styleModal}>
                <header className={styles.styleHeader}>
                    <div>
                        <img src={modalClientIcon} alt="Modal Client Icon" />
                        <h1>Editar Cliente</h1>
                    </div>
                    <img src={close} alt="Fechar" onClick={() => setIsOpen(false)} />
                </header>
                <div>
                    <form onSubmit={handleSubmit(handleForm)}>
                        <ModalInput
                            error={errors.nome?.message}
                            {...register("nome")}
                            placeholder={"Digite o nome"}
                            style={{ paddingTop: "15px" }}
                        >
                            Nome*
                        </ModalInput>
                        <p className={styles.errorText}>{errors.nome?.message}</p>

                        <ModalInput
                            error={errors.email?.message}
                            {...register("email")}
                            placeholder={"Digite o email"}
                            style={{ paddingTop: "20px" }}
                        >
                            Email*
                        </ModalInput>
                        <p className={styles.errorText}>{errors.email?.message}</p>

                        <div className={styles.alingSpaces}>
                            <div className={styles.alingErrors}>
                                <ModalInput
                                    error={errors.cpf?.message}
                                    {...register("cpf")}
                                    placeholder={"Digite o CPF"}
                                    styleInput={{ width: "14em" }}
                                >
                                    CPF*
                                </ModalInput>
                                <p className={styles.errorText}>{errors.cpf?.message}</p>
                            </div>
                            <div className={styles.alingErrors}>
                                <ModalInput
                                    error={errors.telefone?.message}
                                    {...register("telefone")}
                                    placeholder={"Digite o telefone"}
                                    styleInput={{ width: "14em" }}
                                >
                                    Telefone*
                                </ModalInput>
                                <p className={styles.errorText}>{errors.telefone?.message}</p>
                            </div>
                        </div>

                        <ModalInput
                            error={errors.endereco?.message}
                            {...register("endereco")}
                            placeholder={"Digite o endereço"}
                            style={{ paddingTop: "15px" }}
                        >
                            Endereço
                        </ModalInput>
                        <p className={styles.errorText}>{errors.endereco?.message}</p>

                        <ModalInput
                            error={errors.complemento?.message}
                            {...register("complemento")}
                            placeholder={"Digite o complemento"}
                            style={{ paddingTop: "15px" }}
                        >
                            Complemento
                        </ModalInput>
                        <p className={styles.errorText}>{errors.complemento?.message}</p>

                        <div className={styles.alingSpaces}>
                            <div className={styles.alingErrors}>
                                <ModalInput
                                    {...register("cep")}
                                    placeholder={"Digite o CEP"}
                                    styleInput={{ width: "14em" }}
                                >
                                    CEP
                                </ModalInput>
                                <p className={styles.errorText}>{errors.cep?.message}</p>
                            </div>
                            <div className={styles.alingErrors}>
                                <ModalInput
                                    {...register("bairro")}
                                    placeholder={"Digite o bairro"}
                                    styleInput={{ width: "14em" }}
                                >
                                    Bairro
                                </ModalInput>
                                <p className={styles.errorText}>{errors.bairro?.message}</p>
                            </div>
                        </div>

                        <ModalInput
                            {...register("cidade")}
                            placeholder={"Digite a cidade"}
                            style={{ paddingTop: "15px" }}
                        >
                            Cidade
                        </ModalInput>
                        <p className={styles.errorText}>{errors.cidade?.message}</p>

                        <ModalInput
                            {...register("uf")}
                            placeholder={"Digite o UF"}
                            style={{ paddingTop: "15px" }}
                        >
                            UF
                        </ModalInput>
                        <p className={styles.errorText}>{errors.uf?.message}</p>

                        <div style={{ display: "flex" }}>
                            <Button
                                onClick={() => setIsOpen(false)}
                                type={"reset"}
                                style={{
                                    color: "#0E8750",
                                    background: "#F8F8F9",
                                    border: "1px solid #DEDEE9",
                                    marginTop: "4%",
                                    width: "42%"
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type={"submit"}
                                style={{
                                    marginTop: "4%",
                                    width: "42%",
                                    marginLeft: "16%",
                                }}
                            >
                                Aplicar
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};
