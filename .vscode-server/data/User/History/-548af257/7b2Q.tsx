import { ReactNode, MouseEvent } from "react";

interface ModalProps {
    children: ReactNode;
    onClose: (e: MouseEvent<HTMLButtonElement>) => void
}

const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <div 
        id="popOver" 
        popover="auto">
        className="modal"
            <div className="modal-content">
                {children}

                <button
                    type="button"
                    className="modal-close"
                    onClick={onClose}
                    popovertarget="popOver" 
                    popovertargetaction="hide"
                >
                    X
                </button>
            </div>
        </div>
    )
}

export default Modal;