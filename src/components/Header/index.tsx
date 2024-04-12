import Link from 'next/link';
import styles from './styles.module.scss'
import { FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';




const Header = () => {

    const { signOut } = useContext(AuthContext)

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard" legacyBehavior>
                    <img src='/logo.svg' width={190} height={60} />
                </Link>
                <nav className={styles.menuNav}>
                    <Link href="/category" legacyBehavior>
                        <a>Categoria</a>
                    </Link>
                    <Link href="/product" legacyBehavior>
                        <a>Cardapio</a>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#FFF' size={24} />
                    </button>

                </nav>
            </div>
        </header>
    )
}

export default Header;
