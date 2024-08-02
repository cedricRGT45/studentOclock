import { useState, useEffect, ChangeEvent, FormEvent } from "react"
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
    setEditedData: Function
}

import './modalEdit.scss'


export function ModalEdit({openModal, setOpenModal, setWizardData, editedData, setEditedData}: ModalEditProps) {

    // ----------------------------------------------------------------------------------- LocalstorageData
    const [roleToken] = useState(localStorage.getItem('roleToken') || undefined)
    const {data, error, postdata} = usePostAPI()
    const {data: putData, error: putError, putdata} = usePutAPI<Wizard>()

    // ----------------------------------------------------------------------------------- Form Data + Form Action

    const [formData, setFormData ] = useState<FormDataProps>({
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
            return
        }

        setFormData({
            firstname: editedData.firstname,
            lastname: editedData.lastname,
            email: editedData.email,
            password: editedData.password,
            birthdate: editedData.birthdate,
            house_id: editedData.house_id ? editedData.house_id : undefined,
            class_id: editedData.class_id ? editedData.class_id : undefined,
            image: editedData.image,
        })
    }, [editedData])

    /**
     * change data in formData
     * @param e 
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    /**
     * submit form
     * @param e 
     * @returns 
     */
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!formData.house_id || !formData.class_id) {
            return;
        }

        if (!roleToken) {
            return
        }

        if (editedData) {
            putdata(`wizards/${editedData.id}`, formData, roleToken)
            return
        }

        postdata('wizards', formData, roleToken)

    }

    useEffect(() => {
        if (!error && !data) {
            return
        }

        if (error) {
            console.log('Erreur:', error)
            return
        }

        setOpenModal(!openModal)

        setWizardData((prevData: any) => [...prevData, data])

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

        toast.success('Ajout réussi')

        setEditedData(undefined)

    }, [data, error])

    useEffect(() => {
        if (!putError && !putData) {
            return
        }

        if (putError) {
            console.log('Erreur:', putError)
            return
        }

        setOpenModal(!openModal)

        setWizardData((prevData: any) => prevData.map((item: any) => item.id === putData?.id ? putData : item))

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

        toast.success('Modification réussie')

        setEditedData(undefined)
    }, [putData, putError])

    // ----------------------------------------------------------------------------------- Fetch Data

    const { data:houseData, error:houseError } = useFetchAPI<House[]> ({route: 'houses'});
    const { data: classData, error: classError } = useFetchAPI<Class[]> ({route: 'classes'});

    useEffect(() => {
        if (houseError) {
            console.log('Erreur House:', houseError)
        }
    }, [houseError]);

    useEffect(() => {
        if (classError) {
            console.log('Erreur Class:', classError)
        }
    }, [classError]);

    //---------------Avoid body scrolling while modal opened-----------
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

    // ------------------------- Close Modal
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

    return(
        <div className={`modal__backdrop ${openModal ? 'modal__active' : ''}`} onClick={handleBackdropClick}>
            <dialog className={`modal `}>
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
                    value={formData.birthdate.slice(0, 10)}
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
                    value={formData.house_id}
                    onChange={handleChange}
                    required
                >
                    
                    <option value="" >Sélectionnez une maison</option>
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
                    value={formData.class_id}
                    onChange={handleChange}
                    requiredz
                >
                    <option value="">Sélectionnez une classe</option>
                    {classData?.map((item, index) => (
                        <option key={index} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn">Soumettre</button>
            </form>
        </dialog>
        </div>
        
    )
}