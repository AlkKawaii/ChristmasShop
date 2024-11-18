import { useState } from 'react';
import styles from './ProductContainer.module.css';
import FavButton from '../FavButton';
import { useNavigate } from 'react-router-dom';

const productType = {
  id: 0,
  title: '',
  description: '',
  category: '',
  price: 0,
  discount: 0,
  rating: 0,
  stock: 0,
  tags: [],
  shippingInformation: '',
  availabilityStatus: '',
  reviews: [
    {
      rating: 0,
      comment: '',
      date: '',
      reviewerName: '',
    },
    {
      rating: 0,
      comment: '',
      date: '',
      reviewerName: '',
    },
  ],
  thumbnail: '',
};

export default function ProductContainer({ product = productType }) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  function handleAddToCart() {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const loggedAccount =
      JSON.parse(sessionStorage.getItem('loggedAccount')) ||
      JSON.parse(localStorage.getItem('loggedAccount'));

    if (!loggedAccount) {
      navigate('/signup');
      return;
    }

    let accountIndex = accounts.findIndex(
      (account) => account.email === loggedAccount.email
    );

    if (!accounts[accountIndex].cart) {
      accounts[accountIndex].cart = [];
    }

    const existingItem = accounts[accountIndex].cart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity <= product.stock) {
        accounts[accountIndex].cart[
          accounts[accountIndex].cart.findIndex(
            (product) => existingItem.id === product.id
          )
        ].quantity = newQuantity;
      } else {
        accounts[accountIndex].cart[
          accounts[accountIndex].cart.findIndex(
            (product) => existingItem.id === product.id
          )
        ].quantity = product.stock;
      }
    } else {
      accounts[accountIndex].cart.push({ id: product.id, quantity });
    }

    localStorage.setItem('accounts', JSON.stringify(accounts));

    if (sessionStorage.getItem('loggedAccount')) {
      sessionStorage.setItem(
        'loggedAccount',
        JSON.stringify(accounts[accountIndex])
      );
    } else {
      localStorage.setItem(
        'loggedAccount',
        JSON.stringify(accounts[accountIndex])
      );
    }
  }

  return (
    <section className={styles.product}>
      <img src={product.thumbnail} alt={`Imagem do produto ${product.title}`} />
      <FavButton id={product.id} />
      <div className={styles.info}>
        <h1>{product.title}</h1>
        <span className={styles.rating}>
          {product.rating}
          {product.rating > 0
            ? [
                'starOutline',
                'starOutline',
                'starOutline',
                'starOutline',
                'starOutline',
              ]
                .fill('starFilled', 0, Math.round(product.rating))
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
          ({product.reviews.length})
        </span>
        <div className={styles.prices}>
          <span className={styles.oldPrice}>
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
          <span className={styles.newPrice}>
            {(
              product.price -
              product.price * (product.discount / 100)
            ).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
          <span className={styles.discount}>{product.discount}% OFF</span>
        </div>
        <p>{product.description}</p>
      </div>
      <div className={styles.shopArea}>
        <span>{product.shippingInformation}</span>
        <span>{product.availabilityStatus}</span>
        <div className={styles.quantitySetter}>
          Quantidade:
          <div>
            <button
              onClick={() => setQuantity((old) => (old === 1 ? old : old - 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() =>
                setQuantity((old) => (old === product.stock ? old : old + 1))
              }>
              +
            </button>
          </div>
          ({product.stock} disponíveis)
        </div>
        <button
          className={`${styles.button} ${styles.shopNow}`}
          onClick={() => {
            handleAddToCart();
            navigate('/shoppingcart');
          }}>
          Comprar agora
        </button>
        <button
          className={`${styles.button} ${styles.shoppingCart}`}
          onClick={handleAddToCart}>
          Adicionar ao carrinho
        </button>
      </div>
    </section>
  );
}
