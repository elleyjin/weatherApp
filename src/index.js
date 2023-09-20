let apiKey = "d0138a4c7d1cd8871d6ba4c962225917";
let defaultApi = `https://api.openweathermap.org/data/2.5/weather?q=new%20york&appid=${apiKey}`;

function changeToCelcius(event) {
  event.preventDefault();
  let celcius = document.querySelector("#current-temp");
  // check this part
  celcius.innerHTML = 19;
}

function changeToFarenheit(event) {
  event.preventDefault();
  let farenheit = document.querySelector("#current-temp");
  farenheit.innerHTML = 66;
}

function searchCity(event) {
  event.preventDefault();

  let currentCity = document.querySelector("#current-city");
  let searchInput = document.querySelector("#search-input");

  if (searchInput.value) {
    let city =
      searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1);
    let cityUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    axios
      .get(cityUrl)
      .then(function extractLocation(response) {
        let lat = response.data[0].lat;
        let lon = response.data[0].lon;
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        return axios.get(apiUrl);
      })
      .then(showWeather);
    currentCity.innerHTML = searchInput.value;
  } else {
    searchInput = "null";
    alert("Please enter a city");
  }
}

function activateCelcius() {
  let celciusButton = document.querySelector("#celcius-button");
  let farenheitButton = document.querySelector("#farenheit-button");

  if (celciusButton.classList.contains("active")) {
    celciusButton.classList.remove("active");
    farenheitButton.classList.add("active");
  } else {
    celciusButton.classList.add("active");
    farenheitButton.classList.remove("active");
  }
}

navigator.geolocation.getCurrentPosition(getPosition);

let current = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

// selecting time, day and date
let changeDay = document.querySelector("#current-day");
let changeTime = document.querySelector("#current-time");
let changeDate = document.querySelector("#current-date");

// accessing hour and minutes
let hour = current.getHours();
let minutes = current.getMinutes();

if (minutes < 10) {
  minutes = "0" + minutes;
}
let period = "";
let currentTime = `${hour}:${minutes}`;

if (hour > 12) {
  period = "pm";
  changeTime.innerHTML = currentTime + " " + period;
} else if (hour === 12) {
  period = "pm";
  changeTime.innerHTML = currentTime + " " + period;
} else {
  period = "am";
  changeTime.innerHTML = currentTime + " " + period;
}

// accessing date
let date = current.getDate();
let month = months[current.getMonth()];
let year = current.getFullYear();
let suffix = "";
let currentDate = "";

if (date === 1) {
  suffix = "st";
} else if (date === 2) {
  suffix = "nd";
} else if (date === 3) {
  suffix = "rd";
} else {
  suffix = "th";
}
currentDate = `${date}${suffix} ${month} ${year}`;
changeDate.innerHTML = currentDate;

// Display day
let day = days[current.getDay()];
changeDay.innerHTML = day;

// Display temperature
let currentCTemp = document.querySelector("#celcius-button");
currentCTemp.addEventListener("click", changeToCelcius);

let currentFTemp = document.querySelector("#farenheit-button");
currentFTemp.addEventListener("click", changeToFarenheit);

// search bar and display search value
let searchBar = document.querySelector("#search-submit");
searchBar.addEventListener("submit", searchCity);
// added here
searchBar.addEventListener("submit", showWeather);

// change active button
let changeButton = document.querySelector("#temp-button");
changeButton.addEventListener("click", activateCelcius);

// API Key
function getPosition() {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    axios.get(apiUrl).then(function (response) {
      showWeather(response);
      showCityName(response);
    });
  });
}

function showCityName(response) {
  if (response.data) {
    let currentCity = document.querySelector("#current-city");
    // check error in console
    currentCity.innerHTML = response.data.name;
  }
}

function showWeather(response) {
  1;
  if (response.data) {
    // to check error here after cliking search button
    showCityName(response);

    let temperature = Math.floor(response.data.main.temp);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = temperature;

    let description = response.data.weather[0].description;
    let weatherCondition = document.querySelector("#current-condition");
    weatherCondition.innerHTML = description;

    let humidityData = document.querySelector("#humidity");
    let humidity = response.data.main.humidity;
    humidityData.innerHTML = humidity;

    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.floor(response.data.wind.speed);

    console.log(response.data);
  }
}

let locationButton = document.querySelector("#location-dot");
locationButton.addEventListener("click", getPosition);
