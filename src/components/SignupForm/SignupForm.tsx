import styles from "@/components/SignupForm/SignupForm.module.css";

const SignupForm = (): React.ReactElement => {
    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

    };

    return (
        <div className={styles.signupContainer}>
            <div className={styles.text}>Cadastre-se</div>
            <form onSubmit={handleSignup}>
                <div className={styles.fields}>
                    <div className={styles.signupField}>
                        <input type="text" placeholder="Digite o nome" required />
                    </div>
                    <div className={styles.signupField}>
                        <input type="email" placeholder="Digite o e-mail" required />
                    </div>
                    <div className={styles.signupField}>
                        <input type="password" placeholder="Senha" required />
                    </div>
                </div>
                <div className={styles.buttonArea}>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
