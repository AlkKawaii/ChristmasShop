import styles from './ProductCard.module.css';

export default function ProductCard({ name, rating = 0, price, image }) {
  return (
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
              .map((star) => <img src={`/svg/${star}.svg`} alt='Estrela' />)
          : [
              'starOutline',
              'starOutline',
              'starOutline',
              'starOutline',
              'starOutline',
            ].map((star) => <img src={`/svg/${star}.svg`} alt='Estrela' />)}
      </span>
      <span>{price}</span>
    </article>
  );
}
