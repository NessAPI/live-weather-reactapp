import React, {useState} from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  const errorNotify = () => toast("Locatie niet gevonden.");

  const API_KEY = process.env.REACT_APP_API_KEY;

  const [data,setData] = useState({})
  const  [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric&lang=nl`
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
/*         console.log(response.data)
 */      })
      .catch(function (error) {
/*         console.log(JSON.stringify(error))
 */        errorNotify()
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <ToastContainer
        hideProgressBar={true}
      />
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Locatie'
        type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
          {data.weather ? <p>{data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1) }</p> : null}
          </div>
         </div>
      </div>
{data.name != undefined && 
      <div className="bottom">
      <div className="feels">
        {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
        <p>Voelt Als</p>
      </div>
      <div className="humidity">
        {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
        <p>Vochtigheid</p>
      </div>
      <div className="wind">
        {data.wind ? <p className="bold">{data.wind.speed.toFixed()} KMU</p> : null}
        <p>Windsnelheid</p>
      </div>
    </div>
}


    </div>
  );
}

export default App;
