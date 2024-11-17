import styles from './Home.module.css';
import db from '../../db/products.json';
import ProductsContainer from '../../components/ProductsContainer';
import Slider from '../../components/slider';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Slider
        content={[
          <Link to='catalogue' key='1'>
            <img src='/images/imagem1.JPG' alt={`Imagem número 1`} />
          </Link>,
          <Link to='catalogue/arvore' key='2'>
            <img src='/images/imagem2.JPG' alt={`Imagem número 2`} />
          </Link>,
          <Link to='catalogue/arvore' key='3'>
            <img src='/images/imagem3.JPG' alt={`Imagem número 3`} />
          </Link>,
        ]}
      />
      <h1 className={styles.title}>Confira nossos produtos!</h1>
      <ProductsContainer products={db} />
    </>
  );
}
