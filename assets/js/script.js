let currDTValue = "";
const fiveDaysOfWeather = []
var searchFormEl = document.querySelector('#search-form');
var cityEl = document.getElementById('search-input');
var APIkey= "73ee11fefe831f9d7a78e05e0c55a931";
var cityNameEl = document.getElementById('cityName');
var tempEl = document.getElementById('temp');
var cloudsEl = document.getElementById('clouds');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var savedCities = []

// document.querySelector('#search-input').value;

// api.openweathermap.org/data/2.5/weather?q={city}&appid={APIkey}

// var apiUrl = 

// fetch(queryURL) 
 
getStorage();

// Here's a sample of how you might start the app
// contact with Api to get weather data adn assigning text content to the HTML based on weather data retrieved
function getWeatherData(event){
  event.preventDefault();
  var city = cityEl.value.trim();
  var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey + "&units=imperial"
  fetch(apiURL)
  .then( response => {
    return response.json()
  })
  .then( data => {
    // send the data to the parsing function below
    // parseWeatherData(data)
    console.log (data)
    cityNameEl.textContent = data.name;
    tempEl.textContent = "Temp: " + data.main.temp + " F";
    cloudsEl.textContent = "Cloud Conditions: " + data.weather[0].description;
    windEl.textContent = "Wind: " + data.wind.speed + " mph";
    humidityEl.textContent = "Humidity: " + data.main.humidity + " %";

  })
}

// added eventListener to watch for when submit button is pushed to start looking weather data for seached city
searchFormEl.addEventListener('submit', function(event){
  getWeatherData(event);
  console.log (cityEl.value);
  savedCities.push(cityEl.value.trim());
  localStorage.setItem("Saved Cities", JSON.stringify(savedCities));
  createCityBox();
});

// create box for searched city
function createCityBox(){
  let newCity = document.createElement("div.new-cities");  //target "new-cities" for css styling box for each city saved
  // newCity.classList.add("new-cities");
  newCity.textContent = cityEl.value.trim();
  document.getElementById("prev-searched-cities").appendChild(newCity);
}

// get saved cities from localStorage and creating a box for each saved city
function getStorage(){
  if(JSON.parse(localStorage.getItem ("Saved Cities")) !==null){
    savedCities = JSON.parse(localStorage.getItem ("Saved Cities"));
  }
  // console.log(JSON.parse(localStorage.getItem ("Saved Cities")))
  if(savedCities !== null){
    for(i=0; i<savedCities.length; i++){
      // console.log(cityEl.value.trim)
      let newCity = document.createElement("div");
      newCity.classList.add("new-cities");
      console.log(newCity);
      newCity.textContent = savedCities[i];
      document.getElementById("prev-searched-cities").appendChild(newCity);
    }
  }

}

// Code our Instructor gave us: to parse out one record per day in the 5 day forcast(because it gives us like 6 per day)

// function parseWeatherData(data){
//   data.forEach( obj => {
//     // use moment or dayjs to parse the obj dt variable and get the "real date"
//     const dateObj = new moment(obj.list.dt)
//     console.log(date.obj); //get just day value

//     // from this dateObj, use moment or js to get the date it represents. ***This is for you to do ***.
//     const currday = ""; //logging what day were on

//     // if the current dt value differs from the global variable, AND we don't have data in our array for this day, 
//     // we must be on a new day
//     if( currDay !== currDTValue && fiveDaysOfWeather.length < 5 && !fiveDaysOfWeather.find( day => day.dt === obj.dt ) ){
//       currDTValue = currDay // update the global variable so we don't use this day again

//       // if JS is still in this function, then we must be encountering this dt object for the first time. So the obj variable used in the forEach() must be referring to the firt hour block for this day. get the first record (the obj variable above) and use that for the weather for this day
//       fiveDaysOfWeather.push(obj)
//     }
//   })

//   // Once the code gets here, we should have one weather object per day.
//   console.log(fiveDaysOfWeather)
// }


// getWeatherData();



/*

  Here's an example of a data record you get back for the 5-Day Forecast

  {
    "cod": "200",
    "message": 0,
    "cnt": 40,
    "list": [
    {
      "dt": 1661871600,
      "main": {
        "temp": 296.76,
        "feels_like": 296.98,
        "temp_min": 296.76,
        "temp_max": 297.87,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 933,
        "humidity": 69,
        "temp_kf": -1.11
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 0.62,
        "deg": 349,
        "gust": 1.18
      },
      "visibility": 10000,
      "pop": 0.32,
      "rain": {
        "3h": 0.26
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2022-08-30 15:00:00"
    },
    {
      "dt": 1661882400,
      "main": {
        "temp": 295.45,
        "feels_like": 295.59,
        "temp_min": 292.84,
        "temp_max": 295.45,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 931,
        "humidity": 71,
        "temp_kf": 2.61
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 96
      },
      "wind": {
        "speed": 1.97,
        "deg": 157,
        "gust": 3.39
      },
      "visibility": 10000,
      "pop": 0.33,
      "rain": {
        "3h": 0.57
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2022-08-30 18:00:00"
    },
    {
      "dt": 1661893200,
      "main": {
        "temp": 292.46,
        "feels_like": 292.54,
        "temp_min": 290.31,
        "temp_max": 292.46,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 931,
        "humidity": 80,
        "temp_kf": 2.15
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 68
      },
      "wind": {
        "speed": 2.66,
        "deg": 210,
        "gust": 3.58
      },
      "visibility": 10000,
      "pop": 0.7,
      "rain": {
        "3h": 0.49
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2022-08-30 21:00:00"
    },
    ....
    {
      "dt": 1662292800,
      "main": {
        "temp": 294.93,
        "feels_like": 294.83,
        "temp_min": 294.93,
        "temp_max": 294.93,
        "pressure": 1018,
        "sea_level": 1018,
        "grnd_level": 935,
        "humidity": 64,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": {
        "all": 88
      },
      "wind": {
        "speed": 1.14,
        "deg": 17,
        "gust": 1.57
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2022-09-04 12:00:00"
    }
  ],
  "city": {
    "id": 3163858,
    "name": "Zocca",
    "coord": {
      "lat": 44.34,
      "lon": 10.99
    },
    "country": "IT",
    "population": 4593,
    "timezone": 7200,
    "sunrise": 1661834187,
    "sunset": 1661882248
  }
}

*/