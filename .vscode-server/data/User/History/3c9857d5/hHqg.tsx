import { useEffect, useState } from 'react';
import './assets/scss/main.scss';
import { Product, ProductsData } from './@types/products';
import fetchData from './api/fetchData';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showProducts, setShowProducts] = useState<boolean>(false);

  const handleStart = () => {
    fetchData<ProductsData>('/products')
      .then((data: ProductsData) => {
        setProducts(data.products);
        setShowProducts(true);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  };

  return (
    <div className="app">
      <Header />
      { showProducts ? (
        <div>
          <pre>{JSON.stringify(products, null, 4)}</pre>
        </div>
      ) : (
        <Home onStart={handleStart} />
      )}
      <Footer />
    </div>
  );
}

export default App;
