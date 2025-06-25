import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

export default function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = Array.isArray(item.likes)
    ? item.likes.some((userId) => userId === currentUser._id)
    : false;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__heading-container">
        <p className="card__title">{item.name}</p>
        <button
          onClick={handleLike}
          className={`card__like-btn ${isLiked ? "card__like-btn_liked" : ""}`}
        ></button>
      </div>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__img"
      />
    </li>
  );
}
