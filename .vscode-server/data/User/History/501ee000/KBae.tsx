import { useEffect, useState } from "react";
import { PencilLine, Trash } from "lucide-react";
import { useDeleteAPI } from "../../../utils/APIData/useDeleteAPI";
import { toast } from "sonner";
import "./card.scss";

interface CardProps {
  data: Wizard | Class | Room;
  dataType: "wizard" | "class" | "room";
  is_staff: boolean;
  openModal: boolean;
  setOpenModal: Function;
  setEditedData: Function;
  setWizardData?: Function;
  setClassData?: Function;
  setRoomData?: Function;
}

export function Card({
  data,
  dataType,
  is_staff,
  openModal,
  setOpenModal,
  setEditedData,
  setWizardData,
  setClassData,
  setRoomData,
}: CardProps) {
  function handleClick() {
    setEditedData(data);
    setOpenModal(!openModal);
  }

  const [actualUser] = useState(localStorage.getItem("wizard") || undefined);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if (actualUser && dataType === "wizard") {
      const user = JSON.parse(actualUser);
      if (user.id === (data as Wizard).id) {
        setIsUser(true);
      }
    }
  }, [actualUser, data, dataType]);

  // ---------------------------------- Delete Modal
  const [deleteModal, setDeleteModal] = useState(false);

  const [roleToken] = useState(
    localStorage.getItem("roleToken") || undefined
  );
  const { deletedata } = useDeleteAPI();

  function handleDelete(id: number) {
    if (dataType === "wizard") {
      deletedata(`wizards/${id}`, roleToken);
      setWizardData &&
        setWizardData((prev: Wizard[]) =>
          prev.filter((wizard) => wizard.id !== id)
        );
    } else if (dataType === "class") {
      deletedata(`classes/${id}`, roleToken);
      setClassData &&
        setClassData((prev: Class[]) =>
          prev.filter((classItem) => classItem.id !== id)
        );
    } else if (dataType === "room") {
      deletedata(`rooms/${id}`, roleToken);
      setRoomData &&
        setRoomData((prev: Room[]) => prev.filter((room) => room.id !== id));
    }
    setDeleteModal(false);
    toast.success("L'élément a bien été supprimé");
  }

  return (
    <div className="card_account_container">
      {dataType === "wizard" && is_staff && (
        <PencilLine
          className="card_account_container_edit"
          onClick={handleClick}
        />
      )}
      {dataType === "wizard" && is_staff && !isUser && (
        <Trash
          className="card_account_container_delete"
          onClick={() => setDeleteModal(!deleteModal)}
        />
      )}
      <div className="card_account_container_img">
        <img src="https://picsum.photos/150/150" alt={dataType} />
      </div>
      <div className="card_account_container_info">
        {dataType === "wizard" && (
          <>
            <p className="card_account_container_info_name">
              {(data as Wizard).firstname + " " + (data as Wizard).lastname}
            </p>
            <div className="card_account_container_info_role">
              <p className="card_account_container_info_role_title">Roles</p>
              <p className="card_account_container_info_role_item">
                {(data as Wizard).roles?.map((role) => role.name).join(", ")}
              </p>
            </div>
          </>
        )}
        {dataType === "class" && (
          <>
            <p className="card_account_container_info_name">
              {(data as Class).name}
            </p>
            <div className="card_account_container_info_role">
              <p className="card_account_container_info_role_title">
                Description
              </p>
              <p className="card_account_container_info_role_item">
                {(data as Class).description}
              </p>
            </div>
          </>
        )}
        {dataType === "room" && (
          <>
            <p className="card_account_container_info_name">
              {(data as Room).name}
            </p>
            <div className="card_account_container_info_role">
              <p className="card_account_container_info_role_title">Capacity</p>
              <p className="card_account_container_info_role_item">
                {(data as Room).capacity}
              </p>
            </div>
          </>
        )}
      </div>

      <div className={`card_dialog ${deleteModal ? "delete_active" : ""}`}>
        <div className="card_dialog_wrapper">
          <p>
            Êtes-vous sûr de supprimer{" "}
            {dataType === "wizard"
              ? (data as Wizard).firstname + " " + (data as Wizard).lastname
              : data.name}
            ?
          </p>
          <div className="card_dialog_wrapper_button">
            <button onClick={() => setDeleteModal(false)}>Retour</button>
            <button
              className="button_remove"
              onClick={() => handleDelete(data.id)}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
