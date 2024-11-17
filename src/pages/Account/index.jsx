import { useRef } from 'react';
import InfoEditor from '../../components/InfoEditor';
import styles from './Account.module.css';
import { Navigate } from 'react-router-dom';

export default function Account() {
  const newPasswordRef = useRef({ password: '', repeatPassword: '' });
  const account = JSON.parse(
    sessionStorage.getItem('loggedAccount') ||
      localStorage.getItem('loggedAccount')
  );
  if (account) {
    return (
      <div className={styles.accountContainer}>
        <h1>Sua conta</h1>
        <InfoEditor
          type='text'
          account={account}
          info='name'
          title='Nome de usuário:'
        />
        <InfoEditor
          type='email'
          account={account}
          info='email'
          title='Email:'
        />
        <form
          className={styles.changePassword}
          onSubmit={(e) => {
            const newPassword = newPasswordRef.current;
            const errors = Array.from(
              document.querySelectorAll(`.${styles.error}`)
            );
            const accounts = JSON.parse(localStorage.getItem('accounts'));
            const accountIndex = accounts.findIndex(
              (element) => element.email === account.email
            );
            e.preventDefault();
            errors.forEach((e) => (e.textContent = ''));
            if (
              account.name
                .split(' ')
                .some((str) => newPassword.password.includes(str))
            ) {
              errors[0].textContent =
                'A senha não pode conter partes do nome de usuário';
              return;
            }
            if (account.password === newPassword.password) {
              errors[0].textContent = 'Sua senha não pode ser igual a anterior';
              return;
            }
            if (!(newPassword.password === newPassword.repeatPassword)) {
              errors[1].textContent = 'As senhas devem combinar';
              return;
            }

            accounts[accountIndex]['password'] = newPassword.password;
            localStorage.setItem('accounts', JSON.stringify(accounts));
            if (sessionStorage.getItem('loggedAccount')) {
              sessionStorage.setItem(
                'loggedAccount',
                JSON.stringify(accounts[accountIndex])
              );
            } else
              localStorage.setItem(
                'loggedAccount',
                JSON.stringify(accounts[accountIndex])
              );
            location.reload();
          }}>
          <h2>Alterar senha</h2>
          <div className={styles.accountTextInput}>
            <input
              type='password'
              name='password'
              id='password'
              placeholder=' '
              minLength={8}
              required
              onChange={(e) =>
                (newPasswordRef.current.password = e.target.value)
              }
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
              onChange={(e) =>
                (newPasswordRef.current.repeatPassword = e.target.value)
              }
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
