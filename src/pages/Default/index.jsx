import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './Default.module.css';

export default function Default() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <Outlet />
      </main>
    </>
  );
}
