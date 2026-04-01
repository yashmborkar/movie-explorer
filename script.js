const API_KEY = "24bde983";

async function searchMovies() {
  const query = document.getElementById("search").value;
  const moviesDiv = document.getElementById("movies");
  const loading = document.getElementById("loading");

  loading.innerText = "Loading...";
  moviesDiv.innerHTML = "";

  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await res.json();

    loading.innerText = "";

    if (data.Response === "False") {
      moviesDiv.innerHTML = "<p>No movies found</p>";
      return;
    }

    data.Search.forEach(movie => {
      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <img src="${movie.Poster}" />
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      `;

      moviesDiv.appendChild(div);
    });

  } catch (err) {
    loading.innerText = "Error fetching data";
  }
}
