import { useEffect, useState } from "react"

import { useFetchAPI } from "../../utils/APIData/useFetchAPI"

import { Card } from "@components/account/card/card"
import { Role, Wizard, Class, Room } from "../../../types/db"

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

    // -------------------------------- Data Fetching State
    const [displayedData, setDisplayedData] = useState<"wizards" | "subjeccts" | "rooms">("wizards")
    const {data, error} = useFetchAPI<Wizard[] | Class[] | Room[]>({route: displayedData, token: roleToken})

    useEffect(() => {
        if (!error) return
        toast.error('Une erreur est survenue', {
            description: 'Impossible de charger les données',
        })
    }, [error])

    // -------------------------------- Modal
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
                {displayedData === "wizards" && data?.map((item: Wizard) => (
                    <div key={item.id}>
                        <Card 
                            wizard={item} 
                            is_staff={userRole ? userRole.is_staff : false} 
                            openModal={openModal} 
                            setOpenModal={setOpenModal} 
                            setEditedData={setEditedData} 
                            setWizardData={setWizardData}
                        />
                    </div>
                ))}
                {displayedData === "subjects" && data?.map((item: Class) => (
                    <div key={item.id}>
                        <Card 
                            classItem={item} 
                            is_staff={userRole ? userRole.is_staff : false} 
                            openModal={openModal} 
                            setOpenModal={setOpenModal} 
                            setEditedData={setEditedData} 
                            setWizardData={setWizardData}
                        />
                    </div>
                ))}
                {displayedData === "rooms" && data?.map((item: Room) => (
                    <div key={item.id}>
                        <Card 
                            room={item} 
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
