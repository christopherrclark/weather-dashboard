let currDTValue = moment().format("YYYY-MM-DD");
var searchFormEl = document.querySelector('#search-form');
var cityEl = document.getElementById('search-input');
var APIkey= "73ee11fefe831f9d7a78e05e0c55a931";
var cityNameEl = document.getElementById('cityName');
var tempEl = document.getElementById('temp');
var cloudsEl = document.getElementById('clouds');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var iconEl = document.getElementById('weather-icon');
var savedCities = []
var city = "";

// document.querySelector('#search-input').value;

// api.openweathermap.org/data/2.5/weather?q={city}&appid={APIkey}

// var apiUrl = 

// fetch(queryURL) 
 
getStorage();

// Here's a sample of how you might start the app
// contact with Api to get weather data adn assigning text content to the HTML based on weather data retrieved
function getWeatherData(event){
  console.log(city)
  // event.preventDefault();
  // city = cityEl.value.trim();
  document.getElementById('weather-icon').style.display = "block"
  var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey + "&units=imperial"
  fetch(apiURL)
  .then( response => {
    return response.json()
  })
  .then( data => {    
    cityNameEl.textContent = data.city.name;
    tempEl.textContent = "Temp: " + data.list[0].main.temp + " \u00B0F";
    cloudsEl.textContent = "Cloud Conditions: " + data.list[0].weather[0].description;
    windEl.textContent = "Wind: " + data.list[0].wind.speed + " mph";
    humidityEl.textContent = "Humidity: " + data.list[0].main.humidity + " %";
    var icon = data.list[0].weather[0].icon
    var iconUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
    iconEl.setAttribute("src", iconUrl)
    console.log ("data",icon)
    // send the data to the parsing function below
    // parseWeatherData(data.list)
    display5Day(data.list)
  })
}

// added eventListener to watch for when submit button is pushed to start looking weather data for seached city
searchFormEl.addEventListener('submit', function(event){
  event.preventDefault()
  city = cityEl.value.trim();
  getWeatherData();
  console.log (cityEl.value);
  var newCity = cityEl.value.toLowerCase().trim()
  if (savedCities.indexOf(newCity) !== -1) {
    return;
  }
  savedCities.push(newCity);
  console.log ("cities", savedCities)
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
//   console.log(data)
//   data.forEach( obj => {
//     // use moment or dayjs to parse the obj dt variable and get the "real date"
//     const dateObj = new moment(obj.dt)
//     // console.log(dateObj); //get just day value

//     // from this dateObj, use moment or js to get the date it represents. ***This is for you to do ***.
//     const currday = moment(dateObj * 1000).format("YYYY-MM-DD"); //logging what day were on

//     // if the current dt value differs from the global variable, AND we don't have data in our array for this day, 
//     // we must be on a new day
//     if( currday !== currDTValue && fiveDaysOfWeather.length < 5 && !fiveDaysOfWeather.find( day => day.dt === obj.dt ) ){
//       currDTValue = currday // update the global variable so we don't use this day again

//       // if JS is still in this function, then we must be encountering this dt object for the first time. So the obj variable used in the forEach() must be referring to the firt hour block for this day. get the first record (the obj variable above) and use that for the weather for this day
//       fiveDaysOfWeather.push(obj)
//     }
//   })

//   // Once the code gets here, we should have one weather object per day.
//   console.log(fiveDaysOfWeather)
//   display5Day()
// }

function display5Day(forecastList){
  console.log(forecastList);
  document.getElementById("five-day-container").innerHTML =""

  for(let i=0;i<forecastList.length;i+=8){
    let obj = forecastList[i]

    var icon = obj.weather[0].icon
    var iconUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
    console.log(iconUrl);
    // iconEl.setAttribute("src", iconUrl)
    
    var dayContainer = document.createElement("div")

    // create a new image tag with document.createElement("div")
    // give the img tag a src eq to line 125 (iconUrl)
    // append the image to the container div
    // use CSS to position the image however you want to

     // create a new image tag with document.createElement("div")
    var fiveDayIcon = document.createElement("img")
    // give the img tag a src eq to line 125 (iconUrl)
    fiveDayIcon.setAttribute("src", iconUrl)
    // append the image to the container div
    dayContainer.appendChild(fiveDayIcon)
    // use CSS to position the image however you want to

    dayContainer.setAttribute("class", "col-12 col-md-6 dayContainer col-lg-2")
    
    var fiveDayDate = document.createElement("p")
    fiveDayDate.textContent = moment(obj.dt_txt).format("M-DD-YY")
    dayContainer.appendChild(fiveDayDate)
    
    var fiveDayTemp = document.createElement("p")
    fiveDayTemp.textContent = obj.main.temp + " \u00B0F"
    dayContainer.appendChild(fiveDayTemp)
    
    var fiveDayClouds = document.createElement("p")
    fiveDayClouds.textContent = obj.weather[0].description
    dayContainer.appendChild(fiveDayClouds)
    
    var fiveDayWind = document.createElement("p")
    fiveDayWind.textContent = obj.wind.speed + " mph"
    dayContainer.appendChild(fiveDayWind)
    
    var fiveDayHum = document.createElement("p")
    fiveDayHum.textContent = obj.main.humidity + " %"
    dayContainer.appendChild(fiveDayHum)
    
    document.getElementById("five-day-container").appendChild(dayContainer)
  }
  // let index = 0;

  // fiveDaysOfWeather.forEach( obj => {
    // var icon = obj.weather[0].icon
    // var iconUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
    // iconEl.setAttribute("src", iconUrl)
    
    // var dayContainer = document.createElement("div")

    // // create a new image tag with document.createElement("div")
    // // give the img tag a src eq to line 125 (iconUrl)
    // // append the image to the container div
    // // use CSS to position the image however you want to

    //  // create a new image tag with document.createElement("div")
    // var fiveDayIcon = document.createElement("img")
    // // give the img tag a src eq to line 125 (iconUrl)
    // fiveDayIcon.setAttribute("src", iconUrl)
    // // append the image to the container div
    // dayContainer.appendChild(fiveDayIcon)
    // // use CSS to position the image however you want to


    // dayContainer.setAttribute("class", "col-12 col-md-6 dayContainer col-lg-2")
    // document.getElementById("five-day-container").appendChild(dayContainer)
    
    // var fiveDayDate = document.createElement("p")
    // fiveDayDate.textContent = moment(obj.dt_txt).format("M-DD")
    // dayContainer.appendChild(fiveDayDate)

    // var fiveDayTemp = document.createElement("p")
    // fiveDayTemp.textContent = obj.main.temp + " \u00B0F"
    // dayContainer.appendChild(fiveDayTemp)

    // var fiveDayClouds = document.createElement("p")
    // fiveDayClouds.textContent = obj.weather[0].description
    // dayContainer.appendChild(fiveDayClouds)

    // var fiveDayWind = document.createElement("p")
    // fiveDayWind.textContent = obj.wind.speed + " mph"
    // dayContainer.appendChild(fiveDayWind)

    // var fiveDayHum = document.createElement("p")
    // fiveDayHum.textContent = obj.main.humidity + " %"
    // dayContainer.appendChild(fiveDayHum)
    
  // })
}

document.getElementById("prev-searched-cities").addEventListener("click", function(event){
city = event.target.textContent;
getWeatherData();
})



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