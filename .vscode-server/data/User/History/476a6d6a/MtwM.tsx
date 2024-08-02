import { useEffect, useState } from "react";
import { useFetchAPI } from "../../utils/APIData/useFetchAPI";
import { Card } from "@components/account/card/card";
import { Role, Wizard, Class, Room } from "../../../types/db";
import { AccountNavbar } from "@components/accountNavBAr/AccountNavBar";
import { ModalEdit } from "@components/modalEdit/modalEdit";
import { toast, Toaster } from "sonner";
import './account.scss';

interface AccountProps {
    header: JSX.Element;
}

export function Account({ header }: AccountProps) {
    const [roleToken] = useState<string | undefined>(localStorage.getItem('roleToken') || undefined);
    const [userRole] = useState<Role | undefined>(() => {
        const role = localStorage.getItem('role');
        return role ? JSON.parse(role) : undefined;
    });

    const [displayedData, setDisplayedData] = useState<"wizards" | "subjects" | "rooms">("wizards");
    const [wizardsData, setWizardsData] = useState<Wizard[] | undefined>(undefined);
    const [subjectsData, setSubjectsData] = useState<Class[] | undefined>(undefined);
    const [roomsData, setRoomsData] = useState<Room[] | undefined>(undefined);

    const { data: wizards, error: wizardsError } = useFetchAPI<Wizard[]>({ route: 'wizards', token: roleToken });
    const { data: subjects, error: subjectsError } = useFetchAPI<Class[]>({ route: 'subjects', token: roleToken });
    const { data: rooms, error: roomsError } = useFetchAPI<Room[]>({ route: 'rooms', token: roleToken });

    useEffect(() => {
        if (wizardsError || subjectsError || roomsError) {
            toast.error('Une erreur est survenue', {
                description: 'Impossible de charger les données',
            });
        }
    }, [wizardsError, subjectsError, roomsError]);

    useEffect(() => {
        setWizardsData(wizards);
    }, [wizards]);

    useEffect(() => {
        setSubjectsData(subjects);
    }, [subjects]);

    useEffect(() => {
        setRoomsData(rooms);
    }, [rooms]);

    const [openModal, setOpenModal] = useState(false);
    const [editedData, setEditedData] = useState<Wizard | Class | Room | undefined>(undefined);

    return (
        <>
            {header}
            <AccountNavbar displayedData={displayedData} setDisplayedData={setDisplayedData} />
            <div className="account">
                {userRole?.is_staff && displayedData === "wizards" && ( 
                    <button onClick={() => {
                        setOpenModal(!openModal);
                        setEditedData(undefined);
                    }} className="btn account__btn">
                        Ajouter
                    </button>
                )}
                <div className="account__cards">
                    {displayedData === "wizards" && wizardsData?.map((wizard: Wizard) => (
                        <div key={wizard.id}>
                            <Card
                                data={wizard}
                                dataType="wizard"
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
                                data={classItem}
                                dataType="class"
                                is_staff={userRole ? userRole.is_staff : false}
                                openModal={openModal}
                                setOpenModal={setOpenModal}
                                setEditedData={setEditedData}
                                setClassData={setSubjectsData} 
                            />
                        </div>
                    ))}
                    {displayedData === "rooms" && roomsData?.map((room: Room) => (
                        <div key={room.id}>
                            <Card
                                data={room}
                                dataType="room"
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
                    setClassData={setSubjectsData}
                    setRoomData={setRoomsData}
                    editedData={editedData}
                    setEditedData={setEditedData}
                />
            </div>
            <Toaster />
        </>
    );
}
