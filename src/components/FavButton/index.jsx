import styles from './FavButton.module.css';
import heartOutline from '/svg/heartOutline.svg';
import heartFilled from '/svg/heartFilled.svg';

export default function FavButton({ id }) {
  const accounts = JSON.parse(localStorage.getItem('accounts'));
  const loggedAccount = JSON.parse(
    sessionStorage.getItem('loggedAccount') ||
      localStorage.getItem('loggedAccount')
  );
  const accountIndex = accounts.findIndex(
    (e) => e.email === loggedAccount.email
  );
  return (
    <label htmlFor='fav' className={styles.fav}>
      <input type='checkbox' name='fav' id='fav' />
      <img src={heartOutline} alt='Lista de Desejos' />
      <img src={heartFilled} alt='Lista de Desejos' />
    </label>
  );
}
