import { useRef, useEffect } from 'react';
import styles from './SignUp.module.css';

export default function SignUp({ changeScreen }) {
  const modalRef = useRef(null);
  const formInfoRef = useRef({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    persist: false,
  });

  function handleSubmit(e) {
    const info = formInfoRef.current;
    const errors = Array.from(document.querySelectorAll(`.${styles.error}`));
    const accounts = JSON.parse(localStorage.getItem('accounts'));
    e.preventDefault();
    errors.forEach((e) => (e.textContent = ''));
    if (info.name.split(' ').some((str) => info.password.includes(str))) {
      errors[2].textContent =
        'A senha não pode conter partes do nome de usuário';
      return;
    }
    if (accounts) {
      if (accounts.find((account) => account.email === info.email)) {
        errors[1].textContent = 'Já existe uma conta com esse email';
        return;
      }
    }
    if (!(info.password === info.repeatPassword)) {
      errors[3].textContent = 'As senhas devem combinar';
      return;
    }

    if (accounts) {
      accounts.push({
        name: info.name,
        email: info.email,
        password: info.password,
      });
      localStorage.setItem('accounts', accounts);
    } else
      localStorage.setItem(
        'accounts',
        JSON.stringify([
          {
            name: info.name,
            email: info.email,
            password: info.password,
          },
        ])
      );
    if (info.persist) {
      localStorage.setItem(
        'loggedAccount',
        JSON.stringify({
          name: info.name,
          email: info.email,
          password: info.password,
        })
      );
    } else
      sessionStorage.setItem(
        'loggedAccount',
        JSON.stringify({
          name: info.name,
          email: info.email,
          password: info.password,
        })
      );
    location.reload();
  }

  useEffect(() => {
    const closeModal = (e) => {
      if (modalRef.current.open) {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          modalRef.current.close();
          console.log('Fechado');
        }
      }
    };
    document.addEventListener('click', closeModal);
    return () => {
      document.removeEventListener('click', closeModal);
    };
  }, []);

  return (
    <article className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.textInput}>
          <input
            type='text'
            name='name'
            id='name'
            placeholder=' '
            autoFocus
            required
            onChange={(e) => (formInfoRef.current.name = e.target.value)}
          />
          <label htmlFor='name'>Nome de usuário</label>
          <span className={styles.error}></span>
        </div>
        <div className={styles.textInput}>
          <input
            type='email'
            name='email'
            id='email'
            placeholder=' '
            required
            onChange={(e) => (formInfoRef.current.email = e.target.value)}
          />
          <label htmlFor='email'>Email</label>
          <span className={styles.error}></span>
        </div>
        <div className={styles.textInput}>
          <input
            type='password'
            name='password'
            id='password'
            placeholder=' '
            minLength={8}
            required
            onChange={(e) => (formInfoRef.current.password = e.target.value)}
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
            onChange={(e) =>
              (formInfoRef.current.repeatPassword = e.target.value)
            }
          />
          <label htmlFor='repeatPassword'>Repita a senha</label>
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
          Registrar
        </button>
        <p>
          Ao criar uma conta você concorda com os{' '}
          <span
            className={styles.pseudoLink}
            onClick={(e) => {
              modalRef.current.show();
              e.stopPropagation();
            }}>
            termos de uso
          </span>{' '}
          da Christmas Shop
        </p>
        <span>
          Já tem uma conta?{' '}
          <span className={styles.pseudoLink} onClick={() => changeScreen()}>
            Faça login
          </span>
        </span>
      </form>
      <dialog ref={modalRef} className={styles.modal}>
        <p>
          Você concorda em vender sua alma em troca de 30% de desconto em todo o
          site.
        </p>
        <button
          type='button'
          autoFocus
          onClick={() => modalRef.current.close()}>
          ✕
        </button>
      </dialog>
    </article>
  );
}
