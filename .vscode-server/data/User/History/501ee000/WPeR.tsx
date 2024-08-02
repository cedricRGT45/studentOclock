import React from 'react';
import { PencilLine, Trash } from 'lucide-react';
import './card.scss';

interface CardProps {
    data: Wizard | Class | Room;
    dataType: "wizard" | "class" | "room";
    is_staff: boolean;
    openModal: boolean;
    setOpenModal: Function;
    setEditedData: Function;
}

export function Card({ data, dataType, is_staff, openModal, setOpenModal, setEditedData }: CardProps) {

    function handleClick() {
        setEditedData(data);
        setOpenModal(true);
    }


    return (
        <div className="card_account_container">
            {is_staff && <PencilLine className="card_account_container_edit" onClick={handleClick} />}
            {/* Optionally, add a condition to show delete button */}
            {/* {is_staff && !(dataType === "wizard" && isUser) && <Trash className="card_account_container_delete" onClick={() => setDeleteModal(!deleteModal)} />} */}
            <div className="card_account_container_img">
                <img src="https://picsum.photos/150/150" alt={dataType} />
            </div>
            <div className="card_account_container_info">
                {/* Display data based on dataType */}
            </div>
            {/* Your existing delete modal */}
        </div>
    );
}
