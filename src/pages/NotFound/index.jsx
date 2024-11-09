import styles from './NotFound.module.css';
import SearchBox from '../../components/SearchBox';

export default function NotFound() {
  return (
    <section className={styles.container}>
      <span>404</span>
      <p>
        Parece que os elfos do Papai Noel acidentalmente colocaram a página que
        você está procurando no lugar errado!
      </p>
      <p>Pesquise aqui:</p>
      <SearchBox />
    </section>
  );
}
