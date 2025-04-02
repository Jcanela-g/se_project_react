import "./ItemCard.css";

export function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <p className="card__title">{item.name}</p>
      <img
        onClick={handleCardClick}
        src={item.link}
        alt={item.name}
        className="card__img"
      />
    </li>
  );
}
