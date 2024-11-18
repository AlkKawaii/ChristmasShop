import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './Default.module.css';
import Footer from '../../components/Footer';
import { useEffect } from 'react';
import db from '../../db/products.json';

export default function Default() {
  useEffect(() => {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    if (comments.length < 1) {
      db.forEach((product) =>
        product.reviews.forEach((review) =>
          comments.push({ ...review, id: product.id })
        )
      );
    }

    localStorage.setItem('comments', JSON.stringify(comments));
  }, []);
  return (
    <>
      <Header />
      <main className={styles.container}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
