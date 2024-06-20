import React, { useRef } from 'react';
import { Product } from "../../../../@types/products";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { add, increment } from "../../../../store/features/cart/cartSlice";
import isInCart from "../../../../store/selectors/isIncart";
import { createPortal } from 'react-dom';
import ProductModal from "./ProductModal";

interface ProductItemProps {
    product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
    const alreadyInCart = useAppSelector(isInCart(product.id));
    const dispatch = useAppDispatch();
    const popoverRef = useRef<HTMLDivElement>(null);

    const addToCart = () => {
        if (alreadyInCart) {
            dispatch(increment(product.id));
        } else {
            dispatch(add({ ...product, quantity: 1 }));
        }
    }

    const handleOpenModal = () => {
        if (popoverRef.current) {
            popoverRef.current.showPopover();
        }
    }

    return (
        <article
            className="product"
            onClick={handleOpenModal}>
            <header>
                <h3>{product.title}</h3>
            </header>
            <div className="product-img">
                <img src={product.images[0]} alt={product.title} />
                <button
                    className="product-btnSeeMore"
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleOpenModal(); }}
                >
                    Voir plus...
                </button>
            </div>
            <div>
                <span>{product.price} <abbr title="EUR">€</abbr></span>

                <p>{product.description}</p>

                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                >
                    Ajouter
                </button>
            </div>
            { createPortal(
                <div ref={popoverRef} popover="manual" popovertarget="popOver">
                    <ProductModal product={product} />
                </div>,
                document.body
            )}
        </article>
    );
}

export default ProductItem;
