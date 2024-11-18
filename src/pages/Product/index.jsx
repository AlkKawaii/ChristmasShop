import { useParams } from 'react-router-dom';
import styles from './Product.module.css';
import db from '../../db/products.json';
import ProductContainer from '../../components/ProductContainer';
import Comment from '../../components/Comment';

export default function Product() {
  const params = useParams();
  const product = db.find((element) => element.id === +params.id);
  const comments = JSON.parse(localStorage.getItem('comments')).filter(
    (comment) => comment.id === +params.id
  );
  return (
    <div className={styles.container}>
      <ProductContainer product={product} />
      <div className={styles.commentContainer}>
        <h2>Comentários</h2>
        {comments.map((comment, i) => (
          <Comment
            key={i}
            author={comment.reviewerName}
            comment={comment.comment}
            date={new Date(comment.date).toLocaleDateString('pt-br', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            rating={comment.rating}
          />
        ))}
        <Comment id={product.id} />
      </div>
    </div>
  );
}
