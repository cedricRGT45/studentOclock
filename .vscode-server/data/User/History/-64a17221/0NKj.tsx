import { Product } from "../../../../@types/products";
import Modal from "../../ui/Modal"

interface ProductModalProps{
    product : Product;
}

const ProductModal = ({ product }: ProductModalProps) => {
return(
        <Modal>
            <>
                <h2>{ product.title }</h2>
                <p>{ product.description }</p>
            </>
        </Modal>
)
}

export default ProductModal