import ErrorBoundary from './ErrorBoundary';
import ErrorButton from './ErrorButton';
import ProductsList from './ProductsList';

function Products() {

  return (
    <section className="products">
      <h2>Produits</h2>
      <ErrorBoundary
        <ErrorButton />
      <ErrorBoundary />
        <ProductsList />
    </section>
  );
}

export default Products;
