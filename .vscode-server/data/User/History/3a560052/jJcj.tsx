import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useFetchAPI } from "../../utils/APIData/useFetchAPI";
import { usePostAPI } from "../../utils/APIData/usePostAPI";
import { usePutAPI } from "../../utils/APIData/usePutAPI";
import { toast } from "sonner";
import { X } from "lucide-react";
import './modalEdit.scss';
import { Class, Wizard, House, Room, Subject } from "../../../types/db";

interface FormDataProps {
    [key: string]: any; // Generic key-value pair for dynamic data
}

interface ModalEditProps {
    openModal: boolean;
    setOpenModal: Function;
    editedData: Wizard | Class | Room | Subject | undefined;
    setEditedData: Function;
    dataType: "wizard" | "class" | "room" | "subject";
}

export function ModalEdit({
    openModal,
    setOpenModal,
    editedData,
    setEditedData,
    dataType
}: ModalEditProps) {

    const [roleToken] = useState(localStorage.getItem('roleToken') || undefined);
    const { data: houseData, error: houseError } = useFetchAPI<House[]>({ route: 'houses' });
    const { data: classData, error: classError } = useFetchAPI<Class[]>({ route: 'classes' });

    const [formData, setFormData] = useState<FormDataProps>({});

    useEffect(() => {
        if (editedData) {
            setFormData({ ...editedData });
        } else {
            setFormData({});
        }
    }, [editedData]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const { data, error, postdata } = usePostAPI();
    const { data: putData, error: putError, putdata } = usePutAPI<any>();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!roleToken) {
            return;
        }

        if (editedData) {
            putdata(`${dataType}s/${editedData.id}`, formData, roleToken);
        } else {
            postdata(`${dataType}s`, formData, roleToken);
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

        toast.success(`${editedData ? 'Modification' : 'Ajout'} réussi`);

        setEditedData(undefined);

        setFormData({});

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

        toast.success('Modification réussie');

        setEditedData(undefined);

        setFormData({});

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
        setFormData({});
    }

    // Determine which data to display based on dataType
    let displayData: any = {};
    switch (dataType) {
        case "wizard":
            displayData = editedData as Wizard;
            break;
        case "class":
            displayData = editedData as Class;
            break;
        case "room":
            displayData = editedData as Room;
            break;
        case "subject":
            displayData = editedData as Subject;
            break;
        default:
            break;
    }

    return (
        <div className={`modal__backdrop ${openModal ? 'modal__active' : ''}`} onClick={handleBackdropClick}>
            <dialog className={`modal`}>
                <button>
                    <X size={20} className="modal__close" onClick={handleCloseModal} />
                </button>
                <form onSubmit={handleSubmit} className="modal__form">
                    {Object.keys(displayData).map((key, index) => (
                        <div key={index} className="modal__input">
                            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                            <input
                                type="text"
                                id={key}
                                name={key}
                                value={formData[key] || ''}
                                onChange={handleChange}
                                placeholder={`Enter ${key}`}
                                required
                            />
                        </div>
                    ))}
                    {dataType === "wizard" && (
                        <>
                            <div className="modal__input">
                                <label htmlFor="house_id">House</label>
                                <select
                                    id="house_id"
                                    name="house_id"
                                    value={formData.house_id || ''}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a house</option>
                                    {houseData?.map((house, index) => (
                                        <option key={index} value={house.id}>
                                            {house.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="modal__input">
                                <label htmlFor="class_id">Class</label>
                                <select
                                    id="class_id"
                                    name="class_id"
                                    value={formData.class_id || ''}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a class</option>
                                    {classData?.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}
                    <button type="submit" className="btn">{editedData ? 'Save Changes' : 'Submit'}</button>
                </form>
            </dialog>
        </div>
    );
}
