let apiKey="25382a741e6bced20fc1f59a53126a82";
let citySearch = document.getElementById(`citySearch`);
let sectionHistory = document.getElementById(`history`);
let weatherForecast = document.getElementById(`forecast`);

let temperature = document.getElementById(`temperature`);
let wind = document.getElementById(`wind`);
let humidity = document.getElementById(`humidity`);
let date = document.querySelector(`#date`);

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



function getHistory(){
    let cityHistory = JSON.parse(localStorage.getItem("city")) || [];
    return cityHistory;
}

function saveHistory(cityHistory){
    localStorage.setItem("city", JSON.stringify(cityHistory));
    return;
}

function currentWeather(cityName){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`)
    .then((res)=> {
        return res.json()
    })
    .then((data)=>{
        console.log(data);
        console.log(data.wind.speed)
        console.log(data.main.temp)
        console.log(data.main.humidity)
        temperature.textContent = "Temp: " + data.main.temp + " °F";
        wind.textContent = "Wind speed: " + data.wind.speed + " MPH";
        humidity.textContent = "Humidity: " + data.main.humidity + " %";
        date.textContent = cityName + " " + dayjs().format('MM/DD/YYYY')
    })
}

function getWeather(lat, lon){
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
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
        temperature_0.textContent = "Temp: " + data.list[7].main.temp + " °F";
        wind_0.textContent = "Wind speed: " + data.list[7].wind.speed + " MPH";
        humidity_0.textContent = "Humidity: " +data.list[7].main.humidity + " %";
        date_0.textContent = dayjs().add(1, "days").format('MM/DD/YYYY')

        temperature_1.textContent = "Temp: " + data.list[14].main.temp; + " °F";
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
}

function geoLocation(cityName){

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`)
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

citySearch.addEventListener(`click`, function(){
    let cityName= document.getElementById(`cityName`).value;
    geoLocation(cityName)
    let cityArray = getHistory();
    cityArray.push(cityName)
    saveHistory(cityArray);
    renderHistoryBtn();
})

function renderHistoryBtn(){
    let cityArray = getHistory();
    sectionHistory.textContent = '';
    for(let i=0; i<cityArray.length; i++){
        console.log(cityArray[i]);
        let buttonTag = document.createElement("button");
        buttonTag.textContent = cityArray[i];
        buttonTag.onclick = function(event) {
            geoLocation(event.target.textContent);
        }
        sectionHistory.appendChild(buttonTag);
    }
}



// function weatherCards(){
//     let header = document.createElement(" div ")
//     header.textContent = 
// }

renderHistoryBtn();


