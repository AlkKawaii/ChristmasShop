import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Default from './pages/Default';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import About from './pages/About';
import Catalogue from './pages/Catalogue';
import Account from './pages/Account';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';
import ShoppingCart from './pages/ShoppingCart';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Default />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
          <Route path='account' element={<Account />} />
          <Route path='wishlist' element={<Wishlist />} />
          <Route path='shoppingcart' element={<ShoppingCart />} />
          <Route path='catalogue' element={<Catalogue />}>
            <Route path=':search' element={<Catalogue />} />
          </Route>
          <Route path='product/:id' element={<Product />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
