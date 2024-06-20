import { Product } from "../../../../@types/products";
import Modal from "../../ui/Modal"

interface ProductModalProps{
    product : Product;
}

const ProductModal = ({ product }: ProductModalProps) => {
return(
    <div className="productModal">
        <Modal>
                <img src={ product.images[0] } alt={ product.title  } className="productModal-img" />
                <h2>{ product.title }</h2>
                <p>{ product.description }</p>
        </Modal>
    </div>
)
}

export default ProductModal