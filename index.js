// Array to store fetched movies data
let moviesData = [];

// Function to fetch movie data from OMDB API
function fetchMovieData(apiKey, movieTitle) {
    return new Promise((resolve, reject) => {
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieTitle)}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.Response === "False") {
                    reject(new Error(data.Error));
                } else {
                    resolve(data.Search);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Function to search for movies based on the input
function searchMovie() {
    const apiKey = '115c5b61';  // OMDB API key
    const movieTitle = document.getElementById('movieTitle').value;

    fetchMovieData(apiKey, movieTitle)
        .then(data => {
            moviesData = data.slice(0, 6); // Limiting to 6 results
            displayMovies(moviesData);
        })
        .catch(error => {
            const resultContainer = document.getElementById('resultContainer');
            resultContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        });
}

// Function to display movie data as cards
function displayMovies(movies) {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = ''; // Clear previous results

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="Poster of ${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;
        movieGrid.appendChild(movieCard);
    });
}

// Function to apply sorting filter
function applyFilter() {
    const filterValue = document.getElementById('filter').value;

    if (filterValue === 'asc') {
        moviesData.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (filterValue === 'desc') {
        moviesData.sort((a, b) => b.Title.localeCompare(a.Title));
    }

    displayMovies(moviesData);
}
