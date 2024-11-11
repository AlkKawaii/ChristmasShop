import Slider from '../../components/slider';
import styles from './Home.module.css';
import db from '../../db/products.json';
import ProductsContainer from '../../components/ProductsContainer';

export default function Home() {
  return (
    <>
      <Slider
        images={[
          '/images/imagem1.JPG',
          '/images/imagem2.JPG',
          '/images/imagem3.JPG',
        ]}
      />
      <h1 className={styles.title}>Confira nossos produtos!</h1>
      <ProductsContainer products={db} />
    </>
  );
}
