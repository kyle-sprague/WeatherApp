//Getting the input elements added in
const submit = document.getElementById("form"); 
const input = document.getElementById("input"); 

//elements used for displaying the weather
const cityDisplay = document.getElementById("city"); 
const tempDisplay = document.getElementById("temp"); 
const weatherDisplay = document.getElementById("weather"); 
const displaySection = document.getElementById("displaySection");
const descriptionSection = document.getElementById("description"); 


//API Key
const apiKey = "858acac015592bf4cd9498de977d8cc6"; 

//Event listener for when a location is submited and passes it to the get weather function
submit.addEventListener('submit', function(event){
    event.preventDefault();
    getWeather(input.value); 
     
}, false); 

//getWeather takes the city given from the event listener and adds it to the api URL so the fetch
//request can be sent and it gets the response from the request and passes it to be parsed
function getWeather(city){
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    
    //Fetch is what sends out the request from openweather to get the data for the given city
    //once it receives the response its converted to JSON and the passed into the display function
    fetch(api)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(e => {
            displayError(); 
        })
}

//display weather takes the response from the fetch and displays the city name, temperature, and
//the icon that openweathermap gives for each weather type
function displayWeather(response){
    displaySection.style.visibility = 'visible';
    tempDisplay.style.visibility = 'visible'; 
    descriptionSection.style.visibility = 'visible';
    weatherDisplay.style.visibility = 'visible';
    cityDisplay.innerText = response.name;
    tempDisplay.innerHTML = `${Math.floor(response.main.temp)} °F`;
    descriptionSection.innerText = response.weather[0].description; 
    weatherDisplay.innerHTML = `<img src = "http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`;

}

//this is the function that displays the error message if there was an issue finding the city 
function displayError(){
    displaySection.style.visibility = 'visible'; 
    cityDisplay.innerText = "Sorry we couldn't find that city"; 
    tempDisplay.style.visibility = 'hidden'; 
    descriptionSection.style.visibility = 'hidden';
    weatherDisplay.style.visibility = 'hidden'; 
}
