import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { useEffect } from "react";

export default function LoginModal({
  isOpen,
  onClose,
  onLoginModalSubmit,
  handleRegistrationClick,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginModalSubmit(formData)
      .then(() => {
        setFormData({
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        console.error("Sign in failed:", err);
      });
  };

  return (
    <ModalWithForm
      buttonText="Sign In"
      title="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="loginEmail"
        className="modal__label modal__label_type_normal"
      >
        Email*{""}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="loginEmail"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
      </label>
      <label
        htmlFor="loginPassword"
        className="modal__label modal__label_type_normal"
      >
        Password*{""}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="loginPassword"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />
      </label>
      <button
        onClick={handleRegistrationClick}
        type="button"
        className="modal__signup-button"
      >
        or Sign up
      </button>
    </ModalWithForm>
  );
}
