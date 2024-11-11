import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

export default function ProductCard({ name, rating = 0, price, image, id }) {
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
                .fill('starFilled', 0, Math.round(rating) - 1)
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
        <span>{price}</span>
      </article>
    </Link>
  );
}
