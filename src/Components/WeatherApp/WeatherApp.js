import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
const WeatherApp = () => {

    let api_key = "3b0a04b39842db5212137ef4ca6f3e7a";
    const weatherIconList = [clear_icon, cloud_icon, drizzle_icon, rain_icon, snow_icon];
    const[weatherIcon, setWeatherIcon] = useState(null)
    const[humidity, setHumidity] = useState(null);
    const[windSpeed, setWindSpeed] = useState(null);
    const[location, setLocation] = useState(null);
    const[temp, setTemp] = useState(null);
    const searchRef = useRef('Kolkata');
    const[isError, setError] = useState(false)
    const[isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        search();
    },[])
    async function search(){
        setError(false)
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchRef.current}&units=Metric&appid=${api_key}`
        try{
            let response = await axios.get(url)
            let data = response.data;
            setIsLoading(false)
            setHumidity(data.main.humidity);
            setWindSpeed(data.wind.speed);
            setTemp(parseInt(data.main.temp));
            setLocation(data.name)
            console.log(data.weather[0].id)
            if(data.weather[0].id === 800) setWeatherIcon(weatherIconList[0]);
            else if(data.weather[0].id > 800) setWeatherIcon(weatherIconList[1]);
            else if(data.weather[0].id < 400 && data.weather[0].id >= 300) setWeatherIcon(weatherIconList[2]);
            else if(data.weather[0].id < 600 && data.weather[0].id >= 200) setWeatherIcon(weatherIconList[3]);
            else if(data.weather[0].id < 800 && data.weather[0].id >= 600) setWeatherIcon(weatherIconList[4]);
        }catch(error){
            setError(true)
        }  
    }
    function handleSearch(e){
        searchRef.current = e.target.value;
    }
  return (
    <div className='container'>
        <div className='nav-bar'>
       <div className='top-bar'>
            <input type="text" className='cityInput' placeholder="Search City" onChange={handleSearch}/>
            <div className='search-icon' onClick={search}>
                <img src={search_icon} alt=''/>
            </div>
       </div>
       </div>
       {isError && <div className='not-found'>Oops City Not Found !!</div>}
       {isLoading ?<div className='loading'>Loading...</div> 
       :
       <>
            <div class="weather-image">
                    <img src={weatherIcon} alt=''/>
            </div>
            <div className='weather-temp'>{temp}°c</div>
            <div className='weather-location'>{location}</div>
            <div className='data-container'>
                    <div className='element'>
                        <img src={humidity_icon} alt='' className='icon'/>
                        <div className='data'>
                            <div className='humidity-percent'>{humidity} %</div>
                            <div className='text'>Humidity</div>
                        </div>
                    </div>
                    <div className='element'>
                        <img src={wind_icon} alt='' className='icon'/>
                        <div className='data'>
                            <div className='wind-rate'>{windSpeed} km/h</div>
                            <div className='text'>Wind Speed</div>
                        </div>
                    </div>
            </div>
        </>}
    </div>
  )
}

export default WeatherApp
