import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import heartOutline from '/svg/heartOutline.svg';
import heartFilled from '/svg/heartFilled.svg';
import shoppingCart from '/svg/shoppingCart.svg';
import userCircle from '/svg/userCircle.svg';
import search from '/svg/search.svg';
export default function Header() {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.leftContainer}>
        <img src='/icon.png' alt='ícone' />
        <span>Christmas Shop</span>
      </Link>
      <div className={styles.rightContainer}>
        <div className={styles.searchBox}>
          <input
            type='search'
            name='search'
            id='search'
            className={styles.search}
            placeholder='Pesquise aqui'
          />
          <input
            type='checkbox'
            name='searchToggle'
            id='searchToggle'
            className={styles.searchToggle}
          />
          <label htmlFor='searchToggle'>
            <img src={search} alt='Pesquisa' />
          </label>
        </div>
        <Link to='/account'>
          <img src={userCircle} alt='Conta' />
        </Link>
        <Link to='/wishlist' className={styles.wishlist}>
          <img src={heartOutline} alt='Lista de Desejos' />
          <img src={heartFilled} alt='Lista de Desejos' />
        </Link>
        <Link to='/shoppingcart'>
          <img src={shoppingCart} alt='Carrinho' />
        </Link>
      </div>
    </header>
  );
}
