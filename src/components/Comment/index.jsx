import { Link } from 'react-router-dom';
import styles from './Comment.module.css';
import { useMemo, useState } from 'react';

export default function Comment({ author, comment, rating, date, id }) {
  const [formInfo, setFormInfo] = useState({ rating: 0, comment: '' });
  const loggedAccount = useMemo(
    () =>
      JSON.parse(sessionStorage.getItem('loggedAccount')) ||
      JSON.parse(localStorage.getItem('loggedAccount')),
    []
  );

  function handleSubmit(e) {
    e.preventDefault();
    const comments = JSON.parse(localStorage.getItem('comments'));
    const username = loggedAccount.name;
    const date = new Date().toISOString();
    const productId = id;
    const commentJSON = {
      rating: formInfo.rating,
      comment: formInfo.comment,
      date: date,
      reviewerName: username,
      id: productId,
    };
    comments.push(commentJSON);
    localStorage.setItem('comments', JSON.stringify(comments));
    location.reload();
  }

  if (author)
    return (
      <article className={styles.container}>
        <h4>{author}</h4>
        <div className={styles.commentInfo}>
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
          <span>{date}</span>
        </div>
        <p>{comment}</p>
      </article>
    );
  else
    return loggedAccount ? (
      <form className={styles.form} onSubmit={handleSubmit}>
        <h4>Deixe seu comentário</h4>

        <label className={styles.ratingLabel}>Sua Avaliação:</label>
        <div className={styles.ratingInput}>
          <input
            type='range'
            name='rating'
            id='rating'
            value={formInfo.rating}
            min={0}
            max={5}
            step={0.1}
            onChange={(e) =>
              setFormInfo((a) => {
                return { ...a, rating: e.target.value };
              })
            }
            required
          />
          <label htmlFor='rating'>{formInfo.rating}</label>
        </div>
        <div className={styles.commentTextInput}>
          <textarea
            id='comment'
            name='comment'
            className={styles.commentInput}
            value={formInfo.comment}
            placeholder=' '
            required
            onChange={(e) =>
              setFormInfo((a) => {
                return { ...a, comment: e.target.value };
              })
            }
          />
          <label htmlFor='comment'>Seu Comentário:</label>
        </div>
        <button type='submit' className={styles.submit}>
          Enviar Comentário
        </button>
      </form>
    ) : (
      <article className={styles.account}>
        <h3>Para comentar, entre ou registre-se</h3>
        <div>
          <Link to='/login'>Entre</Link>
          ou
          <Link to='/signup'>Registre-se</Link>
        </div>
      </article>
    );
}
