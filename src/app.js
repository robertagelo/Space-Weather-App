//Show default weather

function showDefaultWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let feelsLikeTemp = Math.round(response.data.temperature.feels_like);
  let defaultIconUrl = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png `;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperature;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.condition.description;
  let feelsLikeTempElement = document.querySelector("#feels-like");
  feelsLikeTempElement.innerHTML = `${feelsLikeTemp}°C`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  let icon = document.querySelector("#weather-icon");
  icon.innerHTML = `<img src="${defaultIconUrl}" alt="weather icon" width="120"></img>`;
}

function searchDefaultCity(defaultCity) {
  let apiKey = "96f59ob69a32facbb34b2tdb5d2e7405";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showDefaultWeather);
}

searchDefaultCity("Bologna");
getForecast("Bologna");

//Search handling

function showSearchedWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let feelsLikeTemp = Math.round(response.data.temperature.feels_like);
  let cityIconUrl = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png `;

  let cityNname = document.querySelector("#main-city");
  cityNname.innerHTML = response.data.city;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperature;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.condition.description;
  let feelsLikeTempElement = document.querySelector("#feels-like");
  feelsLikeTempElement.innerHTML = `${feelsLikeTemp}°C`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed} km/h`;
  let icon = document.querySelector("#weather-icon");
  icon.innerHTML = `<img src="${cityIconUrl}" alt="weather icon" width="120"></img>`;

  getForecast(response.data.city);
}

function getSearchedWeather(city) {
  let apiCity = city.value;
  let apiKey = "96f59ob69a32facbb34b2tdb5d2e7405";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${apiCity}&key=${apiKey}`;

  axios.get(apiUrl).then(showSearchedWeather);
}

function showCityWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  getSearchedWeather(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCityWeather);

//Geolocalization button handling

function showGeolocation(response) {
  let temperature = Math.round(response.data.temperature.current);
  let feelsLikeTemp = Math.round(response.data.temperature.feels_like);
  let geoIconUrl = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png `;

  let name = document.querySelector("#main-city");
  name.innerHTML = response.data.city;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.condition.description;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperature;
  let feelsLikeTempElement = document.querySelector("#feels-like");
  feelsLikeTempElement.innerHTML = `${feelsLikeTemp}°C`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed} km/h`;
  let icon = document.querySelector("#weather-icon");
  icon.innerHTML = `<img src="${geoIconUrl}" alt="weather icon" width="120"></img>`;

  getForecast(response.data.city);
}

function getCoords(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "96f59ob69a32facbb34b2tdb5d2e7405";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;

  axios.get(apiUrl).then(showGeolocation);
}

function geolocalize() {
  navigator.geolocation.getCurrentPosition(getCoords);
}

let geolocalizationButton = document.querySelector(".geolocation-button");
geolocalizationButton.addEventListener("click", geolocalize);

//Forecast

function getForecast(city) {
  let apiKey = "96f59ob69a32facbb34b2tdb5d2e7405";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response);
  let forecast = document.querySelector("#forecast");

  let forecastHTML = "";

  let forecastDay = response.data.daily;
  forecastDay.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col forecast-box">
          <div class="forecast-day">${getForecastDay(forecastDay.time)}</div>
          <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png"
            alt="Forecast weather icon"
            width="60"
          />
          <div class="forecast-temp">
            <span class="forecast-max">${Math.round(
              forecastDay.temperature.maximum
            )}</span>
            <span class="forecast-min">${Math.round(
              forecastDay.temperature.minimum
            )}</span>
          </div>
        </div>`;
    }
  });

  forecast.innerHTML = forecastHTML;
}

//Date handling

function getForecastDay(timestamp) {
  let now = new Date(timestamp * 1000);
  let weekDay = now.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[weekDay];
}

function showdate() {
  let now = new Date();
  let month = now.getMonth();
  let year = now.getFullYear();
  let minutes = now.getMinutes();
  let hours = now.getHours();
  let day = now.getDate();
  let weekDay = now.getDay();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let date = `${days[weekDay]}, ${day} ${months[month]} at ${hours}:${
    (minutes < 10 ? "0" : "") + minutes
  }`;

  let datePlaceholder = document.querySelector("#date");
  datePlaceholder.innerHTML = date;
}

showdate();
