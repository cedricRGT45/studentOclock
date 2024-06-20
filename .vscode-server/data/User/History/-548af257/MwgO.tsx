import { ReactNode, MouseEvent } from "react";

interface ModalProps {
    children: ReactNode;
    onClose: (e: MouseEvent<HTMLButtonElement>) => void
}

const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <div 
        id="popOver" 
        className="modal"
        popover="auto">
            <div className="modal-content">
                {children}

                <button
                    type="button"
                    className="modal-close"
                    onClick={onClose}
                >
                    X
                </button>
            </div>
        </div>
    )
}

export default Modal;