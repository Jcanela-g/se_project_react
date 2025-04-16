import "./ItemCard.css";
// import tShirt from "../../assets/T-Shirt.png";
// import { defaultClothingItems } from "../../utils/constants";

export function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <p className="card__title">{item.name}</p>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__img"
      />
    </li>
  );
}
