import styles from "@/components/HomeTop/HomeTop.module.css";
import Chart from "../Chart";
import CurrencyInfo from "@/components/CurrencyInfo"

const HomeTop = (): React.ReactElement => {
    return(
        <section className={ `${styles.content} ${styles.top}`} style={{
            backgroundImage:`linear-gradient(to right, var(--main-color) 25%, rgba(255, 255, 255, 0)), url("/images/banner_top_v5.jpg")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
            }}>
            <div className={styles.maxWidth}>
                <div className={styles.sideBySideContainer}>
                 <Chart /> {/* Componente do gráfico */}
                 <CurrencyInfo /> {/* Componente de informações da moeda */}
                </div>
            </div>
        </section>
    );
}

export default HomeTop;