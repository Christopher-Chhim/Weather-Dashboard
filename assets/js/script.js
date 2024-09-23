let apiKey="25382a741e6bced20fc1f59a53126a82"; // API key for accessing OpenWeather API
let citySearch = document.getElementById(`citySearch`); // Search button element
let sectionHistory = document.getElementById(`history`); // Section for displaying search history buttons
let weatherForecast = document.getElementById(`forecast`); // Section to display weather forecast

// Elements for current weather display
let temperature = document.getElementById(`temperature`);
let wind = document.getElementById(`wind`);
let humidity = document.getElementById(`humidity`);
let date = document.querySelector(`#date`);

// Elements for 5-day forecast display
let temperature_0 = document.getElementById(`temperature_0`);
let wind_0 = document.getElementById(`wind_0`);
let humidity_0 = document.getElementById(`humidity_0`);
let date_0 = document.getElementById(`date_0`);

let temperature_1 = document.getElementById(`temperature_1`);
let wind_1 = document.getElementById(`wind_1`);
let humidity_1 = document.getElementById(`humidity_1`);
let date_1 = document.getElementById(`date_1`);

let temperature_2 = document.getElementById(`temperature_2`);
let wind_2 = document.getElementById(`wind_2`);
let humidity_2 = document.getElementById(`humidity_2`);
let date_2 = document.getElementById(`date_2`);

let temperature_3 = document.getElementById(`temperature_3`);
let wind_3 = document.getElementById(`wind_3`);
let humidity_3 = document.getElementById(`humidity_3`); 
let date_3 = document.getElementById(`date_3`);

let temperature_4 = document.getElementById(`temperature_4`);
let wind_4 = document.getElementById(`wind_4`);
let humidity_4 = document.getElementById(`humidity_4`);
let date_4 = document.getElementById(`date_4`);


// Retrieves search history from localStorage
function getHistory(){
    let cityHistory = JSON.parse(localStorage.getItem("city")) || []; // Get the stored history or default to an empty array
    return cityHistory;
}

// Saves search history to localStorage
function saveHistory(cityHistory){
    localStorage.setItem("city", JSON.stringify(cityHistory)); // Store the updated city history in localStorage
    return;
}

// Displays weather forecast in real-time for the searched city.
function currentWeather(cityName){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`)
    .then((res)=> {
        return res.json()
    })
    .then((data)=>{
        console.log(data);
        // Display current weather details on the page
        console.log(data.wind.speed)
        console.log(data.main.temp)
        console.log(data.main.humidity)
        temperature.textContent = "Temp: " + data.main.temp + " °F";
        wind.textContent = "Wind speed: " + data.wind.speed + " MPH";
        humidity.textContent = "Humidity: " + data.main.humidity + " %";
        date.textContent = cityName + " " + dayjs().format('MM/DD/YYYY') // Adding city name and formatting current date with dayjs
    })
}

// Fetches and displays the 5-day forecast based on latitude and longitude

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then((res)=> {
        return res.json()
    })
    .then((data)=>{
        console.log(data);
        console.log(data.list);
        let pTag = document.createElement('p')
        for(let i=0; i<data.list.length; i+=7){
            console.log(data.list[i]);
            console.log(data.list[i].wind.speed)
            console.log(data.list[i].main.temp)
            console.log(data.list[i].main.humidity)
        }

        // Presents a 5-day forecast that displays the date, the temperature, the wind speed, and the humidity

        temperature_0.textContent = "Temp: " + data.list[7].main.temp + " °F";
        wind_0.textContent = "Wind speed: " + data.list[7].wind.speed + " MPH";
        humidity_0.textContent = "Humidity: " +data.list[7].main.humidity + " %";
        date_0.textContent = dayjs().add(1, "days").format('MM/DD/YYYY')

        temperature_1.textContent = "Temp: " + data.list[14].main.temp + " °F";
        wind_1.textContent = "Wind speed: " + data.list[14].wind.speed + " MPH";
        humidity_1.textContent = "Humidity: " +data.list[14].main.humidity + " %";
        date_1.textContent = dayjs().add(2, "days").format('MM/DD/YYYY')

        temperature_2.textContent = "Temp: " + data.list[21].main.temp +  " °F";
        wind_2.textContent = "Wind speed: " +  data.list[21].wind.speed + " MPH";
        humidity_2.textContent = "Humidity: " +data.list[21].main.humidity + " %";
        date_2.textContent = dayjs().add(3, "days").format('MM/DD/YYYY')
        
        temperature_3.textContent = "Temp: " + data.list[28].main.temp + " °F";
        wind_3.textContent = "Wind speed: " +  data.list[28].wind.speed + " MPH";
        humidity_3.textContent = "Humidity: " +data.list[28].main.humidity + " %";
        date_3.textContent = dayjs().add(4, "days").format('MM/DD/YYYY')

        temperature_4.textContent = "Temp: " + data.list[35].main.temp + " °F";
        wind_4.textContent = "Wind speed: " +  data.list[35].wind.speed + " MPH";
        humidity_4.textContent = "Humidity: " +data.list[35].main.humidity + " %";
        date_4.textContent = dayjs().add(5, "days").format('MM/DD/YYYY')
    })
    .then(()=>{
        // After fetching the data, make the forecast card visible
        document.getElementById("contentCard").classList.remove("d-none");
    })
}

// Fetches geolocation (latitude and longitude) of the searched city
function geoLocation(cityName){

fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`)
.then((res)=>{
    return res.json()
})
.then((data)=>{
    let lat = data[0].lat;
    let lon = data[0].lon;
    console.log(lat);
    console.log(lon);
    getWeather(lat, lon);
    currentWeather(cityName);
})
}

// Event listener for the search button click

citySearch.addEventListener(`click`, function(){
    let cityName= document.getElementById(`cityName`).value; // Get city name from input
    // City name validator and displays an alert if city name is invalid.
    if (!isValidCityName(cityName)){ 
        window.alert("Please enter a valid city name")
        return;
    }

    // Fetch weather data for the valid city name
    geoLocation(cityName);

    // Update the search history with the new city
    let cityArray = getHistory();
    cityArray.push(cityName)
    saveHistory(cityArray);
    renderHistoryBtn();
})

// Renders the city search history as clickable buttons

function renderHistoryBtn(){
    let cityArray = getHistory();
    sectionHistory.textContent = '';
    // Create a button for each city in the search history
    for(let i=0; i<cityArray.length; i++){
        console.log(cityArray[i]);
        let buttonTag = document.createElement("button");
        buttonTag.textContent = cityArray[i];
        buttonTag.onclick = function(event) {
            geoLocation(event.target.textContent);
        }
        sectionHistory.appendChild(buttonTag);
        buttonTag.classList.add("btn","btn-secondary","m-1");
    }
}

// Render history buttons on page load
renderHistoryBtn();

// City name validator
function isValidCityName(cityName){
    // Sets the city name length between 2 to 100 characters.
    if (!cityName || cityName.length < 2 || cityName.length > 100){
        return false;
    }

    // Sets the city name length between 2 to 100 characters.
    const allowedCharactersPattern = /^[a-zA-Z\s\-']+$/;
    if (!allowedCharactersPattern.test(cityName)){
        return false;
    }

    // City name should not start or end with special characters
    if (" -'".includes(cityName[0]) || " -'".includes(cityName[cityName.length - 1])){
        return false;
    }

    // No consecutive special characters allowed
    const consecutiveCharactersPattern = /[ \-']{2,}/;
    if (consecutiveCharactersPattern.test(cityName)){
        return false;
    }

    return true;
}

