import { useEffect, useMemo, useState } from 'react';
import styles from './Wishlist.module.css';
import ProductsContainer from '../../components/ProductsContainer';
import db from '../../db/products.json';
import { Navigate } from 'react-router-dom';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const loggedAccount = useMemo(
    () =>
      JSON.parse(sessionStorage.getItem('loggedAccount')) ||
      JSON.parse(localStorage.getItem('loggedAccount')),
    []
  );

  useEffect(() => {
    if (loggedAccount && loggedAccount.wishlist) {
      setWishlist(loggedAccount.wishlist);
    }
  }, [loggedAccount]);

  const wishlistItems = db.filter((product) => wishlist.includes(product.id));

  if (loggedAccount) {
    return (
      <section className={styles.wishlistPage}>
        <h1>Minha Lista de Desejos</h1>
        {wishlistItems.length > 0 ? (
          <ProductsContainer products={wishlistItems} />
        ) : (
          <p>Sua lista de desejos está vazia.</p>
        )}
      </section>
    );
  } else return <Navigate to='/signup' />;
}
