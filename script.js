const apiKey = "2dcfca943abf238a3e3639d49c212961";

Time();

var background = document.getElementById("app-container");
var search = document.getElementById("search");

var input = document.getElementById("city");

var cloudIco = "ico/clouds.png";
var windIco = "ico/wind.png";

function Time() {
  setInterval(function () {
    var time = new Date().toLocaleString();
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    var seconds = new Date().getSeconds();
    if (seconds < 10) seconds = "0" + seconds;
    var time = hours + ":" + minutes + ":" + seconds;
    document.querySelector(".time").innerHTML = time;
  }, 1000);
}

function searchWeather() {
  let city = document.getElementById("city").value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => weather(data));

  function weather(data) {
    if (city != "") {
      background.className = "";
    }

    console.log(data);

    var name = data.name;
    var clouds = data.clouds.all;
    var sky = data.weather[0].main;

    // var sky = 'Thunderstorm';
    // console.log(sky)

    if (sky == "Clear") {
      background.classList.add("clearbg");
    } else if (sky == "Clouds") {
      background.classList.add("cloudsbg");
    } else if (sky == "Thunderstorm") {
      background.classList.add("thunderstormbg");
    } else if (sky == "Drizzle" || sky == "Rain") {
      background.classList.add("rainbg");
    } else if ((sky = "Snow")) {
      background.classList.add("snowbg");
    } else {
      background.classList.add("mistbg");
    }

    var temp = data.main.temp;
    // var tempFeel = data.main.feels_like;
    var wind = data.wind.speed;
    var icon = data.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@4x.png";

    // if (icon.charAt(2) == 'd') {
    //     background.classList.add('day')
    // }
    // if (icon.charAt(2) == 'n') {
    //     background.classList.add('night')
    // }

    // Sunrise convert time
    var sunrise = data.sys.sunrise;
    var sunriseTime = new Date(sunrise * 1000).toLocaleString();

    // Sunrise convert time
    var sunset = data.sys.sunset;
    var sunsetTime = new Date(sunset * 1000).toLocaleString();

    document.querySelector(".city").innerHTML = name;

    document.querySelector(".temp").innerHTML = Math.round(temp) + "&#176;C";

    // document.querySelector('.clouds').innerHTML = `<img src="${iconUrl}">`;

    document.querySelector(".sunrise").innerHTML = "Sunrise: " + sunriseTime;

    document.querySelector(".sunset").innerHTML = "Sunset: " + sunsetTime;

    document.querySelector(".wind").innerHTML =
      `<img src="${windIco}" alt="">` + Math.round(wind) + "m/s";

    document.querySelector(".cloud").innerHTML =
      `<img src ="${cloudIco}" alt="">` + clouds + " %";
  }
}


search.addEventListener("click", function () {
  searchWeather();
});

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    search.click();
  }
});
