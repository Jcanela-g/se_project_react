import "./ClothesSection.css";
import { ItemCard } from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

export default function ClothesSection() {
  return (
    <div className="clothes-section">
      <div className="clothes-section__info-section">
        <p className="clothes-section__title">Your Items</p>
        <button className="clothes-section__add-item-btn">+ Add New</button>
      </div>
      <ul className="clothes-section__cards-container">
        {defaultClothingItems
          /* {clothingItems */

          //   .filter((item) => {
          //     return item.weather === weatherData.type;
          //   })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                // onCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}
