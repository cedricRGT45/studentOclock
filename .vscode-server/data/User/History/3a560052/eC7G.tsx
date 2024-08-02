import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useFetchAPI } from "../../utils/APIData/useFetchAPI";
import { usePostAPI } from "../../utils/APIData/usePostAPI";
import { usePutAPI } from "../../utils/APIData/usePutAPI";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Class, Wizard, House, Room } from "../../../types/db";
import './modalEdit.scss';

interface FormDataProps {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    birthdate: string;
    house_id: number | undefined;
    class_id: number | undefined;
    image: string;
}

interface ModalEditProps {
    openModal: boolean;
    setOpenModal: Function;
    setWizardData: Function;
    setClassData: Function;
    setRoomData: Function;
    editedData: Wizard | Class | Room | undefined;
    setEditedData: Function;
    dataType: "wizard" | "class" | "room";
}

export function ModalEdit({ openModal, setOpenModal, setWizardData, setClassData, setRoomData, editedData, setEditedData, dataType }: ModalEditProps) {

    const [roleToken] = useState(localStorage.getItem('roleToken') || undefined);
    const { data, error, postdata } = usePostAPI();
    const { data: putData, error: putError, putdata } = usePutAPI<Wizard | Class | Room>();

    const [formData, setFormData] = useState<FormDataProps>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        birthdate: '',
        house_id: 0,
        class_id: 0,
        image: 'https://picsum.photos/150/150',
    });

    useEffect(() => {
        if (editedData) {
            // Mettre à jour formData en fonction du type de données (dataType)
            if (dataType === "wizard") {
                const editedWizard = editedData as Wizard;
                setFormData({
                    firstname: editedWizard.firstname,
                    lastname: editedWizard.lastname,
                    email: editedWizard.email,
                    password: editedWizard.password,
                    birthdate: editedWizard.birthdate,
                    house_id: editedWizard.house_id ?? 0,
                    class_id: editedWizard.class_id ?? 0,
                    image: editedWizard.image,
                });
            } else if (dataType === "class") {
                const editedClass = editedData as Class;
                setFormData({
                    firstname: '', // Remplacer par les champs appropriés pour les classes
                    lastname: '',
                    email: '',
                    password: '',
                    birthdate: '',
                    house_id: 0,
                    class_id: 0,
                    image: 'https://picsum.photos/150/150',
                });
            } else if (dataType === "room") {
                const editedRoom = editedData as Room;
                setFormData({
                    firstname: '', // Remplacer par les champs appropriés pour les rooms
                    lastname: '',
                    email: '',
                    password: '',
                    birthdate: '',
                    house_id: 0,
                    class_id: 0,
                    image: 'https://picsum.photos/150/150',
                });
            }
        } else {
            // Réinitialiser formData si editedData devient undefined
            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                birthdate: '',
                house_id: 0,
                class_id: 0,
                image: 'https://picsum.photos/150/150',
            });
        }
    }, [editedData, dataType]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!formData.house_id || !formData.class_id) {
            return;
        }

        if (!roleToken) {
            return;
        }

        // Effectuer une requête API PUT pour mettre à jour les données en fonction du type de données (dataType)
        if (editedData) {
            if (dataType === "wizard") {
                putdata(`wizards/${editedData.id}`, formData, roleToken);
            } else if (dataType === "class") {
                putdata(`classes/${editedData.id}`, formData, roleToken);
            } else if (dataType === "room") {
                putdata(`rooms/${editedData.id}`, formData, roleToken);
            }
            return;
        }

        // Effectuer une requête API POST pour ajouter de nouvelles données en fonction du type de données (dataType)
        if (dataType === "wizard") {
            postdata('wizards', formData, roleToken);
        } else if (dataType === "class") {
            postdata('classes', formData, roleToken);
        } else if (dataType === "room") {
            postdata('rooms', formData, roleToken);
        }
    };

    function handleCloseModal() {
        setOpenModal(!openModal)
        setEditedData(undefined)
        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            birthdate: '',
            house_id: 0,
            class_id: 0,
            image: 'https://picsum.photos/150/150',
        })
    }

    useEffect(() => {
        if (!error && !data) {
            return;
        }

        if (error) {
            console.log('Erreur:', error);
            return;
        }

        setOpenModal(false);

        // Mettre à jour les données affichées en fonction du type de données (dataType)
        if (dataType === "wizard") {
            setWizardData((prevData: any) => [...prevData, data]);
        } else if (dataType === "class") {
            setClassData((prevData: any) => [...prevData, data]);
        } else if (dataType === "room") {
            setRoomData((prevData: any) => [...prevData, data]);
        }

        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            birthdate: '',
            house_id: 0,
            class_id: 0,
            image: 'https://picsum.photos/150/150',
        });

        toast.success('Ajout réussi');

        setEditedData(undefined);

    }, [data, error]);

    useEffect(() => {
        if (!putError && !putData) {
            return;
        }

        if (putError) {
            console.log('Erreur:', putError);
            return;
        }

        setOpenModal(false);

        // Mettre à jour les données affichées en fonction du type de données (dataType)
        if (dataType === "wizard") {
            setWizardData((prevData: any) => prevData.map((item: any) => item.id === putData?.id ? putData : item));
        } else if (dataType === "class") {
            setClassData((prevData: any) => prevData.map((item: any) => item.id === putData?.id ? putData : item));
        } else if (dataType === "room") {
            setRoomData((prevData: any) => prevData.map((item: any) => item.id === putData?.id ? putData : item));
        }

        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            birthdate: '',
            house_id: 0,
            class_id: 0,
            image: 'https://picsum.photos/150/150',
        });

        toast.success('Modification réussie');

        setEditedData(undefined);
    }, [putData, putError]);

    // Effectuer des requêtes API GET pour récupérer les données nécessaires en fonction du type de données (dataType)
    const { data: houseData, error: houseError } = useFetchAPI<House[]>({ route: 'houses' });
    const { data: classData, error: classError } = useFetchAPI<Class[]>({ route: 'classes' });
    const { data: roomData, error: roomError } = useFetchAPI<Room[]>({ route: 'rooms' });

    useEffect(() => {
        if (houseError) {
            console.log('Erreur House:', houseError);
        }
    }, [houseError]);

    useEffect(() => {
        if (classError) {
            console.log('Erreur Class:', classError);
        }
    }, [classError]);

    useEffect(() => {
        if (roomError) {
            console.log('Erreur Room:', roomError);
        }
    }, [roomError]);

    return (
        <div className={`modal__backdrop ${openModal ? 'modal__active' : ''}`} onClick={handleBackdropClick}>
            <dialog className={`modal`}>
                <button>
                    <X size={20} className="modal__close" onClick={handleCloseModal} />
                </button>
                <form onSubmit={handleSubmit} className="modal__form">
                    {/* Formulaires pour les différents types de données (wizard, class, room) */}
                </form>
            </dialog>
        </div>
    );
}
