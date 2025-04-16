import "./AddItemModal.css";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function AddItemModal({
  isOpen,
  onClose,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImgUrlChange = (e) => {
    setImgUrl(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imgUrl, weatherType });
    setName("");
    setImgUrl("");
    setWeatherType("");
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New Garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label modal__label_type_normal">
        Name{""}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imgUrl" className="modal__label modal__label_type_normal">
        Image{""}
        <input
          type="url"
          name="img"
          className="modal__input"
          id="imgUrl"
          placeholder="Image URL"
          onChange={handleImgUrlChange}
          value={imgUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="radio-option"
            className="modal__radio-input"
            id="hot"
            onChange={handleWeatherTypeChange}
            value="hot"
            checked={weatherType === "hot"}
          />
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="radio-option"
            className="modal__radio-input"
            id="warm"
            onChange={handleWeatherTypeChange}
            value="warm"
            checked={weatherType === "warm"}
          />
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="radio-option"
            className="modal__radio-input"
            id="cold"
            onChange={handleWeatherTypeChange}
            value="cold"
            checked={weatherType === "cold"}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
