import styles from '@/components/Menu/Menu.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const Menu = (): React.ReactElement => {

    const [isActive, setIsActive] = useState(false);

    const activeMenu = (): void => {
        setIsActive(!isActive);
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.maxWidth}>
                <div className={styles.logo}>
                    <Link href="/">App</Link>
                </div>
                <ul className={`${styles.menu} ${ isActive ? styles.active : ""}`} id={styles.menuSite}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/login">Login</Link></li>
                </ul>
                <div className={styles.menuBtn} id={styles.menuBtn}>
                    <i onClick={activeMenu} ><FaBars /></i>
                </div>
            </div>
        </nav>
    )
}

export default Menu;