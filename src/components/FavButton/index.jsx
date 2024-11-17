import styles from './FavButton.module.css';
import heartOutline from '/svg/heartOutline.svg';
import heartFilled from '/svg/heartFilled.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export default function FavButton({ id }) {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const accounts = JSON.parse(localStorage.getItem('accounts'));
  const loggedAccount = JSON.parse(
    sessionStorage.getItem('loggedAccount') ||
      localStorage.getItem('loggedAccount')
  );
  let accountIndex = null;
  if (loggedAccount) {
    accountIndex = accounts.findIndex((e) => e.email === loggedAccount.email);
  }

  useEffect(() => {
    if (loggedAccount) {
      if (loggedAccount.wishlist) {
        setIsChecked(loggedAccount.wishlist.includes(id));
      }
    }
  }, [loggedAccount, id]);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!loggedAccount) {
      navigate('/signup');
      return;
    }

    const updatedWishlist = isChecked
      ? accounts[accountIndex].wishlist.filter((item) => item !== id)
      : [...(accounts[accountIndex].wishlist || []), id];

    accounts[accountIndex].wishlist = updatedWishlist;
    setIsChecked(!isChecked);

    localStorage.setItem('accounts', JSON.stringify(accounts));

    if (sessionStorage.getItem('loggedAccount')) {
      sessionStorage.setItem(
        'loggedAccount',
        JSON.stringify(accounts[accountIndex])
      );
    } else {
      localStorage.setItem(
        'loggedAccount',
        JSON.stringify(accounts[accountIndex])
      );
    }
  }

  return (
    <label htmlFor='fav' className={styles.fav} onClick={handleClick}>
      <input type='checkbox' name='fav' id='fav' checked={isChecked} readOnly />
      <img src={heartOutline} alt='Lista de Desejos' />
      <img src={heartFilled} alt='Lista de Desejos' />
    </label>
  );
}
