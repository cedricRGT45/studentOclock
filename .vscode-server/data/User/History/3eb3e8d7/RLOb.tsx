import React, { useState, useEffect } from 'react';
import { Product } from '../../../../@types/products';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { add, increment } from '../../../../store/features/cart/cartSlice';
import isInCart from '../../../../store/selectors/isInCart';
import ReactDOM from 'react-dom';
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

    const showPopover = () => {
        const popoverRoot = document.createElement('div');
        popoverRoot.id = 'popOverRoot';
        document.body.appendChild(popoverRoot);

        const popover = (
            <div id="popOver" className="popover">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <button type="button" onClick={addToCart}>
                    Ajouter
                </button>
            </div>
        );

        ReactDOM.render(popover, popoverRoot);
    };

    const hidePopover = () => {
        const popoverRoot = document.getElementById('popOverRoot');
        if (popoverRoot) {
            document.body.removeChild(popoverRoot);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'h') {
                hidePopover();
            }
            if (event.key === 's') {
                showPopover();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Empty dependency array ensures the effect is only run once

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
            {isModalOpen && (
                <ProductModal product={product} />
            )}
        </article>
    );
};

export default ProductItem;
