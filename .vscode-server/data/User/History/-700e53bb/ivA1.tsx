import ErrorButton from '<div styleName={} />
<div styleName={} />
<components />ErrorButton';
import ProductsList from './ProductsList';
import ErrorBoundary from '../../ui/ErrorBoundary';

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
