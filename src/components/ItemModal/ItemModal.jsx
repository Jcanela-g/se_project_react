import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

export default function ItemModal({
  activeModal,
  card,
  onClose,
  handleDeleteConfirmation,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_open"}`}>
      <div className="modal__content_type_image">
        <button
          type="button"
          onClick={onClose}
          className="modal__close_type_preview"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isOwn && (
            <button
              type="button"
              onClick={handleDeleteConfirmation}
              className="modal__delete-btn"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
