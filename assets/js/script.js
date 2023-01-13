
$(function () {

  let locations = JSON.parse(localStorage.getItem('locations'));

  if (!locations) { // checks to see if there is anything in local storage first
    locations = []; // creates an object for local strorage if none exists
  } else {
    createBtn();
  };
  
  const dateEl = $("#currentDate");
  const today = moment().format("MMMM Do, YYYY");
  dateEl[0].innerHTML = today;

  const locationEl = $("#locationSearch");
  const submitBtn = $("#locationSubmit");


  function removeBtn() {
    var grabBtn = $("#storedLocation");
        grabBtn.children().remove();
      }

  function createBtn() {
    removeBtn();
    for (var city of locations) {
      //need to only add new buttons, not return the full array on each click
      buttonEl = $('<input/>').attr({
        type: "button",
        id: "savedLocation",
        value: city,
      });
      $("#storedLocation").append(buttonEl);
    }
  };

  submitBtn.click(function (event) {
    if (locationEl.val() == "") {
      return;
    } else {
      // removeBtn(); // won't allow for more city inputs
      locations.push(locationEl.val());
      localStorage.setItem('locations', JSON.stringify(locations));
      // don't want this tied to button click only, add to document and allow for a call here?
      //set this to only serve the newest city on click 
      createBtn();
      //this is not working
      locationEl.val("");
    }
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

  //will have to do 2 api calls (one for lat/long from city, next for 5 day forecast)

  // use postman.com to help with creating the api url + test
});