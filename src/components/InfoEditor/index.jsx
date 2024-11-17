import { useRef, useState } from 'react';
import styles from './InfoEditor.module.css';
import edit from '/svg/edit.svg';

export default function InfoEditor({ account, info, title, type }) {
  const newValueRef = useRef(account[info]);
  const [isEditing, setIsEditing] = useState(false);
  const accounts = JSON.parse(localStorage.getItem('accounts'));
  const accountIndex = accounts.findIndex(
    (element) => element.email === account.email
  );
  return (
    <>
      {isEditing ? (
        <form
          className={styles.pair}
          onSubmit={(e) => {
            e.preventDefault();
            accounts[accountIndex][info] = newValueRef.current;
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
          <h2>{title}</h2>
          <input
            type={type}
            defaultValue={account[info]}
            onChange={(e) => (newValueRef.current = e.target.value)}
          />
          <button type='submit'>
            <img src={edit} alt='Editar informação' />
          </button>
        </form>
      ) : (
        <div className={styles.pair}>
          <h2>{title}</h2>
          <h3>{account[info]}</h3>
          <button
            type='button'
            onClick={() => {
              setIsEditing(true);
            }}>
            <img src={edit} alt='Editar informação' />
          </button>
        </div>
      )}
    </>
  );
}
