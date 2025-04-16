import "./SideBar.css";
import avatar from "../../assets/Ellipse18.png";

export default function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Default avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Jose Canela</p>
    </div>
  );
}
