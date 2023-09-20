export const currentCard = {
  icon: document.querySelector(".region-info .weather-icon"),
  temperatureDegrees: document.querySelector(".region-info .temperature"),
  temperatureText: document.querySelector(".region-info .temperature-text"),
  city: document.querySelector(".city"),
  region: document.querySelector(".region"),
  country: document.querySelector(".country"),

  assingTemperatureDegrees: function (temperature, mode) {
    if (mode === "celsius") {
      currentCard.temperatureDegrees.textContent = `${temperature}˚C`;
    } else if (mode === "fahrenheit") {
      currentCard.temperatureDegrees.textContent = `${temperature}˚F`;
    }
  },
  assingTemperatureText: function (text) {
    currentCard.temperatureText.textContent = text;
  },
  assingCity: function (city) {
    currentCard.city.textContent = city;
  },
  assingRegion: function (region) {
    currentCard.region.textContent = region;
  },
  assingCountry: function (country) {
    currentCard.country.textContent = country;
  },
};
