import React, { useEffect, useState } from 'react';
import './LoveCast.css';
import LoadingPage from './LoadingPage';
import YouTube from 'react-youtube';

import search_icon from '../Assets/search.png';
import cloudy_day_icon from '../Assets/cloudy_day.png'; 
import cloudy_night_icon from '../Assets/cloudy_night.png'; 
import night_icon from '../Assets/night.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import sunny_icon from '../Assets/sunny.png';
import thunder_icon from '../Assets/thunder.png';
import music_icon from '../Assets/music.png';
import photo_icon from '../Assets/photo.png';
import logo_icon from '../Assets/logo.png';


const LoveCast = () => {
  let api_key = "04f96754619cfa5f4f575c7e848c226c";
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [wicon, setWicon] = useState(logo_icon);

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
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    try {
      let response = await fetch(url);
      let data = await response.json();
      console.log(data.weather[0].icon);
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
      const timestamp = data.dt;
      const timeZoneData = await getTimeZone(
        data.coord.lat,
        data.coord.lon,
        timestamp
      );

      displayTime(timeZoneData);

      temperature[0].innerHTML = data.main.temp + "°c";
      location[0].innerHTML = data.name;

      switch (data.weather[0].icon) {
        case "01d":
          setWicon(sunny_icon);
          break;
        case "01n":
          setWicon(night_icon);
          break;
        case "02d":
          setWicon(cloudy_day_icon);
          break;
        case "02n":
          setWicon(cloudy_night_icon);
          break;
        case "03d":
          setWicon(cloudy_day_icon);
          break;
        case "03n":
          setWicon(cloudy_night_icon);
          break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
          setWicon(rain_icon);
          break;
        case "11d":
        case "11n":
          setWicon(thunder_icon);
          break;
        case "13d":
        case "13n":
          setWicon(snow_icon);
          break;
        default:
          setWicon(sunny_icon);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const playMusic = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePhotoButtonClick = () => {
    // Handle the logic for photo button click
  };

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
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
                <img id="weather-icon" src={wicon} alt="" />
              </div>
              <div className='weather-temp'>cha x luna</div>
              <div className='weather-location'>i ♡ u</div>
            </div>
          </div>
          <div id="second-container" className="container">
            <p style={{ color: '#FFFFFF' }}>Love Cast:</p>
            <YouTube
              videoId="jfKfPfyJRdk"
              opts={{
                width: '560',
                height: '315',
                playerVars: {
                  autoplay: 0,
                  controls: 0,
                  showinfo: 0,
                  modestbranding: 1,
                  loop: 1,
                  origin: window.location.origin,
                },
              }}
              onReady={(event) => {
                event.target.setPlaybackQuality('hd1080');
                event.target.playVideo();
                setPlayer(event.target);
              }}
              className="youtube-player"
              style={{ display: 'none' }}
            />
            <div className="button-container">
              <button className="music-button" onClick={playMusic}>
                <img src={music_icon} alt="Music Icon" />
              </button>
              <button className="photo-button" onClick={handlePhotoButtonClick}>
                <img src={photo_icon} alt="Photos Icon" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoveCast;
