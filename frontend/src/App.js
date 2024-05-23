import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Shop } from './Pages/Shop';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { Signup } from './Pages/Signup';
import { Footer } from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import Support from './Components/Support/Support';
import { Allproduct } from './Components/Allproduct/Allproduct';
import UserProfile from './Components/UserProfile/UserProfile';

function App() {
  return (
    <div id="root">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
            <Route path='/support' element={<Support />} />
            <Route path='/product' element={<Product />}>
              <Route path=':productId' element={<Product />} />
            </Route>
            <Route path='/Cart' element={<Cart />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Find' element={<Allproduct />} />
            <Route path='/User' element={<UserProfile />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
