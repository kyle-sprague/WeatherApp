//Getting the input elements added in
const submit = document.getElementById("form"); 
const input = document.getElementById("input"); 

//elements used for displaying the weather
const cityDisplay = document.getElementById("city"); 
const tempDisplay = document.getElementById("temp"); 
const weatherDisplay = document.getElementById("weather"); 

//API Key
const apiKey = "858acac015592bf4cd9498de977d8cc6"; 

//Event listener for when a location is submited and passes it to the get weather function
submit.addEventListener('submit', function(event){
    getWeather(input.value); 
    event.preventDefault(); 
}, false); 

//getWeather takes the city given from the event listener and adds it to the api URL so the fetch
//request can be sent and it gets the response from the request and passes it to be parsed
function getWeather(city){
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    
    fetch(api)
        .then(response => response.json())
        .then(data => displayWeather(data));
}

//display weather takes the response from the fetch and displays the city name, temperature, and
//the icon that openweathermap gives for each weather type
function displayWeather(response){
    cityDisplay.innerText = response.name;
    tempDisplay.innerHTML = `${response.main.temp} °F`; 
    console.log(response.weather[0].icon); 
    weatherDisplay.innerHTML = `<img src = "http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`;

}
