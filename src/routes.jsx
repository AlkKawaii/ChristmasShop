import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Default from './pages/Default';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Default />}>
          <Route index element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
