import * as yup from "yup";
import { useForm } from "react-hook-form";
import styles from './styles.module.css';
import Input from '../../components/inputs/inputComponent/Input';
import { Button } from '../../components/buttons/buttonComponent/Button';
import progresscollum1 from '../../assets/auth/progresscollum1.png';
import progressbar1 from '../../assets/auth/progressbar1.png';
import progresscollum2 from '../../assets/auth/progresscollum2.png';
import progressbar2 from '../../assets/auth/progressbar2.png';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
import confirmedIcon from '../../assets/home/confirmIcon.png';
import progresscollum3 from '../../assets/auth/progresscollum3.png'

const userSchema1 = yup.object().shape({
    name: yup.string().required("Este campo é obrigatório"),
    email: yup.string().required("Este campo é obrigatório").email("Precisa ser um email válido"),
});

const userSchema2 = yup.object().shape({
    senha: yup.string().required("Este campo é obrigatório"),
    confirmSenha: yup.string().oneOf([yup.ref('senha'), null], 'As senhas devem coincidir').required("Este campo é obrigatório"),
});

export default function SingUp() {
    const navigate = useNavigate();
    const [pages, setPages] = useState("1");

    // Escolha o schema de validação baseado na página atual
    const currentSchema = pages === "1" ? userSchema1 : userSchema2;

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(currentSchema)
    });

    // Submissão da primeira página (Nome e Email)
    const onSubmit1 = (data: any) => {
        console.log(data);
        setPages("2");  // Vai para a segunda página
    };

    // Submissão da segunda página (Senha e Confirmação)
    const onSubmit2 = (data: any) => {
        const register = api.post("/signup", {
            nome: data.name,
            email: data.email,
            senha: data.senha
        })

        reset();  // Reseta o formulário
        setPages("3")

    };

    return (
        <>
            {pages === "1" && (
                <section className={styles.screenBackground}>
                    <div className={styles.screenLateral}>
                        <aside className={styles.alingConteiners}>
                            <img src={progresscollum1} alt={'first picture'} className={styles.alingPicture}></img>
                            <section className={styles.alingTitle}>
                                <div>
                                    <h2 className={styles.styleLateralBigName}>Cadastre-se</h2>
                                    <p className={styles.styleLateralLowName}>Por favor, escreva seu nome e e-mail</p>
                                </div>
                                <div>
                                    <h2 className={styles.styleLateralBigName}>Escolha uma senha</h2>
                                    <p className={styles.styleLateralLowName}>Escolha uma senha segura</p>
                                </div>
                                <div>
                                    <h2 className={styles.styleLateralBigName}>Cadastro realizado com sucesso</h2>
                                    <p className={styles.styleLateralLowName}>E-mail e senha cadastrados com sucesso</p>
                                </div>
                            </section>
                        </aside>
                    </div>
                    <div className={styles.formAling}>
                        <h1 className={styles.pageTitle}>Adicione seus dados</h1>
                        <form onSubmit={handleSubmit(onSubmit1)}>
                            <Input
                                error={errors.name?.message}
                                {...register("name")}
                                placeholder={'Digite seu nome'}
                                type={'text'}
                                style={{ paddingTop: "30px" }}
                            >
                                Nome*
                            </Input>
                            <p className={styles.errorText}>{errors.name?.message}</p>
                            <Input
                                error={errors.email?.message}
                                {...register("email")}
                                placeholder={'Digite seu email'}
                                type={'email'}
                                style={{ paddingTop: "30px" }}
                            >
                                Email*
                            </Input>
                            <p className={styles.errorText}>{errors.email?.message}</p>
                            <Button
                                type={"submit"}
                                style={{ marginTop: "15%", marginLeft: "27%" }}
                            >
                                Continuar
                            </Button>
                            <p className={styles.styleFacaSeuLogin}>
                                Já possui uma conta? Faça seu <a onClick={() => navigate("/")} className={styles.styleTextLogin}>Login</a>
                            </p>
                        </form>
                        <img src={progressbar1} alt='image2' className={styles.styleProgressBar}></img>
                    </div>
                </section>
            )}
            {pages === "2" && (
                <section className={styles.screenBackground}>
                    <div className={styles.screenLateral}>
                        <aside className={styles.alingConteiners}>
                            <img src={progresscollum2} alt={'second picture'} className={styles.alingPicture}></img>
                            <section className={styles.alingTitle}>
                                <div>
                                    <h2 className={styles.styleLateralBigName}>Cadastre-se</h2>
                                    <p className={styles.styleLateralLowName}>Por favor, escreva seu nome e e-mail</p>
                                </div>
                                <div>
                                    <h2 className={styles.styleLateralBigName}>Escolha uma senha</h2>
                                    <p className={styles.styleLateralLowName}>Escolha uma senha segura</p>
                                </div>
                                <div>
                                    <h2 className={styles.styleLateralBigName}>Cadastro realizado com sucesso</h2>
                                    <p className={styles.styleLateralLowName}>E-mail e senha cadastrados com sucesso</p>
                                </div>
                            </section>
                        </aside>
                    </div>
                    <div className={styles.formAling}>
                        <h1 className={styles.pageTitle}>Escolha uma senha</h1>
                        <form onSubmit={handleSubmit(onSubmit2)}>
                            <Input
                                error={errors.senha?.message}
                                {...register("senha")}
                                placeholder={'Digite sua senha'}
                                type={'password'}
                                style={{ paddingTop: "30px" }}
                            >
                                Senha*
                            </Input>
                            <p className={styles.errorText}>{errors.senha?.message}</p>
                            <Input
                                error={errors.confirmSenha?.message}
                                {...register("confirmSenha")}
                                placeholder={'Confirme sua senha'}
                                type={'password'}
                                style={{ paddingTop: "30px" }}
                            >
                                Repita a senha*
                            </Input>
                            <p className={styles.errorText}>{errors.confirmSenha?.message}</p>
                            <Button
                                type={'submit'}
                                style={{ marginTop: "15%", marginLeft: "27%" }}
                            >
                                Entrar
                            </Button>
                            <p className={styles.styleFacaSeuLogin}>Já possui uma conta? Faça seu Login</p>
                        </form>
                        <img src={progressbar2} alt='image2' className={styles.styleProgressBar}></img>
                    </div>
                </section>
            )}
            {pages === "3" &&
                (
                    <section className={styles.screenBackground}>
                        <div className={styles.screenLateral}>
                            <aside className={styles.alingConteiners}>
                                <img src={progresscollum3} alt={'second picture'} className={styles.alingPicture}></img>
                                <section className={styles.alingTitle}>
                                    <div>
                                        <h2 className={styles.styleLateralBigName}>Cadastre-se</h2>
                                        <p className={styles.styleLateralLowName}>Por favor, escreva seu nome e e-mail</p>
                                    </div>
                                    <div>
                                        <h2 className={styles.styleLateralBigName}>Escolha uma senha</h2>
                                        <p className={styles.styleLateralLowName}>Escolha uma senha segura</p>
                                    </div>
                                    <div>
                                        <h2 className={styles.styleLateralBigName}>Cadastro realizado com sucesso</h2>
                                        <p className={styles.styleLateralLowName}>E-mail e senha cadastrados com sucesso</p>
                                    </div>
                                </section>
                            </aside>
                        </div>
                        <div className={styles.formAling}>
                            <div className={styles.modalConfirmed}>
                                <div className={styles.alingItensModal}>
                                    <img src={confirmedIcon} alt="" className={styles.alingImageCheck} />
                                    <h1 className={styles.styleTextCadastroSucess}>Cadastro realizado com sucesso!</h1>
                                </div>
                            </div>
                            <Button onClick={() => navigate("/")} style={{ width: "40%", marginTop: "30px", marginLeft: "30%" }}>Ir para Login</Button>
                        </div>
                        <img src={progressbar2} alt='image2' className={styles.styleProgressBar}></img>
                    </section >

                )
            }
        </>
    );
}
