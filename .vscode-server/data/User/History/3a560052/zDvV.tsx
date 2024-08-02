import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useFetchAPI } from "../../utils/APIData/useFetchAPI";
import { usePostAPI } from "../../utils/APIData/usePostAPI";
import { usePutAPI } from "../../utils/APIData/usePutAPI";
import { toast } from "sonner";
import { X } from "lucide-react";
import './modalEdit.scss';
import { Class, Wizard, House, Room } from "../../../types/db";

interface FormDataProps {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    birthdate: string;
    house_id?: number; // Optional for Wizard and Subject
    class_id?: number; // Optional for Wizard and Subject
    image: string;
    name?: string; // Optional for Room and Subject
    description?: string; // Optional for Subject
    capacity?: number; // Optional for Room
}

interface ModalEditProps {
    openModal: boolean;
    setOpenModal: Function;
    setWizardData?: Function;
    setClassData?: Function;
    setRoomData?: Function;
    editedData: Wizard | Class | Room | undefined;
    setEditedData: Function;
    displayedData: "wizards" | "subjects" | "rooms";
}

export function ModalEdit({
    openModal,
    setOpenModal,
    setWizardData,
    setClassData,
    setRoomData,
    editedData,
    setEditedData,
    displayedData
}: ModalEditProps) {

    const [roleToken] = useState(localStorage.getItem('roleToken') || undefined);
    const { data, error, postdata } = usePostAPI();
    const { data: putData, error: putError, putdata } = usePutAPI<Wizard | Class | Room>();

    const [formData, setFormData] = useState<FormDataProps>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        birthdate: '',
        image: 'https://picsum.photos/150/150',
    });

    useEffect(() => {
        if (!editedData) {
            return;
        }

        // Initialize form data based on the type of data being edited
        switch (displayedData) {
            case "wizards":
                const wizardData = editedData as Wizard;
                setFormData({
                    firstname: wizardData.firstname,
                    lastname: wizardData.lastname,
                    email: wizardData.email,
                    password: wizardData.password,
                    birthdate: wizardData.birthdate,
                    house_id: wizardData.house_id,
                    class_id: wizardData.class_id,
                    image: wizardData.image,
                });
                break;
            case "subjects":
                const classData = editedData as Class;
                setFormData({
                    name: classData.name,
                    description: classData.description,
                    image: classData.image,
                });
                break;
            case "rooms":
                const roomData = editedData as Room;
                setFormData({
                    name: roomData.name,
                    capacity: roomData.capacity,
                    image: roomData.image,
                });
                break;
            default:
                break;
        }
    }, [editedData, displayedData]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!roleToken) {
            return;
        }

        if (editedData) {
            putdata(`${displayedData}/${editedData.id}`, formData, roleToken);
        } else {
            postdata(displayedData, formData, roleToken);
        }
    };

    useEffect(() => {
        if (!error && !data) {
            return;
        }

        if (error) {
            console.log('Erreur:', error);
            return;
        }

        setOpenModal(false);

        switch (displayedData) {
            case "wizards":
                if (setWizardData) {
                    setWizardData((prevData: Wizard[] | undefined) =>
                        prevData ? [...prevData, data as Wizard] : [data as Wizard]
                    );
                }
                break;
            case "subjects":
                if (setClassData) {
                    setClassData((prevData: Class[] | undefined) =>
                        prevData ? [...prevData, data as Class] : [data as Class]
                    );
                }
                break;
            case "rooms":
                if (setRoomData) {
                    setRoomData((prevData: Room[] | undefined) =>
                        prevData ? [...prevData, data as Room] : [data as Room]
                    );
                }
                break;
            default:
                break;
        }

        toast.success('Ajout réussi');

        setEditedData(undefined);

        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            birthdate: '',
            house_id: undefined,
            class_id: undefined,
            name: '',
            description: '',
            capacity: undefined,
            image: 'https://picsum.photos/150/150',
        });

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

        switch (displayedData) {
            case "wizards":
                if (setWizardData) {
                    setWizardData((prevData: Wizard[] | undefined) =>
                        prevData ? prevData.map((item: Wizard) => item.id === putData.id ? putData as Wizard : item) : []
                    );
                }
                break;
            case "subjects":
                if (setClassData) {
                    setClassData((prevData: Class[] | undefined) =>
                        prevData ? prevData.map((item: Class) => item.id === putData.id ? putData as Class : item) : []
                    );
                }
                break;
            case "rooms":
                if (setRoomData) {
                    setRoomData((prevData: Room[] | undefined) =>
                        prevData ? prevData.map((item: Room) => item.id === putData.id ? putData as Room : item) : []
                    );
                }
                break;
            default:
                break;
        }

        toast.success('Modification réussie');

        setEditedData(undefined);

        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            birthdate: '',
            house_id: undefined,
            class_id: undefined,
            name: '',
            description: '',
            capacity: undefined,
            image: 'https://picsum.photos/150/150',
        });

    }, [putData, putError]);

    useEffect(() => {
        if (openModal) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [openModal]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setOpenModal(false);
        }
    };

    function handleCloseModal() {
        setOpenModal(false);
        setEditedData(undefined);
        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            birthdate: '',
            house_id: undefined,
            class_id: undefined,
            name: '',
            description: '',
            capacity: undefined,
            image: 'https://picsum.photos/150/150',
        });
    }

    return (
        <div className={`modal__backdrop ${openModal ? 'modal__active' : ''}`} onClick={handleBackdropClick}>
            <dialog className={`modal `}>
                <button>
                    <X size={20} className="modal__close" onClick={handleCloseModal} />
                </button>
                <form onSubmit={handleSubmit} className="modal__form">
                    {displayedData === "wizards" && (
                        <>
                            <div className="modal__input">
                                <label htmlFor="firstname">Prénom</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                            </div>
                            <div className="modal__input">
                                <label htmlFor="lastname">Nom</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                            </div>
                            <div className="modal__input">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                            </div>
                            {!editedData && (
                                <div className="modal__input">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder=" "
                                        required
                                    />
                                </div>
                            )}
                            <div className="modal__input">
                                <label htmlFor="birthdate">Date de naissance</label>
                                <input
                                    type="date"
                                    id="birthdate"
                                    name="birthdate"
                                    value={formData.birthdate}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                            </div>
                            <div className="modal__input">
                                <label htmlFor="house_id">Maison</label>
                                <select
                                    id="house_id"
                                    name="house_id"
                                    value={formData.house_id || ''}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez une maison</option>
                                    {houseData?.map((house, index) => (
                                        <option key={index} value={house.id}>
                                            {house.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="modal__input">
                                <label htmlFor="class_id">Classe</label>
                                <select
                                    id="class_id"
                                    name="class_id"
                                    value={formData.class_id || ''}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez une classe</option>
                                    {classData?.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}
                    {displayedData === "subjects" && (
                        <>
                            <div className="modal__input">
                                <label htmlFor="name">Nom</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                            </div>
                            <div className="modal__input">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                            </div>
                        </>
                    )}
                    {displayedData === "rooms" && (
                        <>
                            <div className="modal__input">
                                <label htmlFor="name">Nom</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                            </div>
                            <div className="modal__input">
                                <label htmlFor="capacity">Capacité</label>
                                <input
                                    type="number"
                                    id="capacity"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                            </div>
                        </>
                    )}
                    <button type="submit" className="btn">Soumettre</button>
                </form>
            </dialog>
        </div>
    );
}
