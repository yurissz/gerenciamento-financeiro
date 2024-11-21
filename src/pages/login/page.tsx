import * as yup from "yup";
import { useForm } from "react-hook-form";
import styles from './styles.module.css'
import pictureLogin from '../../assets/auth/pictureLogin.png'
import Input from '../../components/inputs/inputComponent/Input'
import { Button } from '../../components/buttons/buttonComponent/Button'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { IsignIn } from "../../interfaces/signIn";
import api from "../../services/api"
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";

const schema = yup.object({
    email: yup.string().required('O email é obrigatório'),
    password: yup.string().required('A senha é obrigatória').min(8, 'A senha no mínimo deve possuir 8 caracteres')
});

export default function SingIn() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true)
    const [submited, setSubmited] = useState(true)


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        setLoading(!loading)
    }, [submited])


    const handleFormSignIn = async (inputValue: IsignIn) => {
        try {
            setSubmited(!submited)
            const { data } = await api.post('/login', {
                email: inputValue.email,
                senha: inputValue.password,
            });

            if (data) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                setLoading(loading)
                navigate('/home');
            }

        } catch (error: any) {
            setLoading(loading)
            if (error.response?.status === 401) {
                setErrorMessage('Senha ou e-mail incorretos.');
            } else {
                setErrorMessage('Ocorreu um erro. Tente novamente mais tarde.');
            }
        }
    };

    return (
        <section className={styles.screenBackground}>
            <img src={pictureLogin} alt={'pictureLogin'} className={styles.alingPicture}></img>

            <div className={styles.formAling}>
                <h1 className={styles.pageTitle}>Faça seu login!</h1>
                <form onSubmit={handleSubmit(handleFormSignIn)}>
                    <Input
                        error={errors.email?.message}
                        {...register("email")}
                        id={"email"}
                        placeholder={'Digite seu email'}
                        type={'text'}
                        style={{ paddingTop: "30px" }}
                    >
                        E-mail*
                    </Input>
                    <p className={styles.errorText}>{errors.email?.message}</p>
                    <Input
                        error={errors.password?.message}
                        {...register("password")}
                        id={"password"}
                        placeholder={'Digite sua senha'}
                        type={'password'}
                        style={{ paddingTop: "30px" }}
                    >
                        Senha*
                    </Input>
                    <p className={styles.errorText}>{errors.password?.message}</p>
                    {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
                    {
                        loading ? <Loader /> :
                            <Button
                                type={"submit"}
                                style={{
                                    marginTop: "15%",
                                    marginLeft: "27%"
                                }}>Entrar</Button>
                    }
                    <p className={styles.styleFacaSeuLogin}>Ainda não possui conta? <a onClick={() => navigate("/register")} className={styles.styleTextLogin}>Cadastre-se</a></p>
                </form>
            </div>
        </section>
    )
}