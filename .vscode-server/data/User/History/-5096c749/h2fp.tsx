import { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Product, ProductsData } from './@types/products';
import fetchData from './api/fetchData';

import './App.scss';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showProducts, setShowProducts] = useState<boolean>(false);

  useEffect(() => {
    fetchData<ProductsData>('/products')
      .then((data: ProductsData) => {
        setProducts(data.products);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []);

  const handleShowProducts = () => {
    setShowProducts(true);
  };

  return (
    <div className="app">
      <Header onButtonClick={handleShowProducts} />

      {showProducts && products && (
        <pre>
          {JSON.stringify(products, null, 4)}
        </pre>
      )}

      <Footer />
    </div>
  );
}

export default App;
