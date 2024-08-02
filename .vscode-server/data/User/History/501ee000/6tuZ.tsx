import { Wizard } from '../../../../types/db'
import { PencilLine, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDeleteAPI } from '../../../utils/APIData/useDeleteAPI';
import { toast } from 'sonner';
import './card.scss'

interface CardProps {
    wizard: Wizard
    is_staff: boolean
    openModal: boolean
    setOpenModal: Function
    setEditedData: Function
    setWizardData: Function
}

export function Card({wizard, is_staff, openModal, setOpenModal, setEditedData, setWizardData}: CardProps) {

    function handleClick() {
        setEditedData(wizard)
        setOpenModal(!openModal)
    }

    const [actualUser] = useState(localStorage.getItem('wizard') || undefined)

    const [isUser, setIsUser] = useState(false)

    useEffect(() => {
        if (actualUser) {
            const user = JSON.parse(actualUser)
            if (user.id == wizard.id) {
                setIsUser(true)
            }
        }
    }, [actualUser])

    // ---------------------------------- Delete Modal
    const [deleteModal, setDeleteModal] = useState(false)

    const [roleToken] = useState(localStorage.getItem('roleToken') || undefined)
    const {deletedata} = useDeleteAPI()

    function handleDelete(id: number) {
        deletedata(`wizards/${id}`, roleToken) 
        setWizardData((prev: Wizard[]) => prev.filter(wizard => wizard.id !== id))
        setDeleteModal(false)
        toast.success('Le sorcier a bien été supprimé')
    }

    return (
        <div className="card_account_container">
            {is_staff && <PencilLine className="card_account_container_edit" onClick={handleClick} />}
            {is_staff && !isUser && <Trash className="card_account_container_delete" onClick={() => setDeleteModal(!deleteModal)} />}
            <div className="card_account_container_img">
                <img src="https://picsum.photos/150/150" alt="sorcier" />
            </div>
            <div className="card_account_container_info">
                <p className="card_account_container_info_name">{wizard.firstname + ' ' + wizard.lastname}</p>
                <div className="card_account_container_info_role">
                    <p className="card_account_container_info_role_title">
                        roles
                    </p>
                    <p className="card_account_container_info_role_item">
                        {wizard.roles?.map(role => role.name).join(', ')}
                    </p>
                </div>
            </div>

            <div className={`card_dialog ${deleteModal ? 'delete_active' : ''}`}>
                <div className="card_dialog_wrapper">
                    <p>Êtes-vous sûr de supprimer {wizard.firstname + ' ' + wizard.lastname} ?</p>
                    <div className="card_dialog_wrapper_button">
                        <button onClick={() => setDeleteModal(false)}>
                            Retour
                        </button>
                        <button className="button_remove" onClick={() => handleDelete(wizard.id)}>
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}