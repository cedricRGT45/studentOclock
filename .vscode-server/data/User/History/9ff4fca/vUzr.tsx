import { Product } from "../../../../@types/products";

interface ProductItemProps {
    product: Product;
}

const ProductItem = ({product}: ProductItemProps) => {
    return (
        <article className="product-item">
            <header>
                <h3>{ product.title }</h3>
            </header>

            <img src={product.images[0]} alt={product.title} />

            <div>
                <span>{product.price} <abbr title="EUR">€</abbr></span>

                <p>{product.description}</p>

                <button type="button">
                    Ajouter
                </button>
            </div>
        </article>
    )
}

export default ProductItem;