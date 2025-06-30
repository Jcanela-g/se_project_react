import "./LogoutModal.css";
import { removeToken } from "../../utils/token";

export default function LogoutModal({
  isOpen,
  onClose,
  setIsLoggedIn,
  setCurrentUser,
}) {
  const handleLogout = (e) => {
    e.preventDefault();
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__content modal__content_confirmation">
        <button
          type="button"
          onClick={onClose}
          className="modal__close modal__close_type_confirmation"
        ></button>
        <h2 className="modal__caption modal__caption_confirmation">
          Are you sure you want to logout?
        </h2>
        <button
          type="button"
          onClick={handleLogout}
          className="modal__delete-btn modal__delete-btn_confirmation"
        >
          Yes, logout
        </button>
        <button onClick={onClose} type="button" className="modal__cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}
