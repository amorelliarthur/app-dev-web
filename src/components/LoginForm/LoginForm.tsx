import styles from "@/components/LoginForm/LoginForm.module.css";

const LoginForm = (): React.ReactElement => {
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.text}>Login</div>
            <form onSubmit={handleLogin}>
                <div className={styles.loginField}>
                    <div className={`${styles.fields} ${styles.email}`}>
                        <input type="email" placeholder="Digite o e-mail" required />
                    </div>
                    <div className={`${styles.fields} ${styles.password}`}>
                        <input type="password" placeholder="Senha" required />
                    </div>
                </div>
                <div className={styles.buttonArea}>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
