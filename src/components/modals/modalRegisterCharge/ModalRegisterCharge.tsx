import styles from './styles.module.css';
import modalChargeIcon from '../../../assets/cobrancas/past.png';
import close from '../../../assets/clients/close.png';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { Button } from '../../buttons/buttonComponent/Button';
import api from '../../../services/api';
import { IAddCharge } from '../../../interfaces/charges';
import { useEffect, useState } from 'react';

const schema = yup.object({
    descricao: yup.string().required('Este campo deve ser preenchido'),
    data_venc: yup.string().required("Este campo deve ser preenchido"),
    valor: yup.string().required("Este campo deve ser preenchido"),
    status: yup.string().required("Este campo deve ser preenchido"),
});

interface ModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    clientId: number; // Tornar obrigatório
}

export const ModalRegisterCharge: React.FC<ModalProps> = ({ setIsOpen, clientId }) => {
    const [clientName, setClientName] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAddCharge>({
        resolver: yupResolver(schema),
    });

    const searchClientName = async () => {
        try {
            const response = await api.get("/consultClient");
            const clienteSelecionado = response.data.find((cliente: any) => cliente.id === clientId); // Use 'find' para obter um único cliente

            if (clienteSelecionado) {
                setClientName(clienteSelecionado.nome);
            }
        } catch (error) {
        }
    };

    const handleForm = async (inputValue: IAddCharge) => {
        try {
            const { data } = await api.post("/addCharge", {
                cliente_id: clientId,
                descricao: inputValue.descricao,
                data_venc: inputValue.data_venc,
                valor: inputValue.valor,
                status: inputValue.status
            });

            if (data) {
            }
            setIsOpen(false);
        } catch (error) {
            alert('Ocorreu um erro');
        }
    };

    useEffect(() => {
        searchClientName();
    }, [clientId]);

    return (
        <div className={styles.styleBackground}>
            <section className={styles.styleModal}>
                <header className={styles.styleHeader}>
                    <div>
                        <img src={modalChargeIcon} alt="modalClientIcon" />
                        <h1>Cadastro de Cobrança</h1>
                    </div>
                    <img src={close} alt="closeIcon" onClick={() => setIsOpen(false)} />
                </header>
                <div>
                    <form onSubmit={handleSubmit(handleForm)}>
                        <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                            <label className={styles.styleLabelNome}>Nome*</label>
                            <input
                                value={clientName}
                                className={styles.styleInputNome}
                                placeholder="Digite o nome"
                                readOnly // O nome do cliente é somente leitura
                            />
                        </div>
                        <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                            <label className={styles.styleLabelNome}>Descrição*</label>
                            <textarea
                                {...register("descricao")}
                                className={`${errors.descricao ? styles.erroStyleInput : styles.styleInputNome}`}
                                placeholder="Digite a descrição"
                            />
                            <p className={styles.errorText}>{errors.descricao?.message}</p>
                        </div>
                        <div className={styles.alingSpaces}>
                            <div className={styles.alingErrors}>
                                <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                                    <label className={styles.styleLabelNome}>Vencimento*</label>
                                    <input
                                        type="date"
                                        {...register("data_venc")}
                                        className={`${errors.data_venc ? styles.erroStyleInput : styles.styleInputNome}`}
                                        placeholder="Data de Vencimento"
                                        style={{ width: "12em" }}
                                    />
                                    <p className={styles.errorText}>{errors.data_venc?.message}</p>
                                </div>
                            </div>
                            <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                                <label className={styles.styleLabelNome}>Valor*</label>
                                <input
                                    type="text"
                                    {...register("valor")}
                                    className={`${errors.valor ? styles.erroStyleInput : styles.styleInputNome}`}
                                    placeholder="Digite o valor"
                                    style={{ width: "12em" }}
                                />
                                <p className={styles.errorText}>{errors.valor?.message}</p>
                            </div>
                        </div>
                        <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                            <label className={styles.styleLabelNome}>Status*</label>
                            <label className={styles.styleLabelSelect}>
                                <input
                                    className={styles.styleInputSelect}
                                    type="radio"
                                    value="Paga"
                                    {...register("status")}
                                />
                                Cobrança Paga
                            </label>
                            <label className={styles.styleLabelSelect}>
                                <input
                                    className={styles.styleInputSelect}
                                    type="radio"
                                    value="Pendente"
                                    {...register("status")}
                                />
                                Cobrança Pendente
                            </label>
                            <p className={styles.errorText}>{errors.status?.message}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <Button
                                type="reset" // Mudar para type="button"
                                onClick={() => setIsOpen(false)}
                                style={{
                                    color: "#0E8750",
                                    background: "#F8F8F9",
                                    border: "1px solid #DEDEE9",
                                    marginTop: "4%",
                                    width: "42%"
                                }}>
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                style={{
                                    marginTop: "4%",
                                    width: "42%",
                                    marginLeft: "16%",
                                }}>
                                Aplicar
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
