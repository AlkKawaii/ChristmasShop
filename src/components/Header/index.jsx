import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header>
      <Link to='/'>
        <img src='/icon.png' alt='ícone' /> <span>Christmas Shop</span>
      </Link>
    </header>
  );
}
