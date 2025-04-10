import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Ellipse18.png";

export function Header({ handleAddClick, locationData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <p className="header__date-and-location">
        {currentDate}, {locationData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__user_name">Jose Canela</p>
        <img src={avatar} alt="avatar" className="header__avatar" />
      </div>
    </header>
  );
}
