import { createPortal } from "react-dom";
import { Product } from "../../../../@types/products";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { add, increment } from "../../../../store/features/cart/cartSlice";
import isInCart from "../../../../store/selectors/isIncart";
import ProductModal from "./ProductModal";
import { useState, MouseEvent } from "react";

interface ProductItemProps {
    product: Product;
}

const ProductItem = ({product}: ProductItemProps) => {
    const [showModal, setShowModal] = useState(false);

    const alreadyInCart = useAppSelector(isInCart(product.id));
    const dispatch = useAppDispatch();

    const addToCart = () => {
        if (alreadyInCart) {
            dispatch(increment(product.id));
        } else {
            dispatch(add({ ...product, quantity: 1 }));
        }
    }

    const openModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setShowModal(true);
    }

    const closeModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setShowModal(false);
    }

    return (
        <article className="product-item" onClick={openModal}>
            <header>
                <h3>{ product.title }</h3>
            </header>

            <img src={product.images[0]} alt={product.title} />

            <div>
                <span>{product.price} <abbr title="EUR">€</abbr></span>

                <p>{product.description}</p>

                <button 
                    type="button"
                    onClick={addToCart}>
                    Ajouter
                </button>
            </div>

            { showModal && createPortal(
                <ProductModal product={product} onClose={closeModal} />,
                document.body
            ) }
        </article>
    )
}

export default ProductItem;