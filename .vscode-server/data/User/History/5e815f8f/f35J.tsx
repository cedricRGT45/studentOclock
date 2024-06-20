
const ErrorButton: React.FC = () => {
  const handleClick = () => {
    throw new Error('Erreur déclenchée par le bouton');
  };

  return (
    <section className="products">
      <h2>Produits</h2>
      <button onClick={handleClick}>Plus de surprise</button>
        <ProductsList />
    </section>
  );
};

export default ErrorButton;
