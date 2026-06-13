import React, { useEffect, useState } from 'react';
import '../styles/WeatherCard.css';

const WeatherCard = () => {

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

 
  const [currentTime, setCurrentTime] = useState(new Date());

 
  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentTime(new Date());

    }, 1000);

    return () => clearInterval(interval);

  }, []);


  useEffect(() => {

    async function fetchWeather() {

      try {

        const city = "pune";

        const API = import.meta.env.VITE_WEATHER_API_KEY;
       

        const url =
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`;

        setLoading(true);

        const response = await fetch(url);

        const data = await response.json();

        setWeather(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    }

    fetchWeather();

  }, []);

  const timeString = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const currentDate = currentTime.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  

  return (

    <div className="weatherCard">

      <div className="weatherTop">

        <h1>
          {
            loading
              ? "PUNE"
              : weather?.name?.toUpperCase()
          }
        </h1>

        <h3>{timeString}</h3>

        <h3>{currentDate}</h3>

      </div>

      <div className="weatherBottom">

        {
          loading
            ? <h2>Loading...</h2>
            : (
              <h1>
                {Math.round(weather.main.temp)}°C
              </h1>
            )
        }

      </div>

    </div>

  );
};

export default WeatherCard;