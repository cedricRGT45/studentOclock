import ErrorButton from './ErrorButton';
import ProductsList from './ProductsList';

function Products() {

  return (
    <section className="products">
      <h2>Produits</h2>
      
        <ErrorButton />
        <ProductsList />
    </section>
  );
}

export default Products;
