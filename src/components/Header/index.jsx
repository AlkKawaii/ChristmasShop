import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import heartOutline from '/svg/heartOutline.svg';
import heartFilled from '/svg/heartFilled.svg';
import shoppingCart from '/svg/shoppingCart.svg';
import userCircle from '/svg/userCircle.svg';
import { useEffect, useRef, useState } from 'react';
import SearchBox from '../SearchBox';

export default function Header() {
  const oldScrollRef = useRef(window.scrollY);
  const headerRef = useRef(null);
  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.classList.add(styles.show);
    }

    const handleScroll = () => {
      let currentScroll = window.scrollY;
      if (currentScroll > oldScrollRef.current) {
        headerRef.current.classList.remove(styles.show);
      } else {
        headerRef.current.classList.add(styles.show);
      }
      oldScrollRef.current = window.scrollY;
    };
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header className={styles.header} ref={headerRef}>
      <Link to='/' className={styles.leftContainer}>
        <img src='/icon.png' alt='ícone' />
        <span>Christmas Shop</span>
      </Link>
      <div className={styles.rightContainer}>
        <SearchBox />
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
