import { Product } from "../../../../@types/products";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { add, increment } from "../../../../store/features/cart/cartSlice";
import isInCart from "../../../../store/selectors/isIncart";
import { createPortal } from 'react-dom';
import ProductModal from "./ProductModal";
import { useRef, useEffect } from 'react';

interface ProductItemProps {
    product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
    const alreadyInCart = useAppSelector(isInCart(product.id));
    const dispatch = useAppDispatch();
    const articleRef = useRef<HTMLElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const addToCart = () => {
        if (alreadyInCart) {
            dispatch(increment(product.id));
        } else {
            dispatch(add({ ...product, quantity: 1 }));
        }
    }

    useEffect(() => {
        if (articleRef.current && popoverRef.current && buttonRef.current) {
            popoverRef.current.popover = "auto";
            buttonRef.current.popoverTargetElement = popoverRef.current;
            buttonRef.current.popoverTargetAction = "toggle";
        }
    }, []);

    const handleArticleClick = () => {
        if (popoverRef.current) {
            popoverRef.current.togglePopover();
        }
    }

    return (
        <article
            className="product"
            ref={articleRef}
            onClick={handleArticleClick}>
            <header>
                <h3>{product.title}</h3>
            </header>
            <div className="product-img">
                <img src={product.images[0]} alt={product.title} />
                <button
                    className="product-btnSeeMore"
                    type="button"
                    ref={buttonRef}
                    onClick={(e) => {
                        e.stopPropagation(); // Empêche la propagation du clic à l'article
                    }}>
                    Voir plus...
                </button>
            </div>
            <div>
                <span>{product.price} <abbr title="EUR">€</abbr></span>

                <p>{product.description}</p>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation(); // Empêche la propagation du clic à l'article
                        addToCart();
                    }}>
                    Ajouter
                </button>
            </div>
            <div id="mypopover" ref={popoverRef}>
                { createPortal(
                    <ProductModal product={product} />,
                    document.body
                ) }
            </div>
        </article>
    )
}

export default ProductItem;
