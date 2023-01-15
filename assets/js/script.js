
$(function () {

  // search and buttons -------------------------------------------------

  // search for multpile cities, each city will populate a button under the search bar to link back to that city data (two entry points into the same API)

  let locations = JSON.parse(localStorage.getItem('locations'));

  if (!locations) { // checks to see if there is anything in local storage first
    locations = []; // creates an object for local strorage if none exists
  } else {
    createBtn();
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
      buttonEl.click(function (event) {
        getApiLocation(event.currentTarget.value);
      })
    }
  };

  // city names need to be stored in local data
  submitBtn.click(function (event) { // adds all the items from local storage into the saved searches buttons
    if (locationEl.val() == "") {
      return;
    } else {
      getApiLocation(locationEl.val());
      locations.push(locationEl.val());
      localStorage.setItem('locations', JSON.stringify(locations));
      createBtn();
      locationEl.val("");
    }
  });

  // api calls --------------------------------------------------------

  function getApiLocation(location) { // this gets the coordinates for the user input city
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=66b175c500dd9fc7665e0ac4fc3cff12`;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data[0].lat);
        // console.log(data[0].lon);
        getApiWeather(data[0].lat, data[0].lon);
      })
  };

  function getApiWeather(lat, lon) { // this gets the forecast for the coordinates pulled from the first api
    var requestUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=66b175c500dd9fc7665e0ac4fc3cff12`;

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
  let fiveDaysOfWeather = []

  function parseWeatherData(data) {
    // console.log(data.city.name);
    fiveDaysOfWeather=[];
    data.list.forEach(obj => {
      const dateObj = new moment.unix(obj.dt)
      obj.date = dateObj
      const currDay = dateObj.date();

      if (currDay !== currDTValue && fiveDaysOfWeather.length < 6 && !fiveDaysOfWeather.find(day => day.dt === obj.dt)) {
        currDTValue = currDay
        fiveDaysOfWeather.push(obj)
        tempChange(obj);  // added this in so I can loop through the temperature conversion without having to create a new loop
      }
    })
    clearPreviousCards();
    createCurrentCard(fiveDaysOfWeather[0], data.city.name);
    for (i=1;i<6;i++) {
    createFutureCard(fiveDaysOfWeather[i]);
    }
  };
  // end of provided code


  function convertTemp(kelvin) { // this converts the temp from the provided kelvin to faranheit 
    let farenh = (kelvin - 273.15) * 9 / 5 + 32; //converts to farenheit
    return Math.round(farenh); // rounds to the nearest whole number because I don't care about decimal places in a temperature, I want the whole number
  };

  function tempChange(obj) { // adds new temp entries for serving faranheit into the card
    obj.main.tempfeelsf = convertTemp(obj.main.feels_like);
    obj.main.tempf = convertTemp(obj.main.temp);
    obj.main.tempf_max = convertTemp(obj.main.temp_max);
    obj.main.tempf_min = convertTemp(obj.main.temp_min);
  };
  
  // weather info serving -----------------------------------------------------------

  function createCurrentCard(obj, cityName) {
    mainCardEl = $('<div>').attr({
      class: "card",
      id: "mainCardEl",
      style: "width: 100%; outline: solid 1px black; background-color: white;",
    });
    mainCardBodyEl = $('<div>').attr({
      class: "card-body",
    })
    mainCardH5El = $('<h4>').attr({
      class: "mcard-title",
    })
    mainCardH6El = $('<h5>').attr({
      class: "mcard-subtitle",
    })
    mainCardLocEl = $('<h4>').attr({
      class: "card-location",
    })
    mainCardImgEl = $('<img>').attr({
      class: "card-subtitle mb-2",
      src: `http://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`,
    })
    mainCardRowEl = $('<div>').attr({
      class: "row",
      id: "row1",
    })
    mainCardTextEl = $('<div>').attr({
      class: "row",
      id: "row2",
    })
    mainCardColAEl = $('<div>').attr({
      class: "col-4",
    })
    mainCardColBEl = $('<div>').attr({
      class: "col-4",
    })
    mainCardColCEl = $('<div>').attr({
      class: "col-4",
    })
    mainCardCol1El = $('<div>').attr({
      class: "col-4",
      id: "col1",
    })
    mainCardP1El = $('<p>').attr({
      class: "main-card-text",
      id: "p1El",
      style: "line-height: 10px; margin-top: 15px",
    })
    mainCardP2El = $('<p>').attr({
      class: "main-card-text",
      id: "mp2El",
      style: "line-height: 10px",
    })
    mainCardCo12El = $('<div>').attr({
      class: "col-4",
      id: "col2",
    })
    mainCardCo13El = $('<div>').attr({
      class: "col-4",
      id: "col3",
    })
    mainCardP3El = $('<p>').attr({
      class: "main-card-text",
      id: "p3El",
      style: "line-height: 10px",
    })
    mainCardP4El = $('<p>').attr({
      class: "main-card-text",
      id: "p4El",
      style: "line-height: 10px",
    })
    mainCardP5El = $('<p>').attr({
      class: "main-card-text",
      id: "p5El",
      style: "line-height: 10px",
    })
    mainCardP6El = $('<p>').attr({
      class: "main-card-text",
      id: "p6El",
      style: "line-height: 10px",
    })
    mainCardP7El = $('<p>').attr({
      class: "main-card-text",
      id: "p6El",
      style: "line-height: 10px",
    })

    $("#currentWeather").append(mainCardEl);
    mainCardEl.append(mainCardBodyEl);
    mainCardBodyEl.append(mainCardRowEl);
    mainCardBodyEl.append(mainCardTextEl);

    mainCardRowEl.append(mainCardColAEl);
    mainCardColAEl.append(mainCardH5El);
    mainCardColAEl.append(mainCardH6El);

    mainCardRowEl.append(mainCardColBEl);
    mainCardColBEl.append(mainCardImgEl);

    mainCardRowEl.append(mainCardColCEl);
    mainCardColCEl.append(mainCardLocEl);

    mainCardTextEl.append(mainCardCol1El);
    mainCardCol1El.append(mainCardP1El);
    mainCardCol1El.append(mainCardP2El);

    mainCardTextEl.append( mainCardCo12El);
    mainCardCo12El.append(mainCardP3El);
    mainCardCo12El.append(mainCardP4El);

    mainCardTextEl.append(mainCardCo13El);
    mainCardCo13El.append(mainCardP5El);
    mainCardCo13El.append(mainCardP6El);
    mainCardCo13El.append(mainCardP7El);

    mainCardH5El.text(obj.date.format("dddd"));
    mainCardH6El.text(obj.date.format("MMMM Do, YYYY"));
    mainCardP1El.text("Temp: "+obj.main.tempf+"°F");
    mainCardP2El.text("Feels Like: "+obj.main.tempfeelsf+"°F");
    mainCardP3El.text("Max: "+obj.main.tempf_max+"°F");
    mainCardP4El.text("Min: "+obj.main.tempf_min+"°F");
    mainCardP5El.text("Humidity: "+obj.main.humidity+" %");
    mainCardP6El.text("Wind: "+obj.wind.speed+" MPH");
    mainCardP7El.text("Gust: "+obj.wind.gust+" MPH");
    mainCardLocEl.text(cityName);
  }

  function createFutureCard(obj) {
    cardEl = $('<div>').attr({
      class: "card futureCardEl",
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
      style: "line-height: 10px; margin-top: 15px",
    })
    cardP2El = $('<p>').attr({
      class: "card-subtext",
      id: "p2El",
      style: "line-height: 10px",
    })
    cardP3El = $('<p>').attr({
      class: "card-text",
      id: "p3El",
      style: "line-height: 10px",
    })
    cardP4El = $('<p>').attr({
      class: "card-text",
      id: "p4El",
      style: "line-height: 10px",
    })

    $("#forecastWeather").append(cardEl);
    cardEl.append(cardBodyEl);
    cardBodyEl.append(cardH5El);
    cardBodyEl.append(cardImgEl);
    cardBodyEl.append(cardP1El);
    cardBodyEl.append(cardP2El);
    cardBodyEl.append(cardP3El);
    cardBodyEl.append(cardP4El);

    cardH5El.text(obj.date.format("MMMM Do"));
    cardP1El.text("Temp: "+obj.main.tempf+"°F");
    cardP2El.text("Feels Like: "+obj.main.tempfeelsf+"°F");
    cardP3El.text("Wind: "+obj.wind.speed+" MPH");
    cardP4El.text("Humidity: "+obj.main.humidity+" %");
  };

  function clearPreviousCards () {
    $("#mainCardEl").remove();
    $(".futureCardEl").remove();
  }

});