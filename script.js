const API_KEY = "85223745366431bf4ecec41321a70e01";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const form = document.getElementById('form');
const search = document.getElementById('searchbar');
const main = document.getElementById('main');

// Fetch movies from TMDB API
const apifetch = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
};

// Display movies dynamically with a Review Button
const displayMovies = (movies) => {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCard");

    const image = document.createElement("img");
    image.src = movie.poster_path ? IMG_PATH + movie.poster_path : "placeholder.jpg";
    image.alt = movie.title;

    const movieTitle = document.createElement("h2");
    movieTitle.innerHTML = movie.title;

    // Review Button - Opens review.html with movie ID as a query parameter
    const reviewBtn = document.createElement("button");
    reviewBtn.innerText = "Review";
    reviewBtn.addEventListener("click", () => openReviewPage(movie.id));

    movieCard.appendChild(image);
    movieCard.appendChild(movieTitle);
    movieCard.appendChild(reviewBtn);
    main.appendChild(movieCard);
  });
};

// Function to open review.html with the movie ID in the URL
function openReviewPage(movieId) {
  window.location.href = `review.html?movieId=${movieId}`;
}

// Search functionality to fetch and display movies based on search term
const handleSearch = (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (!searchTerm) return;

  apifetch(SEARCH_API + searchTerm).then(displayMovies);
  search.value = '';
};

// Add event listener for the search form
form.addEventListener('submit', handleSearch);

// Initial fetch and display of popular movies
apifetch(API_URL).then(displayMovies);
