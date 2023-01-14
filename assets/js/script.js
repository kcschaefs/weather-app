
$(function () {

  // search and buttons -------------------------------------------------

  // search for multpile cities, each city will populate a button under the search bar to link back to that city data (two entry points into the same API)

  let locations = JSON.parse(localStorage.getItem('locations'));

  if (!locations) { // checks to see if there is anything in local storage first
    locations = []; // creates an object for local strorage if none exists
  } else {
    createBtn();
  };

  const dateEl = $("#currentDate"); // shows current date on page
  const today = moment().format("MMMM Do, YYYY");
  dateEl[0].innerHTML = today;

  const locationEl = $("#locationSearch");
  const submitBtn = $("#locationSubmit");


  function removeBtn() {
    var grabBtn = $("#storedLocation");
    grabBtn.children().remove();
  }

  function createBtn() { // removes the current buttons from the array so the new set of buttons can be added
    removeBtn();
    for (var city of locations) {
      buttonEl = $('<input/>').attr({
        type: "button",
        class: "locationBtn",
        id: `savedLocation-${city}`,
        value: city,
      });
      $("#storedLocation").append(buttonEl);
    }
  };

  // city names need to be stored in local data
  submitBtn.click(function (event) { // adds all the items from local storage into the saved searches buttons
    if (locationEl.val() == "") {
      return;
    } else {
      locations.push(locationEl.val());
      localStorage.setItem('locations', JSON.stringify(locations));
      createBtn();
      locationEl.val("");
    }
  });

  // api calls --------------------------------------------------------

  function getApiLocation() { // this gets the coordinates for the user input city
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=Minneapolis&limit=1&appid=66b175c500dd9fc7665e0ac4fc3cff12";

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data[0].lat);
        // console.log(data[0].lon);
      })
  };

  getApiLocation();

  function getApiWeather() { // this gets the forecast for the coordinates pulled from the first api
    var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=44.9772995&lon=-93.2654692&appid=66b175c500dd9fc7665e0ac4fc3cff12";

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        parseWeatherData(data);
      })
  };

  //this code was provided by professor to pull out the specific time sets from the provided data
  let currDTValue = "";
  const fiveDaysOfWeather = []

  function parseWeatherData(data) {
    data.list.forEach(obj => {
      const dateObj = new moment.unix(obj.dt)
      // console.log(dateObj.date());
      const currDay = dateObj.date();

      if (currDay !== currDTValue && fiveDaysOfWeather.length < 6 && !fiveDaysOfWeather.find(day => day.dt === obj.dt)) {
        currDTValue = currDay
        fiveDaysOfWeather.push(obj)
        tempChange(obj);  // added this in so I can loop through the temperature conversion without having to create a new loop
      }
    })
  };
  // end of provided code

  getApiWeather();

  function tempChange(obj) { // this converts the temp from the provided kelvin to faranheit
    let kelvin = obj.main.temp; //grabs the temp out of the populated array
    let farenh = (kelvin - 273.15) * 9 / 5 + 32; //converts to farenheit
    obj.main.tempf = Math.round(farenh); // rounds to the nearest whole number because I don't care about decimal places in a temperature, I want the whole number
  };

  // weather info serving -----------------------------------------------------------

  // console.log("t");

  // will need to convert temp from kelvin to faranheit


  // get icons here http://openweathermap.org/img/wn/$%7Bicon%7D@2x.png
  // or here https://openweathermap.org/weather-conditions

  //will have to do 2 api calls (one for lat/long from city, next for 5 day forecast)

  // use postman.com to help with creating the api url + test
});