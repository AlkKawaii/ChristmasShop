import { useEffect, useState } from 'react';
import styles from './Wishlist.module.css';
import ProductsContainer from '../../components/ProductsContainer';
import db from '../../db/products.json';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const loggedAccount =
      JSON.parse(sessionStorage.getItem('loggedAccount')) ||
      JSON.parse(localStorage.getItem('loggedAccount'));

    if (loggedAccount && loggedAccount.wishlist) {
      setWishlist(loggedAccount.wishlist);
    }
  }, []);

  const wishlistItems = db.filter((product) => wishlist.includes(product.id));

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
}
