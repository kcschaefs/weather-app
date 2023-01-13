
$(function () {


  const dateEl = $("#currentDate");
  const today = moment().format("MMMM Do, YYYY");
  dateEl[0].innerHTML = today;

  // search for multpile cities, each city will populate a button under the search bar to link back to that city data (two entry points into the same API)


  // city names need to be stored in local data

  // will need to convert temp from kelvin to faranheit


  // get icons here http://openweathermap.org/img/wn/$%7Bicon%7D@2x.png
  // or here https://openweathermap.org/weather-conditions
});

//will have to do 2 api calls (one for lat/long from city, next for 5 day forecast)

// use postman.com to help with creating the api url + test

