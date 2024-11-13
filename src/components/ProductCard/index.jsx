import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

export default function ProductCard({
  name,
  rating = 0,
  price,
  image,
  id,
  discount,
  discountedPrice,
}) {
  return (
    <Link to={`/product/${id}`}>
      <article className={styles.card}>
        <img src={image} alt={`Imagem do produto ${name}`} />
        <h2>{name}</h2>
        <span>
          {rating > 0
            ? [
                'starOutline',
                'starOutline',
                'starOutline',
                'starOutline',
                'starOutline',
              ]
                .fill('starFilled', 0, Math.round(rating))
                .map((star, i) => (
                  <img src={`/svg/${star}.svg`} alt='Estrela' key={i} />
                ))
            : [
                'starOutline',
                'starOutline',
                'starOutline',
                'starOutline',
                'starOutline',
              ].map((star, i) => (
                <img src={`/svg/${star}.svg`} alt='Estrela' key={i} />
              ))}
        </span>
        <div className={styles.prices}>
          <span className={styles.oldPrice}>{price}</span>
          <span className={styles.newPrice}>{discountedPrice}</span>
          <span className={styles.discount}>{discount}% OFF</span>
        </div>
      </article>
    </Link>
  );
}
