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
  const ProductsList: React.FC = () => {
    throw new Error('Erreur dans ProductsList'); // Erreur intentionnelle pour le test
    return <div>Liste des produits</div>;
  };
  return (
    <div className="product-list">
      
      { Object.entries(sortedProducts).map(([category, items]) => (
        <section key={category} className='product-category'>
          <h2>{ category }</h2>
          { items.map((product) => 
            <ProductItem key={product.id} product={product} />
          ) }
        </section>
      )) }
    </div>
  );
}

export default ProductsList;
