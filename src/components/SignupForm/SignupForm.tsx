import { useState } from "react";
import axios from "axios";
import styles from "@/components/SignupForm/SignupForm.module.css";

const SignupForm = (): React.ReactElement => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
        };

        try {
            const response = await axios.post("http://localhost:3000/auth/signup", userData);
            console.log(response);
            if (response.status === 201) {
                setMessage("Cadastro realizado com sucesso!");
            } else {
                setMessage("Erro ao cadastrar. Tente novamente.");
            }
        } catch (error) {
            setMessage("Erro ao realizar o cadastro. Verifique seus dados e tente novamente.");
            console.error("Erro:", error);
        }
    };

    return (
        <div className={styles.signupContainer}>
            <div className={styles.text}>Cadastre-se</div>
            <form onSubmit={handleSignup}>
                <div className={styles.fields}>
                    <div className={styles.signupField}>
                        <input
                            type="text"
                            placeholder="Digite o nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.signupField}>
                        <input
                            type="email"
                            placeholder="Digite o e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.signupField}>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className={styles.buttonArea}>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
};

export default SignupForm;
