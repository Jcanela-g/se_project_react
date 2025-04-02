import "./ModalWithForm.css";

export function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
}) {
  return (
    <div className={`modal ${isOpen && "modal_open"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" onClick={onClose} className="modal__close" />
        <form action="" className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

// export default ModalWithForm;
