import { useState } from 'react';
import styles from './SearchBox.module.css';
import search from '/svg/search.svg';
import { useNavigate } from 'react-router-dom';

export default function SearchBox({}) {
  const [searching, setSearching] = useState('');
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (searching) {
          navigate(`/catalogue/${searching}`);
        }
      }}
      className={styles.searchBox}>
      <input
        type='search'
        name='search'
        id='search'
        className={styles.search}
        placeholder='Pesquise aqui'
        onChange={(e) => setSearching(e.target.value)}
      />
      <button type='submit' className={styles.submit}>
        <img src={search} alt='Pesquisa' />
      </button>
    </form>
  );
}
