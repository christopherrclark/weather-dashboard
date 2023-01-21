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

getStorage();

// contact with Api to get weather data adn assigning text content to the HTML based on weather data retrieved
function getWeatherData(event){
  console.log(city)
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

function display5Day(forecastList){
  console.log(forecastList);
  document.getElementById("five-day-container").innerHTML =""

  for(let i=0;i<forecastList.length;i+=8){
    let obj = forecastList[i]

    var icon = obj.weather[0].icon
    var iconUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
    console.log(iconUrl);
    
    var dayContainer = document.createElement("div")

    

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
}

document.getElementById("prev-searched-cities").addEventListener("click", function(event){
city = event.target.textContent;
getWeatherData();
})
