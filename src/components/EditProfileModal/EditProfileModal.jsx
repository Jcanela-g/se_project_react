import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfileModal({
  isOpen,
  onClose,
  onEditProfileModalSubmit,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      setFormData({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfileModalSubmit(formData)
      .then(() => {
        setFormData({
          name: "",
          avatar: "",
        });
      })
      .catch((err) => {
        console.error("Profile changes failed:", err);
      });
  };

  return (
    <ModalWithForm
      buttonText="Save changes"
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="profileName"
        className="modal__label modal__label_type_normal"
      >
        Name*{""}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="profileName"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </label>
      <label
        htmlFor="profileAvatar"
        className="modal__label modal__label_type_normal"
      >
        Avatar URL*{""}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="profileAvatar"
          placeholder="Avatar URL"
          onChange={handleChange}
          value={formData.avatar}
          required
        />
      </label>
    </ModalWithForm>
  );
}
