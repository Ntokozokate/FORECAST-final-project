function refreshWeather(response) {
  console.log(response.data.temperature.current);

  let currentTemp = document.querySelector("#temp");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind-speed");
  let weatherCondition = document.querySelector("#weather-description");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  timeElement.innerHTML = formatDate(date);

  currentTemp.innerHTML = Math.round(response.data.temperature.current);

  currentHumidity.innerHTML = response.data.temperature.humidity;

  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);

  weatherCondition.innerHTML = response.data.condition.description;

  console.log(response.data);

  console.log(response.data.condition.description);
}
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day}, ${hours} : ${minutes}`;
}

function searchCity(city) {
  let apiKey = "3b1f6a3cf426c8fo47d42200c9911tba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(refreshWeather);
}

function searchWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  //console.log(searchInput.value);
  let cityElement = document.querySelector("#city-output");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let seachFormElement = document.querySelector("#search-form");
seachFormElement.addEventListener("submit", searchWeather);
