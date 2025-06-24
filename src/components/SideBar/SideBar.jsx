import { useContext } from "react";
import "./SideBar.css";
import avatar from "../../assets/Ellipse18.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ handleEditProfileClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <div className="sidebar">
        <img
          src={currentUser?.avatar}
          alt="avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser?.name || "—"}</p>
      </div>
      <div className="sidebar__btns">
        <button
          onClick={handleEditProfileClick}
          className="sidebar__edit-profile-btn"
        >
          Change profile data
        </button>
      </div>
    </>
  );
}
