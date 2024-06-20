import { useEffect, useState } from 'react'



import Header from './components/Header/Header';

import './App.scss';
import Footer from './components/Footer/Footer';
import { Product, ProductsData } from './@types/products';
import fetchData from './api/fetchData';


function App() {

  // TODO dummy fetch (à déplacer dans composant dédié)
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    fetchData<ProductsData>('/products')
      .then((data: ProductsData) => {
        setProducts(data.products);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="app">
      <Header />
      { products && <pre>
        { JSON.stringify(products, null, 4) }
      </pre> }

      <Footer />
    </div>
  );
}

export default App;
