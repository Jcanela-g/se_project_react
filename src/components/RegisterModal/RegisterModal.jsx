import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { useEffect } from "react";

export default function RegistrationModal({
  isOpen,
  onClose,
  onRegistrationModalSubmit,
  handleLoginClick,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    if (isOpen) {
      setFormData({
        email: "",
        password: "",
        name: "",
        avatar: "",
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistrationModalSubmit(formData)
      .then(() => {
        setFormData({
          email: "",
          password: "",
          name: "",
          avatar: "",
        });
      })
      .catch((err) => {
        console.error("Sign up failed:", err);
      });
  };

  return (
    <ModalWithForm
      buttonText="Sign Up"
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="registerEmail"
        className="modal__label modal__label_type_normal"
      >
        Email*{""}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="registerEmail"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
      </label>
      <label
        htmlFor="registerPassword"
        className="modal__label modal__label_type_normal"
      >
        Password*{""}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="registerPassword"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />
      </label>
      <label
        htmlFor="registerName"
        className="modal__label modal__label_type_normal"
      >
        Name*{""}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="registerName"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </label>
      <label htmlFor="avatar" className="modal__label modal__label_type_normal">
        Avatar URL*{""}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          onChange={handleChange}
          value={formData.avatar}
          required
        />
      </label>
      <button
        onClick={handleLoginClick}
        type="button"
        className="modal__login-button"
      >
        or Log in
      </button>
    </ModalWithForm>
  );
}
