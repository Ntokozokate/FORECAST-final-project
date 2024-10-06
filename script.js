function refreshWeather(response) {
  //console.log(response.data.temperature.current);

  let currentTemp = document.querySelector("#temp");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind-speed");
  let weatherCondition = document.querySelector("#weather-description");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  //iconImage = response.data.condition.icon;
  //console.log(response.condition.icon_url);
  let iconImg = document.querySelector("#icon");

  iconImg.innerHTML = `<img src="${response.data.condition.icon_url}" class="cloud-img"/> `;

  timeElement.innerHTML = formatDate(date);

  currentTemp.innerHTML = Math.round(response.data.temperature.current);

  currentHumidity.innerHTML = response.data.temperature.humidity;

  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);

  weatherCondition.innerHTML = response.data.condition.description;

  //console.log(response.data);
  getForecast(response.data.city);
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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = `3b1f6a3cf426c8fo47d42200c9911tba`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(dispayForecast);
  //console.log(apiUrl);
}

function dispayForecast(response) {
  console.log(response.data);
  console.log(response.data.daily.condition);

  //let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5)
      forecastHtml =
        forecastHtml +
        ` 
      <div class="weather-forecast"> 
    
        <div class="forecast-date">${formatDay(day.time)}</div> 
        <div > 
        <img src = "${day.condition.icon_url}" class="forecast-icon" />
        
        </div>
        <div class="forecast-temperatures"> 
        <div class="forecast-temps"> <div class="forecast-temp">
         <strong>${Math.round(day.temperature.maximum)}°</strong></div>  
         <div class="forecast-temp">${Math.round(
           day.temperature.minimum
         )}°</div> 
         </div>
         </div>
      </div>
      `;
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

searchCity("Harare");

//dispayForecast();

//function dispalyMonths() {
//let months = ["Jan", "Feb", "Mar", "Apr", "May", "June"];
//let monthHtml = "";

//months.forEach(function (month) {
//monthHtml =
//monthHtml +
//` I hate to be the bearer for bad news but on the months of ${month} you wont be working here`;
//});
//let monthElement = document.querySelector("#monthss");
//monthElement = monthHtml;
//}
//dispalyMonths();

let seachFormElement = document.querySelector("#search-form");
seachFormElement.addEventListener("submit", searchWeather);
