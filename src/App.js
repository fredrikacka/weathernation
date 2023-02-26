import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  /*  const fahren = (x - 273.15) * (9 / 5 + 32); */
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [tempUnit, setTempUnit] = useState("c");
  const [temperature, setTemperature] = useState("");

  const [feels_temp, setFeels_temp] = useState();
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=5f26a41d371a7a8853eb1fd0529dfbaf"
      )
      .then((response) => {
        setData(response.data);
        setTemperature(response.data.main.temp.toFixed() + "°F");
        setFeels_temp(response.data.main.feels_like.toFixed() + "°F");
      });
  }, []);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" + location;
      const api =
        url + "&units=imperial&appid=5f26a41d371a7a8853eb1fd0529dfbaf";

      axios.get(api).then((response) => {
        setData(response.data);
        if (tempUnit === "f") {
          setTemperature(
            ((response.data.main.temp - 32) * (5 / 9)).toFixed() + "°C"
          );
          setFeels_temp(
            ((response.data.main.feels_like - 32) * (5 / 9)).toFixed() + "°C"
          );
        } else {
          setTemperature(response.data.main.temp.toFixed() + "°F");
          setFeels_temp(response.data.main.feels_like.toFixed() + "°F");
        }
        setLocation("");
      });
    }
  };

  /*  const intialUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=5f26a41d371a7a8853eb1fd0529dfbaf";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location;
  const api = url + "&units=imperial&appid=5f26a41d371a7a8853eb1fd0529dfbaf";

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=5f26a41d371a7a8853eb1fd0529dfbaf"
      )
      .then((response) => {
        setData(response.data);
        setTemperature(response.data.main.temp.toFixed() + "°F");
        setFeels_temp(response.data.main.feels_like.toFixed() + "°F");
      });
  }, []);
  useEffect(() => {
    if (tempUnit === "f") {
      setTemperature(((data.main.temp - 32) * (5 / 9)).toFixed() + "°C");
      setFeels_temp(((data.main.feels_like - 32) * (5 / 9)).toFixed() + "°C");
    } else {
      setTemperature(data.main.temp.toFixed() + "°F");
      setFeels_temp(data.main.feels_like.toFixed() + "°F");
    }
  }, [tempUnit]);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" + location;
      const api =
        url + "&units=imperial&appid=5f26a41d371a7a8853eb1fd0529dfbaf";

      axios.get(api).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      if (tempUnit === "c") {
        setTempUnit("f");
        setTemperature(((data.main.temp - 32) * (5 / 9)).toFixed() + "°C");
        setFeels_temp(((data.main.feels_like - 32) * (5 / 9)).toFixed() + "°C");
      } else {
        setTempUnit("c");
        setTemperature(data.main.temp.toFixed() + "°F");
        setFeels_temp(data.main.feels_like.toFixed() + "°F");
      }
      setLocation("");
    }
  }; */
  function change() {
    if (tempUnit === "c") {
      setTempUnit("f");
      setTemperature(((data.main.temp - 32) * (5 / 9)).toFixed() + "°C");
      setFeels_temp(((data.main.feels_like - 32) * (5 / 9)).toFixed() + "°C");
    } else if (tempUnit === "f") {
      setTempUnit("c");
      setTemperature(data.main.temp.toFixed() + "°F");
      setFeels_temp(data.main.feels_like.toFixed() + "°F");
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <button className="FtoC" onClick={change}>
            Switch to °{tempUnit}
          </button>
          <div className="location">
            <p>{data.name}</p>
            <p>{data.sys.country}</p>
          </div>
          <div className="tempUnitMeasure"></div>
          <div className="temperatures">
            <h1>{temperature}</h1>
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <div>
              <p>Feels Like</p>
            </div>
            <div>
              <p>{feels_temp}</p>
            </div>
          </div>
          <div className="humidity">
            <p>Humidity</p>
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
          </div>
          <div className="wind">
            <p>Wind</p>
            {data.wind ? (
              <p className="bold"> {data.wind.speed.toFixed()} mph</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
