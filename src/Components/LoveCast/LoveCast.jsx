import React, { useEffect, useState } from 'react';
import './LoveCast.css';
import LoadingPage from './LoadingPage';

import search_icon from '../Assets/search.png';
import cloudy_day_icon from '../Assets/cloudy_day.png';
import cloudy_night_icon from '../Assets/cloudy_night.png';
import night_icon from '../Assets/night.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import sunny_icon from '../Assets/sunny.png';
import thunder_icon from '../Assets/thunder.png';
import windy_icon from '../Assets/windy.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';
import cloudy_icon from '../Assets/cloudy.png';
import logo_icon from '../Assets/logo.png';
import music_icon from '../Assets/music.png';

const LoveCast = () => {
  let api_key = "04f96754619cfa5f4f575c7e848c226c";

  const [isDay, setIsDay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isYouTubeVisible, setIsYouTubeVisible] = useState(false);

  const getTimeZone = async (latitude, longitude, timestamp) => {
    const apiKey = "AIzaSyDMADIjGPWmMOlqHM6gXp21XNSOPBtufvg";
    const apiUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude}%2C${longitude}&timestamp=${timestamp}&key=${apiKey}`;

    try {
      let response = await fetch(apiUrl);
      let data = await response.json();
      console.log("Time Zone API Response:", data);
      return data;
    } catch (error) {
      console.error("Error fetching time zone data:", error);
      return null;
    }
  };

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      console.error("No city entered.");
      return 0;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let data = await response.json();
      console.log("API Response:", data);

      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      temperature[0].innerHTML = data.main.temp + "°c";
      location[0].innerHTML = data.name;

      const weatherCondition = data.weather[0].main;
      const timestamp = data.dt;
      const timeZoneData = await getTimeZone(data.coord.lat, data.coord.lon, timestamp);

      // Check if it's day or night based on the fetched time zone data
      setIsDay(isDayTime(timeZoneData));

      // Get weather condition and set the weather icon dynamically
      const weatherIcon = getWeatherIcon(weatherCondition);
      document.getElementById("weather-icon").src = weatherIcon;

      // Display time above the search bar
      displayTime(timeZoneData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const isDayTime = (timeZoneData) => {
    if (!timeZoneData) {
      return true; // Default to day if time zone data is not available
    }

    const currentTime = new Date().getTime() / 1000;
    const sunsetTime = timeZoneData.dstOffset + timeZoneData.rawOffset + timeZoneData.sunset;
    const sunriseTime = timeZoneData.dstOffset + timeZoneData.rawOffset + timeZoneData.sunrise;

    // Check if it's day or night based on the current time and sunset/sunrise times
    return currentTime >= sunriseTime && currentTime <= sunsetTime;
  };

  const getWeatherIcon = (weatherCondition) => {
    const iconMapping = {
      'Clear Day': sunny_icon,
      'Clear Night': night_icon,
      'Cloudy Day': cloudy_day_icon,
      'Cloudy Night': cloudy_night_icon,
      'Snow': snow_icon,
      'Rain': rain_icon,
      'Drizzle': rain_icon,
      'Thunderstorm': thunder_icon,
      'Mist': cloudy_icon,
      'Fog': cloudy_icon,
      'Smoke': cloudy_icon,
      'Haze': cloudy_icon,
      'Dust': cloudy_icon,
      'Sand': cloudy_icon,
      'Ash': cloudy_icon,
      'Squall': windy_icon,
      'Tornado': windy_icon,
    };

    return iconMapping[weatherCondition] || (isDay ? sunny_icon : night_icon);
  };

  const displayTime = (timeZoneData) => {
    const timeElement = document.getElementById("weather-time");
    if (timeElement && timeZoneData) {
      const currentTime = new Date().toLocaleTimeString(undefined, {
        timeZone: timeZoneData.timeZoneId,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      timeElement.innerText = currentTime;
    }
  };

  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log("User's Location:", latitude, longitude);

          // Use latitude and longitude to fetch weather data or any other functionality
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    // Simulate loading time (change the timeout duration to 10000 for 10 seconds)
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const toggleYouTube = () => {
    setIsYouTubeVisible(!isYouTubeVisible);
  };

  return (
    <div>
      <div className="container-wrapper">
        <div className="container">
          <div className="top-bar">
            <div id="weather-time" className="weather-time"></div>
            <div className="search-container">
              <input type="text" className="cityInput" placeholder="search" />
              <div className="search-icon" onClick={search}>
                <img src={search_icon} alt="" />
              </div>
            </div>
          </div>
          <div className='weather-image'>
            <img id="weather-icon" src={cloudy_day_icon} alt="" />
          </div>
          <div className='weather-temp'>56°c</div>
          <div className='weather-location'>Los Angeles</div>
        </div>
      </div>
      <div id="second-container" className="container">
        <p style={{ color: '#FFFFFF' }}>Love Cast:</p>
        {isYouTubeVisible && (
          <div>
            <iframe
              width="75%"
              height="250"
              src="https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?si=k7HkDutBMQQyA7Zc"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <button className="music-button" onClick={toggleYouTube}>
          <img src={music_icon} alt="Music Icon" />
        </button>
      </div>
    </div>
  );
};

export default LoveCast;
