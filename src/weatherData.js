export const weatherData = {
  key: "c18738fed50446ffbcf182901230709",
  currentData: undefined,
  forecastData: undefined,
  locationData: undefined,
  error: undefined,
  degreesMode: "celsius",

  fetchForecastData: async function (location) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${this.key}&q=${location}&days=4`,
        {
          mode: "cors",
        }
      );
      const data = await response.json();

      if (data.error) {
        weatherData.error = data.error;
        console.log(this.error);
      } else if (!data.error) {
        weatherData.currentData = data.current;
        weatherData.forecastData = data.forecast.forecastday;
        weatherData.locationData = data.location;
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
