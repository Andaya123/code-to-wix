const planets = [
  {
    name: "Earth",
    orbitalPeriod: 365.25,
    color: "#2E86AB",
    fact: "Our home planet",
    animation: "assets/planets/earth.mp4"
  },
  {
    name: "Mercury",
    orbitalPeriod: 88,
    color: "#B5B5B5",
    fact: "Fastest orbiting planet",
    animation: "assets/planets/mercury.mp4"
  },
  {
    name: "Venus",
    orbitalPeriod: 224.7,
    color: "#E6AF2E",
    fact: "Hottest planet in the solar system",
    animation: "assets/planets/venus.mp4"
  },
  {
    name: "Mars",
    orbitalPeriod: 687,
    color: "#C1440E",
    fact: "The Red Planet",
    animation: "assets/planets/mars.mp4"
  },
  {
    name: "Jupiter",
    orbitalPeriod: 4333,
    color: "#D8C99B",
    fact: "Largest planet in solar system",
    animation: "assets/planets/jupiter.mp4"
  },
  {
    name: "Saturn",
    orbitalPeriod: 10759,
    color: "#E3DDB1",
    fact: "Famous for its rings",
    animation: "assets/planets/saturn.mp4"
  },
  {
    name: "Uranus",
    orbitalPeriod: 30687,
    color: "#D1E7E7",
    fact: "Rotates on its side",
    animation: "assets/planets/uranus.mp4"
  },
  {
    name: "Neptune",
    orbitalPeriod: 60190,
    color: "#5B5DDF",
    fact: "Windiest planet",
    animation: "assets/planets/neptune.mp4"
  },
  {
    name: "Pluto",
    orbitalPeriod: 90560,
    color: "#B5AEAE",
    fact: "Dwarf planet at the edge",
    animation: "assets/planets/pluto.mp4"
  }
];

function initPlanets() {
  const grid = document.getElementById("planets-grid");
  grid.innerHTML = "";

  planets.forEach((planet) => {
    const card = document.createElement("div");
    card.className = "planet-card";
    card.innerHTML = `
      <div class="planet-video-container">
        <video autoplay loop muted playsinline>
          <source src="${planet.animation}" type="video/mp4">
        </video>
      </div>
      <h3 class="planet-name">${planet.name}</h3>
      <p class="planet-age-label">Your Age:</p>
      <p class="planet-age" style="color:${planet.color}">0</p>
      <p class="planet-fact">${planet.fact}</p>
    `;
    grid.appendChild(card);
  });
}

function calculateAges() {
  const input = document.getElementById("age-input");
  const earthAge = parseFloat(input.value.trim());

  if (isNaN(earthAge)) {
    showNotification("Please enter a valid number!", "error");
    input.classList.add("input-error");
    return;
  }

  if (earthAge <= 0 || earthAge > 120) {
    showNotification("Age must be between 1 and 120", "error");
    input.classList.add("input-error");
    return;
  }

  input.classList.remove("input-error");

  planets.forEach((planet) => {
    const planetAge = (earthAge * planets[0].orbitalPeriod / planet.orbitalPeriod).toFixed(2);
    updatePlanetAge(planet.name, planetAge, planet.color);
  });

  showNotification("Your age has been calculated on all planets!", "success");
}

function updatePlanetAge(name, age, color) {
  const cards = document.querySelectorAll(".planet-card");
  cards.forEach((card) => {
    if (card.querySelector(".planet-name").textContent === name) {
      const ageElement = card.querySelector(".planet-age");
      ageElement.textContent = age;
      ageElement.style.color = color;
    }
  });
}

function showNotification(message, type) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification ${type} show`;
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  initPlanets();

  document.getElementById("calculate-btn").addEventListener("click", calculateAges);

  document.getElementById("age-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") calculateAges();
  });

  document.getElementById("age-input").addEventListener("input", () => {
    document.getElementById("age-input").classList.remove("input-error");
  });
});
