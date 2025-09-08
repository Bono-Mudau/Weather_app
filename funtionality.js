const time =new Date();
let hrs =String(time.getHours()).padStart(2, "0");
let mins =String(time.getMinutes()).padStart(2, "0");

const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
let mon=months[time.getMonth()];
document.getElementById("date1").innerHTML="Today"
document.getElementById("date2").innerHTML="Tommorow"
for (let i=2; i<=4;i++) {
    let futureDate=new Date(time); 
    futureDate.setDate(time.getDate() + i);
    let dateStr=`${String(futureDate.getDate()).padStart(2,"0")}-${months[futureDate.getMonth()]}`;
    document.getElementById(`date${i+1}`).innerHTML=dateStr;
}

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
        case "11":
            mon="Dec"
            break;
    }
    document.getElementById("time").innerHTML=hrs +":"+mins+ "<br> "+day+"-"+mon;
}

clock();
setInterval(clock,1000);

async function getFiveDayForecast() {

   const cityname=document.getElementById("input").value.trim();
   if (!cityname){
        alert("Please enter a city name");
        return;
    }

  const apikey ="a188357a9ee948498172718946d486fe";
  const url =`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${apikey}&units=metric`;
  
  try {
    const response =await fetch(url);
    const data =await response.json();

    if(data.cod!=="200") {
      throw new Error(data.message);
    }

    const dailyForecast=data.list.filter(item => item.dt_txt.includes("12:00:00"));

    const forecast=dailyForecast.map(day => ({
      date: day.dt_txt.split(" ")[0],
      temp: day.main.temp,
      feels_like: day.main.feels_like,
      humidity: day.main.humidity,
      wind_speed: day.wind.speed,
      cloud_cover: day.clouds.all,
      precipitation: day.rain ? day.rain["1h"] : 0,
      weather_main: day.weather[0].main,
      weather_description: day.weather[0].description,
      icon: day.weather[0].icon
    }));
                                    
    displayweather(0, forecast,"temperature","Feels_like", "humidity","wind_speed","cloudcover","Precipitation",cityname);
    displayweather(1, forecast,"temperature2","Feels_like2", "humidity2","wind_speed2","cloudcover2","Precipitation2",cityname);
    displayweather(2, forecast,"temperature3","Feels_like3", "humidity3","wind_speed3","cloudcover3","Precipitation3",cityname);
    displayweather(3, forecast,"temperature4","Feels_like4", "humidity4","wind_speed4","cloudcover4","Precipitation4",cityname);
    displayweather(4, forecast,"temperature5","Feels_like5", "humidity5","wind_speed5","cloudcover5","Precipitation5",cityname);

    return forecast;
    }
    catch(error){
    alert("Error!! try again later");
    return null;
    }
}
async function use_location() {
    if (navigator.geolocation) {//check if the browser supports geo location
        navigator.geolocation.getCurrentPosition(async position => {
            const lat =position.coords.latitude;
            const lon =position.coords.longitude;
            const apikey ="a188357a9ee948498172718946d486fe"; 
            const url =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
            let cityname="Unknown";
            try{
                 const geoUrl=`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apikey}`;
                 const geoResp=await fetch(geoUrl);
                 const geoData=await geoResp.json();
                 let cityName="Unknown location";
                 if(geoData.length>0){
                    cityname=geoData[0].name;
                 }
            } 
            catch (err) {
              console.error("Error getting city name:", err);
            }

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.cod !== "200") {
                    throw new Error(data.message);
                }
                const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));

                const forecast = dailyForecast.map(day => ({
                    date: day.dt_txt.split(" ")[0],
                    temp: day.main.temp,
                    feels_like: day.main.feels_like,
                    humidity: day.main.humidity,
                    wind_speed: day.wind.speed,
                    cloud_cover: day.clouds.all,
                    precipitation: day.rain ? (day.rain["3h"] || 0) : 0,
                    weather_main: day.weather[0].main,
                    weather_description: day.weather[0].description,
                    icon: day.weather[0].icon
                }));
                                
                displayweather(0, forecast,"temperature","Feels_like", "humidity","wind_speed","cloudcover","Precipitation",cityname);
                displayweather(1, forecast,"temperature2","Feels_like2", "humidity2","wind_speed2","cloudcover2","Precipitation2", cityname);
                displayweather(2, forecast,"temperature3","Feels_like3", "humidity3","wind_speed3","cloudcover3","Precipitation3",cityname);
                displayweather(3, forecast,"temperature4","Feels_like4", "humidity4","wind_speed4","cloudcover4","Precipitation4", cityname);
                displayweather(4, forecast,"temperature5","Feels_like5", "humidity5","wind_speed5","cloudcover5","Precipitation5",cityname);


                return forecast;
            } catch (error) {
                console.error("Error fetching forecast by location:", error);
                alert("Failed to fetch forecast by location.");
                return null;
            }
        }, error => {
            alert("Geolocation is not available.");
        });
    } else {
        alert("Geolocation is not supported.");
    }
}


function displayweather(day,forecast_list,temp,feels_like,humidity,wind_speed,cloud,precipitation,cityname){
    document.getElementById(temp).innerHTML = `Temperature (&deg;C): ${forecast_list[day].temp}`;
    document.getElementById(feels_like).innerHTML = `Feels like: ${forecast_list[day].feels_like}`;
    document.getElementById(humidity).innerHTML = `Humidity: ${forecast_list[day].humidity}%`;
    document.getElementById(wind_speed).innerHTML = `Wind speed: ${forecast_list[day].wind_speed} m/s`;
    document.getElementById(cloud).innerHTML = `Cloud cover: ${forecast_list[day].cloud_cover}%`;
    document.getElementById(precipitation).innerHTML = `Precipitation: ${forecast_list[day].precipitation}mm`;
    document.getElementById("cityname").innerHTML=cityname.toUpperCase(); 
}
