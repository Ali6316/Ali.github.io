document.addEventListener("DOMContentLoaded", function () {
  // Function to add AR content when marker is detected
  function addARContent(latitude, longitude) {
    const apiKey = "b1b15e88fa797225412429c1c50c122a1"; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    // Fetch real-time environmental data from OpenWeatherMap API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        // Create and add AR content dynamically based on fetched data
        const arContentContainer =
          document.getElementById("arContentContainer");
        arContentContainer.innerHTML = `
                    <div class="ar-content">
                        <h2>${data.name}</h2>
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                    </div>`;
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function handleARInteraction() {
    // Add event listener to AR objects for interaction
    const arObjects = document.querySelectorAll(".ar-object");
    arObjects.forEach((object) => {
      object.addEventListener("click", () => {
        alert("You clicked on an AR object!");
      });
    });
  }

  // Listen for markerFound event to trigger adding AR content and interaction
  const marker = document.querySelector("a-marker");
  marker.addEventListener("markerFound", () => {
    const latitude = 53.2274;
    const longitude = -4.1299;
    addARContent(latitude, longitude);
    handleARInteraction();
  });
});
