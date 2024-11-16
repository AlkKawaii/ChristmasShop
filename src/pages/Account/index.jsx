import { useState } from 'react';
import LogIn from '../../components/LogIn';
import SignUp from '../../components/SignUp';
import styles from './Account.module.css';
import edit from '/svg/edit.svg';

export default function Account() {
  const [loginScreen, setLoginScreen] = useState(false);
  const account = JSON.parse(
    sessionStorage.getItem('loggedAccount') ||
      localStorage.getItem('loggedAccount')
  );
  if (account) {
    return (
      <div className={styles.container}>
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
          <div className={styles.textInput}>
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
          <div className={styles.textInput}>
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
      </div>
    );
  } else
    return (
      <div>
        {loginScreen ? (
          <LogIn changeScreen={() => setLoginScreen(false)} />
        ) : (
          <SignUp changeScreen={() => setLoginScreen(true)} />
        )}
      </div>
    );
}
