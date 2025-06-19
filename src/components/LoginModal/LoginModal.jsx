import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { useEffect } from "react";

export default function LoginModal({ isOpen, onClose, onLoginModalSubmit }) {
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
      buttonText="Sign Up"
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label modal__label_type_normal">
        Email*{""}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
      </label>
      <label
        htmlFor="password"
        className="modal__label modal__label_type_normal"
      >
        Password*{""}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />
      </label>
    </ModalWithForm>
  );
}
