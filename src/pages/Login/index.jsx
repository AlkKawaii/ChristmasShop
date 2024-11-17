import { useRef } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const formInfoRef = useRef({ email: '', password: '', persist: false });
  function handleSubmit(e) {
    const info = formInfoRef.current;
    const errors = Array.from(document.querySelectorAll(`.${styles.error}`));
    const accounts = JSON.parse(localStorage.getItem('accounts'));
    e.preventDefault();
    errors.forEach((e) => (e.textContent = ''));

    if (accounts) {
      const account = accounts.find((account) => account.email === info.email);
      if (account) {
        if (account.password === info.password) {
          if (info.persist) {
            localStorage.setItem('loggedAccount', JSON.stringify(account));
          } else
            sessionStorage.setItem('loggedAccount', JSON.stringify(account));
          navigate('/account');
        } else {
          errors[1].textContent = 'A senha está incorreta';
        }
      } else {
        errors[0].textContent = 'A conta não foi encontrada';
      }
    } else {
      errors[0].textContent = 'A conta não foi encontrada';
      return;
    }
  }

  return (
    <article className={styles.loginContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.loginTextInput}>
          <input
            type='email'
            name='email'
            className={styles.loginInput}
            id='email'
            placeholder=' '
            autoFocus
            required
            onChange={(e) => (formInfoRef.current.email = e.target.value)}
          />
          <label htmlFor='email'>Email</label>
          <span className={styles.error}></span>
        </div>
        <div className={styles.loginTextInput}>
          <input
            type='password'
            name='password'
            className={styles.loginInput}
            id='password'
            placeholder=' '
            minLength={8}
            required
            onChange={(e) => (formInfoRef.current.password = e.target.value)}
          />
          <label htmlFor='password'>Senha</label>
          <span className={styles.error}></span>
        </div>
        <label htmlFor='remember' className={styles.checkboxInput}>
          <input
            type='checkbox'
            name='remember'
            id='remember'
            onChange={(e) => (formInfoRef.current.persist = e.target.checked)}
          />
          Lembre-se de mim
        </label>
        <button type='submit' className={styles.submit}>
          Log In
        </button>
        <span>
          Ainda não tem uma conta?{' '}
          <span
            className={styles.pseudoLink}
            onClick={() => navigate('/signup')}>
            Registre-se
          </span>
        </span>
      </form>
    </article>
  );
}
