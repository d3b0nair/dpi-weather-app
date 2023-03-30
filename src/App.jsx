import React from 'react';
import { fetchWeather, dateBuilder, reverseGeolocation } from './helpers';
import './App.css';

function App() {
  const [weather, setWeather] = React.useState({});
  const [inputValue, setInputValue] = React.useState('');

  const geoLocationCallback = async (res) => {
    const location = await reverseGeolocation(
      res.coords.latitude,
      res.coords.longitude
    );
    await fetchWeather(location, setWeather);
  };

  return (
    <div className="app-wrap">
      <header>
        <input
          type="text"
          autoComplete="off"
          className="search-box"
          placeholder="Search for a city..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) =>
            e.key === 'Enter' ? fetchWeather(inputValue, setWeather) : null
          }
        />
        <button
          className="button"
          onClick={(e) =>
            navigator.geolocation.getCurrentPosition(geoLocationCallback)
          }
        >
          Locate me
        </button>
      </header>
      <main>
        <section className="location">
          <div className="city">
            {weather.name && weather.sys.country
              ? `${weather.name}, ${weather.sys.country}`
              : 'City not found'}
          </div>
          <div className="date">{dateBuilder()}</div>
        </section>
        <div className="current">
          <div className="temp">
            {weather.main && weather.main.temp
              ? Math.round(weather.main.temp)
              : '0'}
            <span>°c</span>
          </div>
          {weather.weather && weather.weather[0].main && (
            <div className="weather">{weather.weather[0].main}</div>
          )}
          {weather.main && (
            <div className="hi-low">
              {`${Math.round(weather.main.temp_min)}°c / ${Math.round(
                weather.main.temp_max
              )}°c`}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
