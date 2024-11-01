import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import styles from '@/components/Menu/Menu.module.css';

const Menu = (): React.ReactElement => {
    const [isActive, setIsActive] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

    const activeMenu = (): void => {
        setIsActive(!isActive);
    };

    const handleLogout = (): void => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        setUserName(null);
        // setFavoritedCoins([]); // Limpa a lista de favoritos no frontend
    };
   

    useEffect(() => {
        const name = localStorage.getItem("userName");
        if (name) setUserName(name);
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles.maxWidth}>
                <div className={styles.logo}>
                    <Link href="/">Cota Real</Link>
                </div>
                <ul className={`${styles.menu} ${isActive ? styles.active : ""}`} id={styles.menuSite}>
                    <li className={styles.maxWidth}>{userName}</li>
                    <li><Link href="/">Home</Link></li>
                    
                    {userName ? (
                        <li>
                            <Link onClick={handleLogout} href="#">Sair</Link>
                        </li>
                    ) : (
                        <li><Link href="/login">Login</Link></li>
                    )}
                </ul>
                <div className={styles.menuBtn} id={styles.menuBtn}>
                    <i onClick={activeMenu}><FaBars /></i>
                </div>
            </div>
        </nav>
    );
};

export default Menu;
