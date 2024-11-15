import { useParams } from 'react-router-dom';
import ProductsContainer from '../../components/ProductsContainer';
import db from '../../db/products.json';
import styles from './Catalogue.module.css';
import { useEffect, useState } from 'react';
import Filters from '../../components/Filters';

export default function Catalogue() {
  const params = useParams();
  const searchParam = normalizer(params.search);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortMethod, setSortMethod] = useState('alfstd');
  const [filter, setFilter] = useState({
    tags: [],
    priceRange: [0, 0],
    ratings: [],
  });
  const resultInfo =
    filteredProducts.length === 0
      ? 'Não foi encontrado nenhum resultado'
      : filteredProducts.length === 1
      ? 'Foi encontrado um único resultado'
      : `Foram encontrados ${filteredProducts.length} resultados`;
  useEffect(() => {
    const results = db.filter(
      (product) =>
        normalizer(product.title).includes(searchParam) ||
        product.tags.map(normalizer).some((tag) => tag.includes(searchParam))
    );
    setSearchedProducts(results);
  }, [searchParam]);

  useEffect(() => {
    handleFiltering();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedProducts, sortMethod]);

  function normalizer(str = '') {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function sortProducts(filtered) {
    const newFilteredProducts = [...filtered];
    switch (sortMethod) {
      case 'alfstd':
        newFilteredProducts.sort((a, b) =>
          normalizer(a.title).localeCompare(normalizer(b.title))
        );

        break;
      case 'alfrev':
        newFilteredProducts.sort((a, b) =>
          normalizer(b.title).localeCompare(normalizer(a.title))
        );

        break;
      case 'priasc':
        newFilteredProducts.sort((a, b) => a.price - b.price);

        break;
      case 'prides':
        newFilteredProducts.sort((a, b) => a.price - b.price);
        newFilteredProducts.reverse();

        break;
      case 'ratdes':
        newFilteredProducts.sort((a, b) => a.rating - b.rating);
        newFilteredProducts.reverse();

        break;
      case 'ratasc':
        newFilteredProducts.sort((a, b) => a.rating - b.rating);

        break;
      case 'mosrat':
        newFilteredProducts.sort((a, b) => a.reviews.length - b.reviews.length);
        newFilteredProducts.reverse();

        break;
      default:
        break;
    }
    return newFilteredProducts;
  }

  function handleFiltering(filters = filter) {
    const tags = filters.tags.map((tag) => normalizer(tag));
    const minPrice = filters.priceRange[0];
    const maxPrice = filters.priceRange[1];
    const rating = Math.max(...filters.ratings, 0);
    let productsCopy = searchedProducts
      .filter((product) => product.rating >= rating)
      .filter((product) => {
        if (maxPrice === 0) return true;
        else
          return (
            product.price - product.price * 0.3 >= minPrice &&
            product.price - product.price * 0.3 <= maxPrice
          );
      })
      .filter((product) => {
        if (filters.tags.length === 0) return true;
        else return product.tags.some((tag) => tags.includes(normalizer(tag)));
      });
    setFilteredProducts(sortProducts(productsCopy));
    setFilter(filters);
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.resultInfo}>{resultInfo}</h2>
      <div className={styles.sortContainer}>
        <label htmlFor='sort'>Ordenar por</label>
        <select
          name='sort'
          id='sort'
          className={styles.sortSelect}
          onChange={(e) => setSortMethod(e.target.value)}>
          <option value='alfstd'>Ordem Alfabética</option>
          <option value='alfrev'>Ordem Alfabética Reversa</option>
          <option value='priasc'>Preço crescente</option>
          <option value='prides'>Preço decrescente</option>
          <option value='ratdes'>Maior Avaliação</option>
          <option value='ratasc'>Menor Avaliação</option>
          <option value='mosrat'>Mais relevante</option>
        </select>
      </div>
      <div className={styles.filteredCatalogue}>
        <Filters handleFiltering={handleFiltering} />
        <ProductsContainer products={filteredProducts} />
      </div>
    </section>
  );
}
