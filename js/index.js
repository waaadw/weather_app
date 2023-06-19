const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const infoTxt = document.querySelector('.info-txt');
const infoCenter = document.querySelector('.inform-center');
const infoLeft = document.querySelector('.inform-left');
const infoRight = document.querySelector('.inform-right');
const weatherIcon = document.querySelector('.weather-icon');

search.addEventListener('click', () =>{
    const APIKey = 'b88a57e21272c8750400638fcfa57d6a';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
    return;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json =>{
            if (json.cod ==='404'){
                infoTxt.classList.add('error');
                infoTxt.innerText = 'Something went wrong';
                return;
            }
        
                infoTxt.classList.remove('error');
        
            
            const temperature = document.querySelector('.temperature');
            const wind = document.querySelector('.wind-speed');
            const windArrow = document.querySelector('#wind-arrow')
            const windDirection = document.querySelector('.wind-direction');
            const sunrise = document.querySelector('.sunrise-time');
            const sunset = document.querySelector('.sunset-time');
            const humidity = document.querySelector('.humidity');
            const pressure = document.querySelector('.pressure');
            const feelsLike = document.querySelector('.temp-feels')
            const date = document.querySelector('#date');
            const day = document.querySelector('#day')
            const weatherStatus = document.querySelector('#weather-status');

            var dt = new Date()
            var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            day.innerHTML = (days[dt.getDay()]);
            var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            date.innerHTML = (months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear());
            
            const city = document.querySelector('.city');
            city.innerHTML = (json.name + ", " + json.sys.country);
            temperature.innerHTML = `+ ${parseInt(json.main.temp)}`;
            weatherStatus.innerHTML = (json.weather[0].main);
            const{deg} = json.wind;

            if(deg == 0){
                windArrow.className = 'bx bx-down-arrow-circle';
                windDirection.innerText = 'Wind: North';
            }else if(deg >= 1 && deg <= 45){
                windArrow.className = 'bx bx-left-down-arrow-circle bx-tada';
                windDirection.innerText = 'Wind: Northeast';
            }else if(deg >= 46 && deg <= 90){
                windArrow.className = 'bx bx-left-arrow-circle bx-tada';
                windDirection.innerText = 'Wind: East';
            }else if(deg >=91 && deg <= 135){
                windArrow.className = 'bx bx-left-top-arrow-circle bx-tada';
                windDirection.innerText = 'Wind: Southeast';
            }else if(deg >= 136 && deg <= 180){
                windArrow.className = 'bx bx-up-arrow-circle bx-tada bx-rotate-270';
                windDirection.innerText = 'Wind: South';
            }else if(deg >= 181 && deg <= 225){
                windArrow.className = 'bx bx-right-top-arrow-circle bx-tada bx-rotate-270';
                windDirection.innerText = 'Wind: Southwest';
            }else if (deg >= 226 && deg <=270){
                windArrow.className = 'bx bx-right-arrow-circle bx-tada bx-rotate-270';
                windDirection.innerText = 'Wind: West';
            }else if(deg >= 271 && deg <= 315){
                windArrow.className = 'bx bx-right-down-arrow-circle bx-tada bx-rotate-270';
                windDirection.innerText = 'Wind: Northwest';
            }else if (deg >=316 && deg <=360){
                windArrow.className = 'bx bx-down-arrow-circle bx-tada';
                windDirection.innerText = 'Wind: North';
            }
            const{main} = json.weather[0];
            if(main === 'Clear'){
                weatherIcon.src = 'images\clear.png';
            }else if(main === 'Rain'){
                weatherIcon.src = 'images\rain.png';
            }else if(main === 'Haze'){
                weatherIcon.src = 'images\mist.png';
            }else if(main === 'Snow'){
                weatherIcon.src = 'images\snow.png';
            }else if(main === 'Clouds'){
                weatherIcon.src = 'images\cloud.png';
            }

            wind.innerHTML= `${parseInt(json.wind.speed)} m/s`;

            var sunriseUTC = json.sys.sunrise * 1000;
            var sunsetUTC = json.sys.sunset * 1000;
            var sunriseDt = new Date(sunriseUTC);
            var sunsetDt = new Date (sunsetUTC);
            sunrise.innerHTML = ((sunriseDt.getHours()>12?(sunriseDt.getHours()-12):sunriseDt.getHours()).toString() + ":" + ((sunriseDt.getMinutes() < 10 ? '0' : '').toString() + sunriseDt.getMinutes().toString()) + (sunriseDt.getHours() < 12 ? ' AM' : ' PM').toString());
            sunset.innerHTML = ((sunsetDt.getHours()>12?(sunsetDt.getHours()-12):sunsetDt.getHours()).toString() + ":" + ((sunsetDt.getMinutes() < 10 ? '0' : '').toString() + sunsetDt.getMinutes().toString()) + (sunsetDt.getHours() < 12 ? ' AM' : ' PM').toString());
            
            humidity.innerHTML = `${(json.main.humidity)} %`;
            pressure.innerHTML = `${(json.main.pressure)} hPa`;
            feelsLike.innerHTML = `${parseInt(json.main.feels_like)} °C`

        
        })

})
