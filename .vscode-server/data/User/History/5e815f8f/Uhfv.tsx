import React from 'react';
import ErrorBoundary from './ErrorBoundary'; // Assurez-vous de la bonne importation
import ProductsList from './ProductsList'; // Assurez-vous de la bonne importation

const ProductsSection: React.FC = () => {
  const handleClick = () => {
    // Simule une erreur pour démontrer l'Error Boundary
    throw new Error('Erreur déclenchée par le bouton');
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

export default ProductsSection;
