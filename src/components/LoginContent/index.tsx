import styles from "@/components/LoginContent/LoginContent.module.css";

const LoginContent = (): React.ReactElement => {
    return(
        <section className={`${styles.login} ${styles.content}`}>
            <div className={styles.maxWidth}>
                <h2 className={styles.title}>Cadastro / Login</h2>
                <div className={styles.loginContent}>
                    <div className={styles.column}>
                        <div className={styles.text}>
                            Cadastre - se
                        </div>
                        <form>
                            <div className={styles.fields}>
                                <div className={`${styles.field} ${styles.name}`}>
                                    <input type="text" placeholder="Digite o nome" required />
                                </div>
                                <div className={`${styles.field} ${styles.email}` }>
                                    <input type="email" placeholder="Digite o e-mail" required />
                                </div>
                                <div className={`${styles.field} ${styles.password}` }>
                                    <input type="password" placeholder="Senha" required />
                                </div>
                            </div>
                            <div className={styles.buttonArea}>
                                <button type="submit">Cadastrar</button>
                            </div>
                        </form>
                    </div>

                    {/* Linha divisória */}
                    <div className={styles.divider}></div>

                    <div className={styles.column}>                       
                        <div className={styles.text}>
                            Login
                        </div>
                        <form>
                            <div className={styles.fields}>
                                <div className={`${styles.field} ${styles.email}` }>
                                    <input type="email" placeholder="Digite o e-mail" required />
                                </div>
                                <div className={`${styles.field} ${styles.password}` }>
                                    <input type="password" placeholder="Senha" required />
                                </div>
                            </div>
                            <div className={styles.buttonArea}>
                                <button type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginContent;