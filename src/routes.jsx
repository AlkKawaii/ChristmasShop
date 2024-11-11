import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Default from './pages/Default';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Product from './pages/Product';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Default />}>
          <Route index element={<Home />} />
          <Route path='product/:id' element={<Product />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
