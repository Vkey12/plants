
let currentTemp 
let temperatureButton = document.getElementById('temperature-button');
let fanLevelButton = document.getElementById('fan-level-button');
const fanLevelDisplay = document.createElement('p');

document.addEventListener("DOMContentLoaded", () => {
  // Function to fetch temperature from the API
  //fetchTemperature();
  function fetchTemperature() {
    fetch("https://corsproxy.io/?"+"https://goweather.herokuapp.com/weather/Nairobi")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            currentTemp = data.temperature;
            console.log(currentTemp)
            // Call the calculateFanLevel function after fetching the temperature
            const fanLevel = calculateFanLevel(currentTemp);
            console.log("Fan Level:", fanLevel);
            // Display the fan level value in the HTML
            let fanLevelDisplay = document.getElementById('fan-level-display');
            fanLevelDisplay.textContent = `Fan Level: ${fanLevel}`;
        })
        .catch(error => {
            console.error("Error fetching temperature:", error);
            alert("Failed to fetch temperature. Please try again later.");
        });
  }

  // Function to calculate fan level based on temperature
  function calculateFanLevel(temperature) {
    temperature = parseInt(currentTemp);
    if (temperature < 0) {
        return 90;
    } else if (temperature >= 1 && temperature <= 5) {
        return 60;
    } else if (temperature >= 6 && temperature <= 15) {
        return 50;
    } else if (temperature >= 16 && temperature <= 19) {
        return 25;
    } else if (temperature === 20) {
        return 0;
    } else if (temperature >= 21 && temperature <= 25) {
        return 125;
    } else if (temperature >= 26 && temperature <= 35) {
        return 150;
    } else if (temperature >= 36 && temperature <= 50) {
        return 150;
    } else if (temperature >= 51 && temperature <= 65) {
        return 200;
    } else if (temperature > 65) {
        return 150 + (temperature - 65) * 2;
    }
  }

  // Add click event listener to the "Check Temperature" button
  
  temperatureButton.addEventListener('click', () => {
    // Call the updateFanLevel function when the "Check Temperature" button is clicked
    fetchTemperature();
  });

  // Add click event listener to the "Check Fan Level" button

  fanLevelButton.addEventListener('click', () => {
    // Call the updateFanLevel function when the "Check Fan Level" button is clicked
    calculateFanLevel(currentTemp);
  });

  // Create a new paragraph element to display the current temperature
  fanLevelDisplay.id = 'fan-level-display';
  document.body.appendChild(fanLevelDisplay);
})


