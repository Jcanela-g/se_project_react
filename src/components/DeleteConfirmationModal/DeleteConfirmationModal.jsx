import "./DeleteConfirmationModal.css";

export default function DeleteConfirmationModal({
  activeModal,
  card,
  onClose,
}) {
  return (
    <div className={`modal ${activeModal === "confirmation" && "modal_open"}`}>
      <div className="modal__content modal__content_confirmation">
        <button
          type="button"
          onClick={onClose}
          className="modal__close modal__close_type_confirmation"
        ></button>
        <h2 className="modal__caption modal__caption_confirmation">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <button
          type="button"
          className="modal__delete-btn modal__delete-btn_confirmation"
        >
          Yes, delete item
        </button>
        <button onClick={onClose} type="button" className="modal__cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}
