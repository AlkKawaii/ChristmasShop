import { Navigate } from 'react-router-dom';
import styles from './ShoppingCart.module.css';
import db from '../../db/products.json';
import { useEffect, useMemo, useState } from 'react';
import CartProduct from '../../components/CartProduct';
import PurchaseResults from '../../components/PurchaseResults';

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const loggedAccount = useMemo(
    () =>
      JSON.parse(sessionStorage.getItem('loggedAccount')) ||
      JSON.parse(localStorage.getItem('loggedAccount')),
    []
  );
  const numFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  useEffect(() => {
    if (loggedAccount && loggedAccount.cart) {
      setCart(loggedAccount.cart);
    }
  }, [loggedAccount]);

  const cartItems = db
    .filter((product) => cart.some((element) => element.id === product.id))
    .map((element) => {
      return {
        ...element,
        quantity: cart.find((product) => element.id === product.id)['quantity'],
      };
    });

  if (loggedAccount) {
    return (
      <section className={styles.container}>
        <h1>Carrinho de Compras</h1>
        <div className={styles.inner}>
          <div>
            {cartItems.length > 0 ? (
              cartItems.map((element) => (
                <CartProduct
                  key={element.id}
                  product={element}
                  discountedPrice={numFormatter.format(
                    element.price - element.price * (element.discount / 100)
                  )}
                />
              ))
            ) : (
              <p>Seu carrinho está vazio.</p>
            )}
          </div>
          <PurchaseResults
            total={numFormatter.format(
              cartItems.reduce(
                (total, current) =>
                  total +
                  current.quantity *
                    (current.price - (current.discount / 100) * current.price),
                0
              )
            )}
          />
        </div>
      </section>
    );
  } else return <Navigate to='/signup' />;
}
