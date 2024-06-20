import { Product } from "../../../../@types/products";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { add, increment } from "../../../../store/features/cart/cartSlice";
import isInCart from "../../../../store/selectors/isIncart";
import { createPortal } from 'react-dom';
import ProductModal from "./ProductModal";

interface ProductItemProps {
    product: Product;
}

const ProductItem = ({product}: ProductItemProps) => {

    const alreadyInCart = useAppSelector(isInCart(product.id));
    const dispatch = useAppDispatch();

    const addToCart = () => {
        if (alreadyInCart) {
            dispatch(increment(product.id));
        } else {
            dispatch(add({ ...product, quantity: 1 }));
        }
    }

    function supportsPopovers() {
        return HTMLElement.prototype.hasOwnProperty("popover");
      }

const popover = document.getElementById("popOver");
const toggleBtn = document.getElementById("toggleBtn");
const popoverSupported = supportsPopover();

if (popoverSupported) {
  popover.popover = "auto";
  toggleBtn.popoverTargetElement = popover;
  toggleBtn.popoverTargetAction = "toggle";
} else {
  toggleBtn.style.display = "none";
}


    return (
        <article 
            id="toggleBtn"
            className="product"
            >
            <header>
                <h3>{ product.title }</h3>
            </header>
            <div className="product-img">
                <img src={product.images[0]} alt={product.title} />
                <button
                className="product-btnSeeMore" 
                type="button"
                popovertarget="popOver">
                Voir plus...
                </button>
            </div>
            <div>
                <span>{product.price} <abbr title="EUR">€</abbr></span>

                <p>{product.description}</p>

                <button  
                    type="button"
                    onClick={addToCart}>
                    Ajouter
                </button>
            </div>
            { createPortal(
                <ProductModal product={product} />,
                document.body
            ) }
        </article>
    )
}

export default ProductItem;