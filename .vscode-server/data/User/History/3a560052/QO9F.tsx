import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useFetchAPI } from "../../utils/APIData/useFetchAPI";
import { usePostAPI } from "../../utils/APIData/usePostAPI";
import { usePutAPI } from "../../utils/APIData/usePutAPI";
import { toast } from "sonner";
import { X } from "lucide-react";
import './modalEdit.scss';
import { Class, Wizard, House } from "../../../types/db";

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
    editedData: Wizard | undefined;
    setEditedData: Function;
}

export function ModalEdit({ openModal, setOpenModal, setWizardData, editedData, setEditedData }: ModalEditProps) {

    // LocalstorageData
    const [roleToken] = useState(localStorage.getItem('roleToken') || undefined);
    const { data: houseData, error: houseError } = useFetchAPI<House[]>({ route: 'houses' });
    const { data: classData, error: classError } = useFetchAPI<Class[]>({ route: 'classes' });
    const { data, error, postdata } = usePostAPI();
    const { data: putData, error: putError, putdata } = usePutAPI<Wizard>();

    // Form Data + Form Action
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
        if (!editedData) {
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
            return;
        }

        setFormData({
            firstname: editedData.firstname,
            lastname: editedData.lastname,
            email: editedData.email,
            password: '', // Assuming you do not display password in edit mode
            birthdate: editedData.birthdate,
            house_id: editedData.house_id,
            class_id: editedData.class_id,
            image: editedData.image,
        });

    }, [editedData]);

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

        if (editedData) {
            putdata(`wizards/${editedData.id}`, formData, roleToken);
            return;
        }

        postdata('wizards', formData, roleToken);
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

        setWizardData((prevData: Wizard[]) => [...prevData, data]);

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

        setWizardData((prevData: Wizard[]) => prevData.map((item: Wizard) => item.id === putData?.id ? putData : item));

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

    // Avoid body scrolling while modal opened
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

    // Close Modal
    function handleCloseModal() {
        setOpenModal(false);
        setEditedData(undefined);
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
                            value={formData.house_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Sélectionnez une maison</option>
                            {houseData?.map((house: House) => (
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
                            value={formData.class_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Sélectionnez une classe</option>
                            {classData?.map((classItem: Class) => (
                                <option key={classItem.id} value={classItem.id}>
                                    {classItem.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn">Soumettre</button>
                </form>
            </dialog>
        </div>
    );
}
