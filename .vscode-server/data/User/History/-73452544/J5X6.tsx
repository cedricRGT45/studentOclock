import { ReactNode} from "react";

interface ModalProps {
    children:ReactNode;
}

const Modal = ({ children } : ModalProps) =>{
return(
    <>
        <div 
            id="popOver"
            className="modal"
            pop>

        </div>
    </>
)
}

export default Modal;