import { ReactNode, MouseEvent } from "react";

interface ModalProps {
    children: ReactNode;
    onClose: (e: MouseEvent<HTMLButtonElement>) => void
}

const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <div className="modal">
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