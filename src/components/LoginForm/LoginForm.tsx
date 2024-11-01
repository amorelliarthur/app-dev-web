import { useState, useEffect } from "react";
import axios from "axios";
import styles from "@/components/LoginForm/LoginForm.module.css";
import { useRouter } from "next/router";

const LoginForm = (): React.ReactElement => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    // Verifica se o usuário já está logado
    useEffect(() => {
        const userName = localStorage.getItem("userName");
        if (userName) {
            router.push("/");
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        try {
            const response = await axios.post("http://localhost:3000/auth/login", userData);
            console.log(response);
            if (response.status === 201) {
                //setMessage("Login realizado com sucesso!");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("userName", response.data.name);
                router.push("/"); 
            } else {
                setMessage("Erro. Tente novamente.");
            }
        } catch (error) {
            setMessage("Erro! Verifique seus dados e tente novamente.");
            console.error("Erro:", error);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.text}>Login</div>
            <form onSubmit={handleLogin}>
                <div className={styles.loginField}>
                    <div className={`${styles.fields} ${styles.email}`}>
                        <input 
                            type="email" 
                            placeholder="Digite o e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>
                    <div className={`${styles.fields} ${styles.password}`}>
                        <input 
                            type="password" 
                            placeholder="Senha" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>
                </div>
                <div className={styles.buttonArea}>
                    <button type="submit">Login</button>
                </div>
            </form>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
};

export default LoginForm;
