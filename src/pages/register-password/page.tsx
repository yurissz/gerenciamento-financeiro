import styles from './styles.module.css'
import * as yup from "yup";
import Input from '../../components/inputs/inputComponent/Input'
import { Button } from '../../components/buttons/buttonComponent/Button'
import progresscollum2 from '../../assets/auth/progresscollum2.png'
import progressbar2 from '../../assets/auth/progressbar2.png'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const userSchema = yup.object().shape({
    senha: yup.string().required("Este campo é obrigatório"),
    confirmSenha: yup.string().required("Este campo é obrigatório").oneOf([yup.ref('password')], 'As senhas devem coincidir')
})

export default function SingUpPassword() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(userSchema),
    })

    const onSubmit = async (data: any) => {
        console.log(data);
        reset()
    }

    return (

        <section className={styles.screenBackground}>
            <div className={styles.screenLateral}>
                <aside className={styles.alingConteiners}>
                    <img src={progresscollum2} alt={'first picture'} className={styles.alingPicture}></img>
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        {...register("senha")}
                        placeholder={'Digite seu nome'}
                        type={'password'}
                        style={{
                            paddingTop: "30px"
                        }}>Senha*</Input>
                    <p>{errors.senha?.message}</p>
                    <Input
                        {...register("confirmSenha")}
                        placeholder={'Digite seu email'}
                        type={'password'}
                        style={{
                            paddingTop: "30px"
                        }}>Repita a senha*</Input>
                    <p>{errors.confirmSenha?.message}</p>
                    <Button type={'submit'} style={{
                        marginTop: "15%",
                        marginLeft: "27%"
                    }}>Entrar</Button>
                    <p className={styles.styleFacaSeuLogin}>Já possui uma conta? Faça seu Login</p>
                </form>
                <img src={progressbar2} alt='image2' className={styles.styleProgressBar}></img>
            </div>
        </section>
    )
}