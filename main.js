const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
    if (evt.keyCode === 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${config.baseurl}weather?q=${query}&units=metric&APPID=${config.key}`).then(weather => {
        if(weather.ok) {
                return weather.json()
            } else {
                throw new Error("Oops, something went wrong");
            }
        })
        .then(displayResults)
        .catch((error) => console.log(error));
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.textContent = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.textContent = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`

    let weatherElement = document.querySelector(".current .weather");
    weatherElement.textContent = weather.weather[0].main;

    let highLow = document.querySelector(".high-low");
    highLow.textContent = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May",
                    "June", "July", "August", "September", "October",
                    "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`;
}