import { homePage } from ".";
import { currentCard } from "./currentCard";
import { forecastCards } from "./forecastCards";
import { iconsInterface } from "./imagesInterface";
import { weatherData } from "./weatherData";

export const buttonsInterface = {
  buttons: document.querySelectorAll(".temperature-span button"),
  locationButton: document.querySelector(".location button"),
  addAllButtons: function () {
    this.celsiusButtonListener();
    this.fahrenheitButtonListener();
    this.locationButtonListener();
  },

  celsiusButtonListener: function () {
    this.buttons[0].addEventListener("click", (e) => {
      e.preventDefault();

      const classArray = Array.from(this.buttons[0].classList);

      if (classArray.includes("selected")) {
        return;
      } else if (!classArray.includes("selected")) {
        this.buttons[1].classList.remove("selected");
        this.buttons[0].classList.add("selected");

        weatherData.degreesMode = "celsius";

        currentCard.assingTemperatureDegrees(
          weatherData.currentData.temp_c,
          weatherData.degreesMode
        );

        for (let i = 0; i < 3; i++) {
          const day = weatherData.forecastData[i + 1];

          forecastCards.assingTemperatures(
            forecastCards.temperatureDegrees[i],
            day.day.maxtemp_c,
            weatherData.degreesMode
          );
        }
      }
    });
  },
  fahrenheitButtonListener: function () {
    this.buttons[1].addEventListener("click", (e) => {
      e.preventDefault();

      const classArray = Array.from(this.buttons[1].classList);

      if (classArray.includes("selected")) {
        return;
      } else if (!classArray.includes("selected")) {
        this.buttons[0].classList.remove("selected");
        this.buttons[1].classList.add("selected");

        weatherData.degreesMode = "fahrenheit";

        currentCard.assingTemperatureDegrees(
          weatherData.currentData.temp_f,
          weatherData.degreesMode
        );

        for (let i = 0; i < 3; i++) {
          const day = weatherData.forecastData[i + 1];

          forecastCards.assingTemperatures(
            forecastCards.temperatureDegrees[i],
            day.day.maxtemp_f,
            weatherData.degreesMode
          );
        }
      }
    });
  },
  locationButtonListener: function () {
    document.querySelector(".location button").addEventListener("click", () => {
      const citySpan = document.querySelector(".location");
      const children = document.querySelectorAll(".location > *");

      children.forEach((child) => {
        citySpan.removeChild(child);
      });

      const label = document.createElement("label");
      label.setAttribute("for", "location-input");
      citySpan.appendChild(label);

      const input = document.createElement("input");
      input.setAttribute("value", weatherData.locationData.name);
      input.setAttribute("name", "location-input");
      input.setAttribute("id", "location-input");
      label.appendChild(input);

      const checkMark = document.createElement("img");
      checkMark.classList.add("checkmark");
      checkMark.src = iconsInterface.checkMarkIcon;
      citySpan.appendChild(checkMark);

      this.submitNewLocationListener();

      const cross = document.createElement("img");
      cross.classList.add("cross");
      cross.src = iconsInterface.crossIcon;
      citySpan.appendChild(cross);

      this.cancelNewLocationListener();
    });
  },
  submitNewLocationListener: function () {
    document.onkeydown = function (e) {
      if (e.key === "Enter") {
        const input = document.querySelector(".location input");

        if (input !== null && typeof input.value === "string") {
          weatherData
            .fetchForecastData(`${input.value}`)
            .then((data) => {
              homePage.populateCurrentCard(data);
              homePage.populateForecastCards(data);

              const citySpan = document.querySelector(".location");
              const children = document.querySelectorAll(".location > *");

              children.forEach((child) => {
                citySpan.removeChild(child);
              });

              const cityText = document.createElement("p");
              cityText.classList.add("city");
              cityText.textContent = data.location.name;
              citySpan.appendChild(cityText);

              const button = document.createElement("button");
              citySpan.appendChild(button);
              buttonsInterface.locationButtonListener();
            })
            .catch((err) => {
              console.log("Invalid location");
            });
        } else {
          return;
        }
      }
    };

    document.querySelector(".checkmark").onclick = function () {
      const input = document.querySelector(".location input");

      if (typeof input.value === "string") {
        weatherData
          .fetchForecastData(`${input.value}`)
          .then((data) => {
            homePage.populateCurrentCard(data);
            homePage.populateForecastCards(data);

            const citySpan = document.querySelector(".location");
            const children = document.querySelectorAll(".location > *");

            children.forEach((child) => {
              citySpan.removeChild(child);
            });

            const cityText = document.createElement("p");
            cityText.classList.add("city");
            cityText.textContent = data.location.name;
            citySpan.appendChild(cityText);

            const button = document.createElement("button");
            citySpan.appendChild(button);
            buttonsInterface.locationButtonListener();
          })
          .catch((err) => {
            console.log("Invalid location");
          });
      }
    };
  },
  cancelNewLocationListener: function () {
    document.querySelector(".cross").onclick = function () {
      const citySpan = document.querySelector(".location");
      const children = document.querySelectorAll(".location > *");

      children.forEach((child) => {
        citySpan.removeChild(child);
      });

      const cityText = document.createElement("p");
      cityText.classList.add("city");
      cityText.textContent = weatherData.locationData.name;
      citySpan.appendChild(cityText);

      const button = document.createElement("button");
      citySpan.appendChild(button);
      buttonsInterface.locationButtonListener();
    };
  },
};
