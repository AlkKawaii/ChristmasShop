import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>Christmas Shop &copy;</span>
      <Link to='/about'>Sobre Nós</Link>
    </footer>
  );
}
