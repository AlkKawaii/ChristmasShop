import { Link } from 'react-router-dom';
import styles from './CartProduct.module.css';

export default function CartProduct({ product, discountedPrice }) {
  return (
    <Link to={`/product/${product.id}`}>
      <article className={styles.container}>
        <img
          src={product.thumbnail}
          alt={`Imagem do produto ${product.title}`}
        />
        <div>
          <h2>{product.title}</h2>
          <div className={styles.prices}>
            <span className={styles.oldPrice}>
              {product.price.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <span className={styles.newPrice}>{discountedPrice}</span>
            <span className={styles.discount}>{product.discount}% OFF</span>
          </div>
        </div>
        <span className={styles.quantity}>X{product.quantity}</span>
        <button
          type='button'
          className={styles.delete}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
            const loggedAccount =
              JSON.parse(sessionStorage.getItem('loggedAccount')) ||
              JSON.parse(localStorage.getItem('loggedAccount'));

            let accountIndex = accounts.findIndex(
              (account) => account.email === loggedAccount.email
            );

            if (accounts[accountIndex].cart) {
              const updatedCart = accounts[accountIndex].cart.filter(
                (item) => item.id !== product.id
              );
              accounts[accountIndex].cart = updatedCart;
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
          }}>
          <img src='/svg/trash.svg' alt='apagar item' />
        </button>
      </article>
    </Link>
  );
}
