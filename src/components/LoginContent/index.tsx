import styles from "@/components/LoginContent/LoginContent.module.css";
import SignupForm from "../SignupForm/SignupForm";
import LoginForm from "../LoginForm/LoginForm";



const LoginContent = (): React.ReactElement => {
    return (
        <section className={`${styles.login} ${styles.content}`}>
    <div className={styles.maxWidth}>
        <h2 className={styles.title}>Cadastro / Login</h2>
        <div className={styles.loginContainer}> {/* Novo contêiner para as colunas */}
            <div className={styles.loginLeft}>
                <SignupForm />
            </div>
            <div className={styles.loginRight}>
                <LoginForm />
            </div>
        </div>
    </div>
</section>

    );
};

export default LoginContent;
