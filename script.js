const apiKey = 'YOUR_API_KEY'; //your API key

const submitButton = document.getElementById('submit-btn');
const locationInput = document.getElementById('location-input');
const weatherInfoDiv = document.getElementById('weather-info');

submitButton.addEventListener('click', () => {
  const location = locationInput.value;
  if (location.trim() === '') {
    alert('Please enter a location');
    return;
  }

  fetchWeather(location);
});

async function fetchWeather(location) {
  try {
    const weatherURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
    const weatherResponse = await fetch(weatherURL);
    const weatherData = await weatherResponse.json();

    displayWeatherInfo(weatherData);
  } catch (error) {
    console.log('Error:', error);
    alert('An error occurred while fetching weather data');
  }
}

function displayWeatherInfo(data) {
  const location = data.location.name;
  const tempC = data.current.temp_c;
  const condition = data.current.condition.text;

  const weatherInfoHTML = `
    <h3>Current Weather</h3>
    <p>Location: ${location}</p>
    <p>Temperature: ${tempC}°C</p>
    <p>Condition: ${condition}</p>
  `;

  weatherInfoDiv.innerHTML = weatherInfoHTML;
}
