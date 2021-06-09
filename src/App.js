import React, {useEffect, useState} from "react";
import axios from "axios";
import "./App.css";

function App(){

  const [latitude, setLatitude]=useState([]);
  const [longitude, setLongitude]=useState([]);

  const [city, setCity]=useState([]);

  const [weather, setWeather]=useState([]);


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position=>{
      console.log(position.coords.latitude);
      console.log(position.coords.longitude)
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    console.log(latitude);
    console.log(longitude);

    axios.get("http://api.openweathermap.org/data/2.5/weather",{
      params:{
        lat: 43.739606099999996,
        lon: -79.3428093,
        units: "metric",
        appid:"8aba0675a2ca060b6a7e11538e834cfa"
      }

    })
    .then(result=>{
      setWeather(result.data);
      console.log(weather);
    })
  }, []);

  function handleChange(event){
    setCity(event.target.value);
  }

  function updateData(event){
    event.preventDefault();

    if (city===""){
      alert("Please specify a valid city to retrieve weather data.");
    }
    else{
      axios.get("http://api.openweathermap.org/data/2.5/weather",{
        params:{
          q: city,
          units: "metric",
          appid: "8aba0675a2ca060b6a7e11538e834cfa"
        }
      })
      .then(result=>{
        setWeather(result.data);
        console.log(weather);
      });
    }

    }



  return(
    <div className="app" style={{backgroundImage:"url(images/background.jpg)"}}>
      <h1>Weather NetX</h1>
      <div className="search-bar">
        <form>
          <input
            type="text"
            placeholder="Search for a city"
            value={city}
            onChange={e=>{handleChange(e)}}
          />
          <button
            onClick={(e)=>updateData(e)}
            className="btn btn-warning"
          >Go</button>
        </form>
      </div>
      {(typeof weather.main!="undefined")?(
        <div>
          <div className="weather-layout">
            <h3>{weather.name}</h3>
            <h6>Current Forecast</h6>
            <h3>{weather.main.temp} ℃</h3>
            <h6>{weather.weather[0].main}</h6>
          </div>
        </div>

      ): ("")}
    </div>
  );
}

export default App;