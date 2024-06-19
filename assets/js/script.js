let apiKey="25382a741e6bced20fc1f59a53126a82";
let citySearch = document.getElementById(`citySearch`);
let sectionHistory = document.getElementById(`history`);

function getHistory(){
    let cityHistory = JSON.parse(localStorage.getItem("city")) || [];
    return cityHistory;
}

function saveHistory(cityHistory){
    localStorage.setItem("city", JSON.stringify(cityHistory));
    return;
}

function getWeather(lat, lon){
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then((res)=> {
        return res.json()
    })
    .then((data)=>{
        console.log(data);
        console.log(data.list);
        for(let i=0; i<data.list.length; i+=7){
            console.log(data.list[i]);
        }
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
renderHistoryBtn();
