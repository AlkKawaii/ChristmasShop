import ProductCard from '../ProductCard';
import styles from './ProductsContainer.module.css';

export default function ProductsContainer({ products = [] }) {
  const numFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return (
    <div className={styles.container}>
      {products.map((product) => (
        <ProductCard
          name={product.title}
          image={product.thumbnail}
          rating={product.rating}
          price={numFormatter.format(product.price)}
          discount={product.discount}
          discountedPrice={numFormatter.format(
            product.price - product.price * (product.discount / 100)
          )}
          id={product.id}
          key={product.id}
        />
      ))}
    </div>
  );
}
