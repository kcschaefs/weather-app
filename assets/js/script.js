
$(function () {

  // search and buttons -------------------------------------------------

  // search for multpile cities, each city will populate a button under the search bar to link back to that city data (two entry points into the same API)

  let locations = JSON.parse(localStorage.getItem('locations'));

  if (!locations) { // checks to see if there is anything in local storage first
    locations = []; // creates an object for local strorage if none exists
  } else {
    createBtn();
  };

  function today() {
    const dateEl = $("#currentWeather"); // shows current date on page
    const today = moment().format("MMMM Do, YYYY");
    dateEl[0].innerHTML = today;
  };

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
      today(); //change to pull from the data instead
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
      // .format("MMMM Do, YYYY")
      obj.date = dateObj
      const currDay = dateObj.date();

      if (currDay !== currDTValue && fiveDaysOfWeather.length < 6 && !fiveDaysOfWeather.find(day => day.dt === obj.dt)) {
        currDTValue = currDay
        fiveDaysOfWeather.push(obj)
        tempChange(obj);  // added this in so I can loop through the temperature conversion without having to create a new loop
        tempFeelChange(obj);
      }
    })
    createCurrentCard(fiveDaysOfWeather[0]);
    for (i=1;i<6;i++) {
    createFutureCard(fiveDaysOfWeather[i]);
    }
  };
  // end of provided code

  getApiWeather();

  function tempChange(obj) { // this converts the temp from the provided kelvin to faranheit
    let kelvin = obj.main.temp; //grabs the temp out of the populated array
    let farenh = (kelvin - 273.15) * 9 / 5 + 32; //converts to farenheit
    obj.main.tempf = Math.round(farenh); // rounds to the nearest whole number because I don't care about decimal places in a temperature, I want the whole number
  };

  function tempFeelChange(obj) { // this converts the temp from the provided kelvin to faranheit
    let kelvin = obj.main.feels_like; //grabs the temp out of the populated array
    let farenh = (kelvin - 273.15) * 9 / 5 + 32; //converts to farenheit
    obj.main.tempfeelsf = Math.round(farenh); // rounds to the nearest whole number because I don't care about decimal places in a temperature, I want the whole number
  };

  // weather info serving -----------------------------------------------------------

  function createCurrentCard(obj) {
    mainCardEl = $('<div>').attr({
      class: "card",
      style: "width: 100%; outline: solid 1px black; background-color: white;",
    });
    mainCardBodyEl = $('<div>').attr({
      class: "card-body",
    })
    mainCardH5El = $('<h5>').attr({
      class: "card-title",
    })
    mainCardImgEl = $('<img>').attr({
      class: "card-subtitle mb-2",
      src: `http://openweathermap.org/img/wn/${obj.weather[0].icon}.png`,
    })
    mainCardP1El = $('<p>').attr({
      class: "card-text",
      id: "p1El",
      style: "line-height: 10px; margin-top: 15px",
    })
    mainCardP2El = $('<p>').attr({
      class: "card-text",
      id: "p2El",
      style: "line-height: 10px",
    })
    mainCardP3El = $('<p>').attr({
      class: "card-text",
      id: "p3El",
      style: "line-height: 10px",
    })

    $("#currentWeather").append(mainCardEl);
    mainCardEl.append(mainCardBodyEl);
    mainCardBodyEl.append(mainCardH5El);
    mainCardBodyEl.append(mainCardImgEl);
    mainCardBodyEl.append(mainCardP1El);
    mainCardBodyEl.append(mainCardP2El);
    mainCardBodyEl.append(mainCardP3El);

    mainCardH5El.text(obj.date.format("MMMM Do, YYYY"));
    mainCardP1El.text("Temp: "+obj.main.tempf+"°F");
    mainCardP2El.text("Feels Like: "+obj.main.tempfeelsf+"°F");
    mainCardP3El.text("Wind: "+obj.wind.speed+" MPH");
  }

  function createFutureCard(obj) {
    cardEl = $('<div>').attr({
      class: "card",
      style: "width: 18rem; background-color: var(--green)",
    });
    cardBodyEl = $('<div>').attr({
      class: "card-body",
    })
    cardH5El = $('<h5>').attr({
      class: "card-title",
      style: "color: var(--white)",
    })
    cardImgEl = $('<img>').attr({
      class: "card-subtitle mb-2",
      src: `http://openweathermap.org/img/wn/${obj.weather[0].icon}.png`,
    })
    cardP1El = $('<p>').attr({
      class: "card-text",
      id: "p1El",
      style: "line-height: 10px; margin-top: 15px; color: var(--white)",
    })
    cardP2El = $('<p>').attr({
      class: "card-text",
      id: "p2El",
      style: "line-height: 10px; color: var(--dark)",
    })
    cardP3El = $('<p>').attr({
      class: "card-text",
      id: "p3El",
      style: "line-height: 10px; color: var(--white)",
    })

    $("#forecastWeather").append(cardEl);
    cardEl.append(cardBodyEl);
    cardBodyEl.append(cardH5El);
    cardBodyEl.append(cardImgEl);
    cardBodyEl.append(cardP1El);
    cardBodyEl.append(cardP2El);
    cardBodyEl.append(cardP3El);

    cardH5El.text(obj.date.format("MMMM Do, YYYY"));
    cardP1El.text("Temp: "+obj.main.tempf+"°F");
    cardP2El.text("Feels Like: "+obj.main.tempfeelsf+"°F");
    cardP3El.text("Wind: "+obj.wind.speed+" MPH");
  };

  // get icons here http://openweathermap.org/img/wn/$%7Bicon%7D@2x.png
  // or here https://openweathermap.org/weather-conditions

});