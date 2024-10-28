import styles from "@/components/Footer/Footer.module.css";

const Footer = (): React.ReactElement => {
    return(
        <footer className={styles.contentFooter}>
            <span>Processo seletivo – SWA – Desenvolvimento Web Fullstack</span>
        </footer>
    );
}

export default Footer;