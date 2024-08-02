import { Wizard, Class, Room } from '../../../../types/db'
import { PencilLine, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDeleteAPI } from '../../../utils/APIData/useDeleteAPI';
import { toast } from 'sonner';
import './card.scss'

interface CardProps {
    data: Wizard | Class | Room
    dataType: "wizard" | "class" | "room"
    is_staff: boolean
    openModal: boolean
    setOpenModal: Function
    setEditedData: Function
    setWizardData?: Function
    setClassData?: Function
    setRoomData?: Function
}

export function Card({ data, dataType, is_staff, openModal, setOpenModal, setEditedData }: CardProps) {

    function handleClick() {
        setEditedData(data)
        setOpenModal(!openModal)
    }

    const [actualUser] = useState(localStorage.getItem('wizard') || undefined)
    const [isUser, setIsUser] = useState(false)

    useEffect(() => {
        if (actualUser && dataType === "wizard") {
            const user = JSON.parse(actualUser)
            if (user.id == (data as Wizard).id) {
                setIsUser(true)
            }
        }
    }, [actualUser, data, dataType])

    // ---------------------------------- Delete Modal
    const [deleteModal, setDeleteModal] = useState(false)

    const [roleToken] = useState(localStorage.getItem('roleToken') || undefined)
    const {deletedata} = useDeleteAPI()

    function handleDelete(id: number) {
        if (dataType === "wizard") {
            deletedata(`wizards/${id}`, roleToken)
            setWizardData && setWizardData((prev: Wizard[]) => prev.filter(wizard => wizard.id !== id))
        } else if (dataType === "class") {
            deletedata(`classes/${id}`, roleToken)
            setClassData && setClassData((prev: Class[]) => prev.filter(classItem => classItem.id !== id))
        } else if (dataType === "room") {
            deletedata(`rooms/${id}`, roleToken)
            setRoomData && setRoomData((prev: Room[]) => prev.filter(room => room.id !== id))
        }
        setDeleteModal(false)
        toast.success('L\'élément a bien été supprimé')
    }

    if (!data) {
        return null; // Or render a placeholder
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
