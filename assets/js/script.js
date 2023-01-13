
$(function () {
  
  let locations = JSON.parse(localStorage.getItem('locations'));

  if (!locations) { // checks to see if there is anything in local storage first
    locations = []; // creates an object for local strorage if none exists
  };

  const dateEl = $("#currentDate");
  const today = moment().format("MMMM Do, YYYY");
  dateEl[0].innerHTML = today;

  const locationEl = $("#locationSearch");
  const submitBTN = $("#locationSubmit");
  
  
  submitBTN.click(function (event) {
    //create array for local storage
    locations.push(locationEl.val());
    localStorage.setItem('locations', JSON.stringify(locations));
    
    //make sure this pushes to the array
  });


  // saveBtnEl.click(function (event) {
  //   const inputText = (event.currentTarget.parentElement.children[1].value.trim()); // user input text
  //   const inputTime = (event.currentTarget.parentElement.id); // grabs the time block for user input
  //   calEvents[inputTime] = inputText; // ties the time block to the input text
  //   localStorage.setItem('calEvents', JSON.stringify(calEvents)); // sets it to local storage
  // })


  // search for multpile cities, each city will populate a button under the search bar to link back to that city data (two entry points into the same API)


  // city names need to be stored in local data

  // will need to convert temp from kelvin to faranheit


  // get icons here http://openweathermap.org/img/wn/$%7Bicon%7D@2x.png
  // or here https://openweathermap.org/weather-conditions
});

//will have to do 2 api calls (one for lat/long from city, next for 5 day forecast)

// use postman.com to help with creating the api url + test

