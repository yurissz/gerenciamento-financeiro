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

const schema = yup.object({
    email: yup.string().required('O email é obrigatório'),
    password: yup.string().required('A senha é obrigatória').min(8, 'A senha no mínimo deve possuir 8 caracteres')
});

export default function SingIn() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });


    const handleFormSignIn = async (inputValue: IsignIn) => {
        try {
            const { data } = await api.post('/login', {
                email: inputValue.email,
                senha: inputValue.password,
            });

            if (data) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                console.log(data);
                navigate('/home');
            }

        } catch (error) {
            alert('Ocorreu um erro');
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
                    <Button
                        type={"submit"}
                        style={{
                            marginTop: "15%",
                            marginLeft: "27%"
                        }}>Entrar</Button>

                    <p className={styles.styleFacaSeuLogin}>Ainda não possui conta? <a onClick={() => navigate("/register")} className={styles.styleTextLogin}>Cadastre-se</a></p>
                </form>
            </div>
        </section>
    )
}