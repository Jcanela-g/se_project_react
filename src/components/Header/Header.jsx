import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Ellipse18.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Header({
  handleAddClick,
  locationData,
  handleRegistrationClick,
  handleLoginClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  // const avatarPlaceholder = (
  //   <div className="header__avatar-placeholder">
  //     {currentUser.name?.[0]?.toUpperCase() || "?"}
  //   </div>
  // );

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {locationData.city}
      </p>
      <ToggleSwitch />

      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__user_name">{currentUser?.name || "—"}</p>
              <img
                src={currentUser?.avatar}
                alt="avatar"
                className="header__avatar"
              />
            </div>
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={handleRegistrationClick}
            className="header__sign-up-btn"
          >
            Sign Up
          </button>
          <button onClick={handleLoginClick} className="header__log-in-btn">
            Log In
          </button>
        </>
      )}
    </header>
  );
}
