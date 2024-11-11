import { useParams } from 'react-router-dom';
import styles from './Product.module.css';
import db from '../../db/products.json';

export default function Product() {
  const params = useParams();
  const product = db.find((element) => element.id === +params.id);
  return <section className={styles.product}>{product.id}</section>;
}
