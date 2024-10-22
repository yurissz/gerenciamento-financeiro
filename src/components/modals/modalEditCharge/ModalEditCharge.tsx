import styles from './styles.module.css'
import modalChargeIcon from '../../../assets/cobrancas/past.png'
import close from '../../../assets/clients/close.png'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { Button } from '../../buttons/buttonComponent/Button';
import api from '../../../services/api';
import { IAddCharge } from '../../../interfaces/charges';
import { useEffect, useState } from 'react';

// falta fazer
const schema = yup.object({
    descricao: yup.string().required('Este campo deve ser preenchido'),
    data_venc: yup.string().required('Este campo deve ser preenchido'),
    valor: yup.string().required('Este campo deve ser preenchido'),
});

interface ModalProps {
    isOpen?: boolean,
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
    id_cob?: string,
}

export const ModalEditCharge = ({ isOpen, setIsOpen, id_cob }: ModalProps) => {

    const [clientName, setClientName] = useState("")
    const [chargeStatus, setChargeStatus] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });


    const searchClientName = async (id_cob: string) => {
        try {
            const { data } = await api.get(`/chargeDetails/${id_cob}`)
            setClientName(data.cliente_nome)
            setChargeStatus(data.status)
            console.log(data);

        } catch (error) {
            console.log(error.message);

        }
    }



    const handleForm = async (inputValue: IAddCharge) => {

        try {

            const clientes = await api.get(`/consultClient`)
            const clienteSelecionado = clientes.data.filter((cliente) => cliente.nome === clientName)

            const cliente_id = clienteSelecionado[0].id

            console.log(cliente_id);


            const { data } = await api.put("/updateCharge", {
                cliente_id: cliente_id,
                id_cob: id_cob,
                descricao: inputValue.descricao,
                data_venc: inputValue.data_venc,
                valor: inputValue.valor,
                status: chargeStatus
            });
            console.log(data);
            setIsOpen(false)
        } catch (error) {
            console.log(error);

            alert('Ocorreu um erro');
        }
    };




    useEffect(() => {
        searchClientName(id_cob)
    }, [])




    return (
        <div className={styles.styleBackground}>
            <section className={styles.styleModal}>
                <header className={styles.styleHeader}>
                    <div>
                        <img src={modalChargeIcon} alt="modalClientIcon" />
                        <h1>Edição de Cobrança</h1>
                    </div>
                    <img src={close} alt="closeIcon" onClick={() => setIsOpen(false)} />
                </header>
                <div>
                    <form onSubmit={handleSubmit(handleForm)}>
                        <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                            <label htmlFor="" className={styles.styleLabelNome}>Nome*</label>
                            <input value={clientName} type={"text"} className={styles.styleInputNome} placeholder={"Digite o nome"} />
                        </div>
                        <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                            <label htmlFor="" className={styles.styleLabelNome}>Descrição*</label>
                            <textarea {...register("descricao")} className={styles.styleInputNome} placeholder={"Digite a descrição"} />
                            <p>{errors.descricao?.message}</p>
                        </div>
                        <div className={styles.alingSpaces}>
                            <div className={styles.alingErrors}>
                                <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                                    <label htmlFor="" className={styles.styleLabelNome}>Vencimento*</label>
                                    <input type={"date"} {...register("data_venc")} className={styles.styleInputNome} placeholder={"Data de Vencimento"} style={{ width: "12em" }} />
                                    <p>{errors.data_venc?.message}</p>
                                </div>
                            </div>
                            <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                                <label htmlFor="" className={styles.styleLabelNome}>Valor*</label>
                                <input type={"text"} {...register("valor")} className={styles.styleInputNome} placeholder={"Digite o valor"} style={{ width: "12em" }} />
                                <p>{errors.valor?.message}</p>
                            </div>
                        </div>
                        <div className={styles.styleConteinerInputs} style={{ paddingTop: "15px" }}>
                            <label htmlFor="" className={styles.styleLabelNome}>Status*</label>
                            <label className={styles.styleLabelSelect}>
                                <input className={styles.styleInputSelect} type={"radio"}
                                    value={"Paga"}
                                    checked={chargeStatus === "Paga"}
                                />
                                Cobrança Paga
                            </label>
                            <label className={styles.styleLabelSelect}>
                                <input className={styles.styleInputSelect}
                                    type={"radio"}
                                    value={"Pendente"}
                                    checked={chargeStatus === "Pendente"}
                                />
                                Cobrança Pendente
                            </label>
                        </div>
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
            </section >
        </div >
    )
}