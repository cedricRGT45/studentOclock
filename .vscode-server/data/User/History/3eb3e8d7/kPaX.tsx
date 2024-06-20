import React, { useState } from 'react';
import { Product } from '../../../../@types/products';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { add, increment } from '../../../../store/features/cart/cartSlice';
import isInCart from '../../../../store/selectors/isInCart';
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <article className="product" onClick={openModal}>
            <header>
                <h3>{product.title}</h3>
            </header>
            <div className="product-img">
                <img src={product.images[0]} alt={product.title} />
            </div>
            <div>
                <span>{product.price} <abbr title="EUR">€</abbr></span>
                <p>{product.description}</p>
                <button type="button" onClick={addToCart}>
                    Ajouter
                </button>
            </div>
            {isModalOpen && <ProductModal product={product} />}
        </article>
    );
};

export default ProductItem;
