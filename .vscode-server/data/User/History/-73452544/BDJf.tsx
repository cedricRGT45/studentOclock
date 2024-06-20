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
            popover="auto">
               <div className="modal-content">
                    { children }
                    <button
                        className="modal-closed" 
                        popovertarget="popOver" 
                        popovertargetaction="hide">X
                        </button> 
               </div>
        </div>
    </>
)
}

export default Modal;