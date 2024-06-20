import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import ProductsList from './ProductsList';

const Products: React.FC = () => {
  const handleClick = () => {
    // Simule une erreur pour démontrer l'Error Boundary
    console.log('Button clicked');
  };

  return (
    <section className="products">
      <h2>Produits</h2>
      <button onClick={handleClick}>Plus de surprise</button>
      <ErrorBoundary>
        <ProductsList />
      </ErrorBoundary>
    </section>
  );
};

export default Products;
