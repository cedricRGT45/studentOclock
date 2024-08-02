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
    house_id: number | undefined;
    class_id: number | undefined;
    image: string;
    capacity?: number; // Ajout de la capacité pour Room
    description?: string; // Ajout de la description pour Class/Wizard
}

interface ModalEditProps {
    openModal: boolean;
    setOpenModal: Function;
    setWizardData: Function;
    setClassData?: Function; // Nouveau pour gérer les matières
    setRoomData?: Function; // Nouveau pour gérer les salles
    editedData: Wizard | Class | Room | undefined;
    setEditedData: Function;
}

export function ModalEdit({openModal, setOpenModal, setWizardData, setClassData, setRoomData, editedData, setEditedData}: ModalEditProps) {
    const [roleToken] = useState(localStorage.getItem('roleToken') || undefined);
    const { data: houseData, error: houseError } = useFetchAPI<House[]>({ route: 'houses' });
    const { data: classData, error: classError } = useFetchAPI<Class[]>({ route: 'classes' });

    const { data, error, postdata } = usePostAPI();
    const { data: putData, error: putError, putdata } = usePutAPI<Wizard | Class | Room>();

    const [formData, setFormData] = useState<FormDataProps>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        birthdate: '',
        house_id: undefined,
        class_id: undefined,
        image: 'https://picsum.photos/150/150',
    });

    useEffect(() => {
        if (!editedData) return;

        setFormData({
            firstname: editedData.firstname || '',
            lastname: editedData.lastname || '',
            email: editedData.email || '',
            password: editedData.password || '',
            birthdate: editedData.birthdate || '',
            house_id: editedData.house_id || undefined,
            class_id: editedData.class_id || undefined,
            image: editedData.image || 'https://picsum.photos/150/150',
            capacity: (editedData as Room)?.capacity, // Ajout pour Room
            description: (editedData as Class | Wizard)?.description, // Ajout pour Class/Wizard
        });
    }, [editedData]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

        if (editedData) {
            const apiRoute = getApiRouteByDataType(editedData); // Fonction pour obtenir le chemin API en fonction du type
            putdata(`${apiRoute}/${editedData.id}`, formData, roleToken);
        } else {
            const apiRoute = getApiRouteByDataType(formData); // Fonction pour obtenir le chemin API en fonction du type
            postdata(apiRoute, formData, roleToken);
        }
    };

    useEffect(() => {
        if (!error && !data) return;

        if (error) {
            console.log('Erreur:', error);
            return;
        }

        setOpenModal(false);

        switch (editedData?.__typename) {
            case 'Wizard':
                setWizardData((prevData: Wizard[]) => [...prevData, data]);
                break;
            case 'Class':
                setClassData && setClassData((prevData: Class[]) => [...prevData, data]);
                break;
            case 'Room':
                setRoomData && setRoomData((prevData: Room[]) => [...prevData, data]);
                break;
            default:
                break;
        }

        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            birthdate: '',
            house_id: undefined,
            class_id: undefined,
            image: 'https://picsum.photos/150/150',
        });

        toast.success('Ajout réussi');
        setEditedData(undefined);
    }, [data, error]);

    useEffect(() => {
        if (!putError && !putData) return;

        if (putError) {
            console.log('Erreur:', putError);
            return;
        }

        setOpenModal(false);

        switch (putData.__typename) {
            case 'Wizard':
                setWizardData((prevData: Wizard[]) =>
                    prevData.map((item: Wizard) => (item.id === putData.id ? putData : item))
                );
                break;
            case 'Class':
                setClassData && setClassData((prevData: Class[]) =>
                    prevData.map((item: Class) => (item.id === putData.id ? putData : item))
                );
                break;
            case 'Room':
                setRoomData && setRoomData((prevData: Room[]) =>
                    prevData.map((item: Room) => (item.id === putData.id ? putData : item))
                );
                break;
            default:
                break;
        }

        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            birthdate: '',
            house_id: undefined,
            class_id: undefined,
            image: 'https://picsum.photos/150/150',
        });

        toast.success('Modification réussie');
        setEditedData(undefined);
    }, [putData, putError]);

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
            image: 'https://picsum.photos/150/150',
        });
    }

    const getApiRouteByDataType = (data: Wizard | Class | Room | FormDataProps): string => {
        if ('firstname' in data) return 'wizards';
        if ('description' in data) return 'subjects';
        if ('capacity' in data) return 'rooms';
        return '';
    };

    return (
        <div className={`modal__backdrop ${openModal ? 'modal__active' : ''}`} onClick={handleBackdropClick}>
            <dialog className="modal">
                <button>
                    <X size={20} className="modal__close" onClick={handleCloseModal} />
                </button>
                <form onSubmit={handleSubmit} className="modal__form">
                    <div className="modal__input">
                        <label htmlFor="firstname">Prénom</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
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
                            {houseData?.map((house) => (
                                <option key={house.id} value={house.id}>
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
                            {classData?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {formData.capacity !== undefined && (
                        <div className="modal__input">
                            <label htmlFor="capacity">Capacité</label>
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    {formData.description !== undefined && (
                        <div className="modal__input">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <button type="submit" className="btn">Soumettre</button>
                </form>
            </dialog>
        </div>
    );
}
