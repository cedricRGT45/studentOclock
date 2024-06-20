import { useState, useEffect } from 'react';
import fetchData from '../../../api/fetchData';
import { Product, ProductsData } from '../../../../@types/products';
import { groupByKey } from '../../../../utils/groupByKey';

function ProductsList() {
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchData<ProductsData>('/products')
      .then((data) => {
        // Groupé les produits par catégorie
        const productsByCategory = groupByKey(data.products, 'category');
        setSortedProducts(data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="product-list">
      <pre>{JSON.stringify(products, null, 4)}</pre>
    </div>
  );
}

export default ProductsList;
