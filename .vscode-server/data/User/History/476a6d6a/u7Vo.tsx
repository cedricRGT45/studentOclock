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

export function Account({ header }: AccountProps) {
    // -------------------------------- localStorage Data 
    const [roleToken] = useState<string | undefined>(localStorage.getItem('roleToken') || undefined)
    const [userRole] = useState<Role | undefined>(() => {
        const role = localStorage.getItem('role');
        return role ? JSON.parse(role) : undefined;
    });

    // -------------------------------- Data Fetching State
    const [displayedData, setDisplayedData] = useState<"wizards" | "subjects" | "rooms">("wizards")
    
    const { data, error } = useFetchAPI<Wizard[] | Class[] | Room[]>({ route: displayedData, token: roleToken })

    useEffect(() => {
        if (!error) return
        toast.error('Une erreur est survenue', {
            description: 'Impossible de charger les données',
        })
    }, [error])

    // -------------------------------- Data State
    const [wizardsData, setWizardsData] = useState<Wizard[] | undefined>(undefined)
    const [subjectsData, setsubjectsData] = useState<Class[] | undefined>(undefined)
    const [roomsData, setRoomsData] = useState<Room[] | undefined>(undefined)

    useEffect(() => {
        if (displayedData === 'wizards') setWizardsData(data as Wizard[])
        else if (displayedData === 'subjects') setsubjectsData(data as Class[])
        else if (displayedData === 'rooms') setRoomsData(data as Room[])
    }, [data, displayedData])

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
                {displayedData === "wizards" && wizardsData?.map((wizard: Wizard) => (
                    <div key={wizard.id}>
                        <Card 
                            wizard={wizard} 
                            is_staff={userRole ? userRole.is_staff : false} 
                            openModal={openModal} 
                            setOpenModal={setOpenModal} 
                            setEditedData={setEditedData} 
                            setWizardData={setWizardsData}
                        />
                    </div>
                ))}
                {displayedData === "subjects" && subjectsData?.map((classItem: Class) => (
                    <div key={classItem.id}>
                        <Card 
                            classItem={classItem} 
                            is_staff={userRole ? userRole.is_staff : false} 
                            openModal={openModal} 
                            setOpenModal={setOpenModal} 
                            setEditedData={setEditedData} 
                            setClassData={setClassesData}
                        />
                    </div>
                ))}
                {displayedData === "rooms" && roomsData?.map((room: Room) => (
                    <div key={room.id}>
                        <Card 
                            room={room} 
                            is_staff={userRole ? userRole.is_staff : false} 
                            openModal={openModal} 
                            setOpenModal={setOpenModal} 
                            setEditedData={setEditedData} 
                            setRoomData={setRoomsData}
                        />
                    </div>
                ))}
            </div>
            <ModalEdit 
                openModal={openModal} 
                setOpenModal={setOpenModal} 
                setWizardData={setWizardsData} 
                editedData={editedData}
                setEditedData={setEditedData}
            />
        </div>
        <Toaster richColors />
    </>
    )
}
