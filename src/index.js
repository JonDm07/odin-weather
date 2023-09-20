import "./styles.css";
import Favicon from "./assets/favicon.png";
import { iconsInterface } from "./imagesInterface";
import { weatherData } from "./weatherData";
import { forecastCards } from "./forecastCards";
import { currentCard } from "./currentCard";
import { buttons, buttonsInterface } from "./buttons";

export const homePage = {
  icon: document.querySelector(".weather-icon"),

  populateCurrentCard: function (data) {
    currentCard.assingTemperatureDegrees(
      data.current.temp_c,
      weatherData.degreesMode
    );
    currentCard.assingTemperatureText(data.current.condition.text);
    currentCard.assingCity(data.location.name);
    currentCard.assingRegion(data.location.region);
    currentCard.assingCountry(data.location.country);
    forecastCards.assingIcon(homePage.icon, data.current.condition.text);
  },
  populateForecastCards: function (data) {
    for (let i = 0; i < 3; i++) {
      const day = data.forecast.forecastday[i + 1];
      const date = new Date(day.date);

      forecastCards.assingDays(forecastCards.dayText[i], date);
      forecastCards.assingIcon(forecastCards.icons[i], day.day.condition.text);
      forecastCards.assingTemperatures(
        forecastCards.temperatureDegrees[i],
        day.day.maxtemp_c,
        weatherData.degreesMode
      );
      forecastCards.assingTemperaturesText(
        forecastCards.temperatureText[i],
        day.day.condition.text
      );
    }
  },
};

buttonsInterface.addAllButtons();

weatherData
  .fetchForecastData("Praha")
  .then((data) => {
    console.log(weatherData);
    console.log(data);

    if (!weatherData.error) {
      homePage.populateCurrentCard(data);
      homePage.populateForecastCards(data);
    }
  })
  .catch((err) => {
    console.log(err);
  });
