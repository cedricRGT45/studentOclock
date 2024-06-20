import { Product } from "../../../../@types/products";
import Modal from "../../ui/Modal"

interface ProductModalProps{
    product : Product;
}

const ProductModal = ({ product }: ProductModalProps) => {
return(
    <div className="productModal">
        <Modal>
                <img className="productModal-img" src={ product.images[0] } alt={ product.title  } />
                <h2 className="productModal-title" >{ product.title }</h2>
                <p className="productModal-content" >{ product.description }</p>
        </Modal>
    </div>
)
}

export default ProductModal