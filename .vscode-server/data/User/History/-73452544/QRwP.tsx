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
            popover="manual">
               <div className="modal-content">
                { children }
               </div>
               <button 
               </div>
        </div>
    </>
)
}

export default Modal;