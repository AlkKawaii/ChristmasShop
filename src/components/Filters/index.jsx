import styles from './Filters.module.css';
import db from '../../db/products.json';
import { useEffect, useRef } from 'react';

export default function Filters({ handleFiltering }) {
  const checkboxes = [];
  const formRef = useRef(null);
  db.forEach((product) =>
    product.tags.forEach((tag) =>
      checkboxes.includes(tag) ? null : checkboxes.push(tag)
    )
  );

  useEffect(() => {
    const formElem = formRef.current;
    function handleForm(e) {
      e.preventDefault();
      const tagsBox = formElem.querySelector('div#tagsBox');
      const priceRange = formElem.querySelector('div#priceRange');
      const ratingBox = formElem.querySelector('div#ratingBox');

      const filters = {
        tags: Array.from(tagsBox.querySelectorAll('input'))
          .filter((element) => element.checked)
          .map((element) => element.value),
        priceRange: Array.from(priceRange.querySelectorAll('input')).map(
          (element) => +element.value
        ),
        ratings: Array.from(ratingBox.querySelectorAll('input'))
          .filter((element) => element.checked)
          .map((element) => +element.value),
      };
      handleFiltering(filters);
    }
    formElem.addEventListener('submit', handleForm);
    return () => {
      formElem.removeEventListener('submit', handleForm);
    };
  }, [handleFiltering]);

  return (
    <form className={styles.container} ref={formRef}>
      <div className={styles.checkboxesOuter}>
        <h3>Tags</h3>
        <div className={styles.checkboxesInner} id='tagsBox'>
          {checkboxes.map((checkbox) => {
            return (
              <div className={styles.checkboxContainer} key={checkbox}>
                <input
                  type='checkbox'
                  id={checkbox}
                  name='checkbox'
                  value={checkbox}
                />
                <label htmlFor={checkbox}>{checkbox}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.priceRange}>
        <h3>Faixa de Preço</h3>
        <div id='priceRange'>
          <input
            type='text'
            name='min'
            pattern='^[0-9]+([.][0-9]+)?$'
            id='min'
            defaultValue={0}
          />
          -
          <input
            type='text'
            name='max'
            pattern='^[0-9]+([.][0-9]+)?$'
            id='max'
          />
        </div>
      </div>
      <div className={styles.ratingFilter} id='ratingBox'>
        <h3>Avaliação</h3>
        {Array(6)
          .fill('')
          .map((rating, i) => (
            <div key={i} className={styles.checkboxContainer}>
              <input
                type='checkbox'
                name='rating'
                id={`rating${i}`}
                value={i}
              />
              <label htmlFor={`rating${i}`}>
                {i > 0
                  ? [
                      'starOutline',
                      'starOutline',
                      'starOutline',
                      'starOutline',
                      'starOutline',
                    ]
                      .fill('starFilled', 0, i)
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
              </label>
            </div>
          ))}
      </div>
      <button type='submit'>Salvar</button>
    </form>
  );
}
