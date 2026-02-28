    function displayWeather(response) {
        let currentTemperature = document.querySelector("#current-temperature-value");
        let currentDescription = document.querySelector("#current-description");
        let humidityElement = document.querySelector("#humidity");
        let windSpeedElement = document.querySelector("#wind-speed");
        let timeElement = document.querySelector("#time");
        let date = new Date(response.data.time * 1000);
        let iconElement = document.querySelector("#icon")
        let cityElement = document.querySelector("#current-city");
      
          console.log(response.data)

          cityElement.innerHTML = response.data.city
          currentTemperature.innerHTML = Math.round(response.data.temperature.current);
          currentDescription.innerHTML = response.data.condition.description;
          humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
          windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
          timeElement.innerHTML = formatDate(date);
          iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon"/>`
        }

    function formatDate(date) {
        let minutes = date.getMinutes();
        let hours = date.getHours();
        let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
        if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      if (hours < 10) {
        hours = `0${hours}`;
      }

      let day = days[date.getDay()];

      return `${day} ${hours}:${minutes}`
    }

    function searchCity(city) {

        let apiKey = "203adfb889341eafafcd3o792bteb01b";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

          axios.get(apiUrl).then(displayWeather);
        }

        let changeCity = document.querySelector("#search-form");
        changeCity.addEventListener("submit", searchCity);

      function search(event) {
        event.preventDefault();
        let searchInputElement = document.querySelector("#search-input");
        
        searchCity(searchInputElement.value);
      }

      function displayForecast () {
        let days = ["Tue", "Wed", "Thu", "Fri", "Sat"]
        let forecastHtml = ""

        days.forEach (function (day){
        forecastHtml = 
          forecastHtml + `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">☀️</div> 
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature"><strong>15°</strong></div>
          <div class="weather-forecast-temperature">10°</div> 
        </div>
      </div>
      `;
        })
        let forecastElement = document.querySelector("#forecast");
        forecastElement.innerHTML = forecastHtml
      }

      let searchForm = document.querySelector("#search-form");
      searchForm.addEventListener("submit", search);

      searchCity("Paris")
      displayForecast()