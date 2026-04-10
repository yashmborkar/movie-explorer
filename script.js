const API_KEY = "24bde983";

let allMovies = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

async function searchMovies() {
  const query = document.getElementById("search").value;
  const loading = document.getElementById("loading");

  loading.innerText = "Loading...";

  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await res.json();

    loading.innerText = "";

    if (data.Response === "False") {
      displayMovies([]);
      return;
    }

    allMovies = data.Search;
    displayMovies(allMovies);

  } catch (err) {
    loading.innerText = "Error fetching data";
  }
}

function displayMovies(movies) {
  const moviesDiv = document.getElementById("movies");

  moviesDiv.innerHTML = movies.map(movie => `
    <div class="card">
      <img src="${movie.Poster}" />
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <button onclick="toggleFavorite('${movie.imdbID}')">
        ${favorites.includes(movie.imdbID) ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  `).join("");
}

function filterSearch() {
  const query = document.getElementById("search").value.toLowerCase();

  const filtered = allMovies.filter(movie =>
    movie.Title.toLowerCase().includes(query)
  );

  displayMovies(filtered);
}

function sortMovies(order) {
  let sorted = [...allMovies];

  if (order === "az") {
    sorted.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (order === "za") {
    sorted.sort((a, b) => b.Title.localeCompare(a.Title));
  }

  displayMovies(sorted);
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayMovies(allMovies);
}