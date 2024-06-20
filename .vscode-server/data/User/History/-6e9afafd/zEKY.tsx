import { useState, useEffect } from 'react';
import fetchData from '../../../../api/fetchData';
import { Product, ProductsData } from '../../../../@types/products';
import { groupByKey } from '../../../../utils/groupByKey';
import ProductItem from './ProductItem';

function ProductsList() {
  const [sortedProducts, setSortedProducts] = useState<Record<string, Product[]>>({});

  useEffect(() => {
    fetchData<ProductsData>('/products')
      .then((data) => {
        // Groupé les produits par catégorie
        const productsByCategory = groupByKey(data.products, 'category');
        setSortedProducts(productsByCategory);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="product-list">
      
      { Object.entries(sortedProducts).map(([category, items]) => (
        <section key={category} className='product-category'>
          <h2>{ category }</h2>
          <button>Plus de surprise</button>
          { items.map((product) => 
            <ProductItem key={product.id} product={product} />
          ) }
        </section>
      )) }
    </div>
  );
}

export default ProductsList;
