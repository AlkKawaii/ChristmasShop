import { useEffect, useRef } from 'react';
import styles from './PurchaseResults.module.css';

export default function PurchaseResults({ total }) {
  const modalRef = useRef(null);
  useEffect(() => {
    const closeModal = (e) => {
      if (modalRef.current.open) {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          modalRef.current.close();
          const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
          const loggedAccount =
            JSON.parse(sessionStorage.getItem('loggedAccount')) ||
            JSON.parse(localStorage.getItem('loggedAccount'));

          let accountIndex = accounts.findIndex(
            (account) => account.email === loggedAccount.email
          );

          if (accounts[accountIndex].cart) {
            accounts[accountIndex].cart = [];
          }

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

          location.reload();
        }
      }
    };
    document.addEventListener('click', closeModal);
    return () => {
      document.removeEventListener('click', closeModal);
    };
  }, []);
  return (
    <>
      <article className={styles.container}>
        <div>
          <span>Subtotal:</span>
          <span>{total}</span>
        </div>
        <div>
          <span>Frete:</span>
          <span>Grátis</span>
        </div>
        <div>
          <span>Total:</span>
          <span>{total}</span>
        </div>
        <button
          type='button'
          onClick={(e) => {
            modalRef.current.show();
            e.stopPropagation();
          }}>
          Comprar
        </button>
      </article>
      <dialog ref={modalRef} className={styles.modal}>
        <img src='/svg/circle-check.svg' alt='certinho' />
        <p>Sua compra foi realizada com sucesso!</p>
        <button
          type='button'
          autoFocus
          onClick={() => modalRef.current.close()}>
          ✕
        </button>
      </dialog>
    </>
  );
}
