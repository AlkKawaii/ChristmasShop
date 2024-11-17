import styles from './Account.module.css';
import edit from '/svg/edit.svg';
import { Navigate } from 'react-router-dom';

export default function Account() {
  const account = JSON.parse(
    sessionStorage.getItem('loggedAccount') ||
      localStorage.getItem('loggedAccount')
  );
  if (account) {
    return (
      <div className={styles.accountContainer}>
        <h1>Sua conta</h1>
        <div className={styles.pair}>
          <h2>Nome de usuário: </h2>
          <h3>{account.name}</h3>
          <button type='button'>
            <img src={edit} alt='' />
          </button>
        </div>
        <div className={styles.pair}>
          <h2>Nome de usuário: </h2>
          <h3>{account.name}</h3>
          <button type='button'>
            <img src={edit} alt='' />
          </button>
        </div>
        <form>
          <h2>Alterar senha</h2>
          <div className={styles.accountTextInput}>
            <input
              type='password'
              name='password'
              id='password'
              placeholder=' '
              minLength={8}
              required
            />
            <label htmlFor='password'>Senha</label>
            <span className={styles.error}></span>
          </div>
          <div className={styles.accountTextInput}>
            <input
              type='password'
              name='repeatPassword'
              id='repeatPassword'
              placeholder=' '
              minLength={8}
              required
            />
            <label htmlFor='repeatPassword'>Repita a senha</label>
            <span className={styles.error}></span>
          </div>
          <button type='submit' className={styles.submit}>
            Trocar senha
          </button>
        </form>
        <article className={styles.paymentMethods}></article>
        <button
          type='button'
          className={styles.logout}
          onClick={() => {
            localStorage.removeItem('loggedAccount');
            sessionStorage.removeItem('loggedAccount');
            location.reload();
          }}>
          Logout
        </button>
      </div>
    );
  } else return <Navigate to='/signup' />;
}
