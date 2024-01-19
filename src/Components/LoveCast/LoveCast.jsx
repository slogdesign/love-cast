import React from 'react';
import './LoveCast.css';

import search_icon from '../Assets/search.png';
import cloudy_day_icon from '../Assets/cloudy_day.png';
import cloudy_night_icon from '../Assets/cloudy_night.png';
import cloudy_icon from '../Assets/cloudy.png';
import hearts_icon from '../Assets/hearts.png';
import logo_icon from '../Assets/logo.png';
import night_icon from '../Assets/night.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import sunny_icon from '../Assets/sunny.png';
import thunder_icon from '../Assets/thunder.png';
import windy_icon from '../Assets/windy.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const LoveCast = () => {
let api_key="04f96754619cfa5f4f575c7e848c226c"; 

const search = async () => {
  const element = document.getElementsByClassName("cityInput");
  if (element[0].value === "") {
    console.error("No city entered.");
    return 0;
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log("API Response:", data);

    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-speed");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = data.wind.speed + " km/h";
    temperature[0].innerHTML = data.main.temp + "°c";
    location[0].innerHTML = data.name;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="search" />
        <div className="search-icon">
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className='weather-image'>
        <img src={cloudy_day_icon} alt="" />
      </div>
      <div className='weather-temp'>56</div>
      <div className='weather-location'>Los Angeles</div>
      <div className='data-container'>
        <div className='element'>
        <img src={humidity_icon} alt="" className="icon" />
        <div className="data">
          <div className='humidity-percent'>82</div>
          <div className='text'>Humidity</div>
          </div>          
        </div>
        <div className='element'>
        <img src={wind_icon} alt="" className="icon" />
        <div className="data">
          <div className='wind-speed'>2</div>
          <div className='text'>Wind Speed</div>
          </div>          
        </div> 
      </div>
    </div>
  );
};

export default LoveCast;
