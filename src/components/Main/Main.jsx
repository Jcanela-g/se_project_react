import { useContext } from "react";
import "./Main.css";
import { WeatherCard } from "../WeatherCard/WeatherCard";
import { ItemCard } from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

export function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="content">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__container">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}
