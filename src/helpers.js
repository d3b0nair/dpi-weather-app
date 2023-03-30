const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

export const fetchWeather = async (query, setWeather) => {
  const weatherData = await fetch(
    `${API_URL}weather?q=${query}&units=metric&APPID=${API_KEY}`
  ).then((weather) => {
    return weather.json();
  });
  setWeather(weatherData);
};

export const reverseGeolocation = async (lat, lon) => {
  const geoLocation = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
  ).then((geo) => {
    return geo.json();
  });
  return `${geoLocation[0].name}, ${geoLocation[0].country}`;
};

export const dateBuilder = () => {
  let date = new Date(),
    month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};
