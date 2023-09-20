import { iconsInterface } from "./imagesInterface";

export const forecastCards = {
  cards: document.querySelectorAll(".forecast-card"),
  icons: document.querySelectorAll(".forecast-card > .weather-icon"),
  dayText: document.querySelectorAll(".forecast-card > p"),
  temperatureDegrees: document.querySelectorAll(
    ".forecast-card > span > .temperature"
  ),
  temperatureText: document.querySelectorAll(
    ".forecast-card > span > .temperature-text"
  ),

  assingIcon: function (icon, condition) {
    const rainTest = /(r|R)ain|(d|D)rizzle/;
    const sleetTest = /(s|S)leet/;
    const snowTest = /(s|S)now|(p|P)ellets|(b|B)lizzard/;
    const cloudTest = /(c|C)loudy|(o|O)vercast/;
    const rainWithThunderTest =
      /(\w*\s(t|T)hunder\s\w*\s(r|R)ain)|(\w*\s(r|R)ain\s\w*\s(t|T)hunder\s?)/;
    const snowWithThunderTest =
      /(\w*\s(t|T)hunder\s\w*\s(s|s)now)|(\w*\s(s|S)now\s\w*\s(t|T)hunder\s?)|(t|T)hunder\w?/;
    const fogTest = /(f|F)og|(m|M)ist/;

    if (condition === "Sunny") {
      icon.src = iconsInterface.sunnyIcon;
    } else if (condition === "Clear") {
      icon.src = iconsInterface.nightIcon;
    } else if (condition === "Partly cloudy") {
      icon.src = iconsInterface.partlyCloudyIcon;
    } else if (rainWithThunderTest.test(condition)) {
      icon.src = iconsInterface.stormRainIcon;
    } else if (snowWithThunderTest.test(condition)) {
      icon.src = iconsInterface.stormIcon;
    } else if (rainTest.test(condition)) {
      icon.src = iconsInterface.rainIcon;
    } else if (snowTest.test(condition)) {
      icon.src = iconsInterface.snowIcon;
    } else if (cloudTest.test(condition)) {
      icon.src = iconsInterface.cloudIcon;
    } else if (fogTest.test(condition)) {
      icon.src = iconsInterface.fogIcon;
    } else if (sleetTest.test(condition)) {
      icon.src = iconsInterface.sleetIcon;
    }
  },
  assingDays: function (dayElement, day) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const date = new Date(day);

    dayElement.textContent = days[date.getDay()];
  },
  assingTemperatures: function (element, temperature, mode) {
    if (mode === "celsius") {
      element.textContent = `${temperature}˚C`;
    } else if (mode === "fahrenheit") {
      element.textContent = `${temperature}˚F`;
    }
  },
  assingTemperaturesText: function (element, text) {
    element.textContent = text;
  },
};
