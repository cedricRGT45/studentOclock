import React, { useState } from 'react';
import { Product } from '../../../../@types/products';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { add, increment } from '../../../../store/features/cart/cartSlice';
import isInCart from '../../../../store/selectors/isInCart';
import { createPortal } from 'react-dom';
import ProductModal from './ProductModal';

interface ProductItemProps {
    product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
    const alreadyInCart = useAppSelector((state) => isInCart(state, product.id));
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addToCart = () => {
        if (alreadyInCart) {
            dispatch(increment(product.id));
        } else {
            dispatch(add({ ...product, quantity: 1 }));
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <article className="product">
            <header>
                <h3>{product.title}</h3>
            </header>
            <div className="product-img">
                <img src={product.images[0]} alt={product.title} />
                <button
                    className="product-btnSeeMore"
                    type="button"
                    onClick={toggleModal}
                >
                    Voir plus...
                </button>
            </div>
            <div>
                <span>{product.price} <abbr title="EUR">€</abbr></span>
                <p>{product.description}</p>
                <button type="button" onClick={addToCart}>
                    Ajouter
                </button>
            </div>
            {isModalOpen && createPortal(
                <ProductModal product={product} />,
                document.body
            )}
        </article>
    );
};

export default ProductItem;
