function clock(){

    const time=new Date();
    let mins=String(time.getMinutes()).padStart(2,"0");
    let hrs=String(time.getHours()).padStart(2,"0");
    let day=String(time.getDate()).padStart(2,"0");
    let mon=String(time.getMonth()).padStart(2,"0");
    switch(mon){
        case "00":
            mon="Jan"
            break;
        case "01":
            mon="Feb"
            break;
        case "02":
            mon="Mar"
            break;
        case "03":
            mon="Apr"
            break;
        case "04":
            mon="May"
            break;
        case "05":
            mon="Jun"
            break;
        case "06":
            mon="Jul"
            break;
        case "07":
            mon="Aug"
            break;
        case "08":
            mon="Sep"
            break;
        case "09":
            mon="Oct"
            break;
        case "10":
            mon="Nov"
            break;
        case "10":
            mon="Dec"
            break;
    }
    document.getElementById("time").innerHTML=hrs +":"+mins+ "<br> "+day+"-"+mon;

}
clock();
setInterval(clock,1000);
function getweather() {
    const city = document.getElementById("input").value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const apikey = "a188357a9ee948498172718946d486fe";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Check if API returned an error
            if (data.cod !== 200) {
                alert(`Error: ${data.message}`);
                return;
            }

            document.getElementById("temperature").innerHTML = `Temperature (&deg;C): ${data.main.temp}`;
            document.getElementById("Feels_like").innerHTML = `Feels like: ${data.main.feels_like}`;
            document.getElementById("humidity").innerHTML = `Humidity: ${data.main.humidity}%`;
            document.getElementById("wind_speed").innerHTML = `Wind speed: ${data.wind.speed} m/s`;
            document.getElementById("cloudcover").innerHTML = `Cloud cover: ${data.clouds.all}%`;
            document.getElementById("Precipitation").innerHTML = `Precipitation: ${data.rain ? data.rain["1h"] + " mm" : "0 mm"}`;
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
            alert("Failed to fetch weather data.");
        });
}
