import { useEffect, useState } from "react"

import { useFetchAPI } from "../../utils/APIData/useFetchAPI"

import { Card } from "@components/account/card/card"
import { Role, Wizard } from "../../../types/db"

import { AccountNavbar } from "@components/accountNavBAr/AccountNavBar"

import { ModalEdit } from "@components/modalEdit/modalEdit"

import { toast, Toaster } from "sonner"

import './account.scss'


interface AccountProps {
    header: JSX.Element
}

export function Account({header}: AccountProps){

    // -------------------------------- localStorage Data 
    const [roleToken] = useState<string | undefined>(localStorage.getItem('roleToken') || undefined)
    const [userRole] = useState<Role | undefined>(() => {
        const role = localStorage.getItem('role');
        return role ? JSON.parse(role) : undefined;
      });
    const {data, error} = useFetchAPI<Wizard[]>({route: 'wizards', token: roleToken})

    useEffect(() => {
        if (!error) return
        toast.error('Une erreur est survenue', {
            description: 'Impossible de charger les données',
        })
    }, [error])

    // -------------------------------- Data
    const [wizardsData, setWizardData] = useState<Wizard[] | undefined>(undefined)
    useEffect(() => {
        setWizardData(data)
    }, [data])

    // -------------------------------- Modal
    const [displayedData, setDisplayedData] = useState<"wizards" | "classes" | "rooms">("wizards")

    const [openModal, setOpenModal] = useState(false)
    
    // -------------------------------- Edit Data
    const [editedData, setEditedData] = useState<Wizard | undefined>(undefined)

    return (
    <>
        {header}
        <AccountNavbar displayedData={displayedData} setDisplayedData={setDisplayedData} />
        <div className="account">
            {userRole?.is_staff && (
                <button onClick={() => {
                setOpenModal(!openModal);
                setEditedData(undefined)
            }} className="btn account__btn">
                Ajouter
            </button>
            )}
            <div className="account__cards">
                {wizardsData?.map((wizard: Wizard) => (
                    <div key={wizard.id}>
                        <Card 
                            wizard={wizard} 
                            is_staff={userRole ? userRole.is_staff : false} 
                            openModal={openModal} 
                            setOpenModal={setOpenModal} 
                            setEditedData={setEditedData} 
                            setWizardData={setWizardData}
                        />
                    </div>
                ))}
            </div>
            <ModalEdit 
                openModal={openModal} 
                setOpenModal={setOpenModal} 
                setWizardData={setWizardData} 
                editedData={editedData}
                setEditedData={setEditedData}
            />
        </div>
        <Toaster richColors />
    </>
    )
}