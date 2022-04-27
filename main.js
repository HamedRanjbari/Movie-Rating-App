let $ = document;
const main = $.getElementById("main")
const apiUrl =
'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=885949e17cec3f9c3d7f4b7743fdf2d0&page=1';
const imageSrc = 'https://image.tmdb.org/t/p/w1280';
const searchUrl =
'https://api.themoviedb.org/3/search/movie?api_key=885949e17cec3f9c3d7f4b7743fdf2d0&query="';
const form = $.getElementById("form")
const search = $.getElementById("search")

// movie data
getMovies(apiUrl)
async function getMovies(url) {
  const result = await fetch(url)
  const data = await result.json()

  showMovies(data.results);
}

// movie detail
function showMovies(movies) {
  main.innerHTML = ""
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie
    
    const movieElem = $.createElement("div")
    movieElem.classList.add("movie")
    movieElem.innerHTML = `
      <img src="${imageSrc + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `;
    main.appendChild(movieElem)
  })
}

// movie rating
function getClassRate(vote) {
  if (vote >= 7) {
    return "green"
  } else if (vote >= 5) {
    return "orange"
  } else {
    return "red"
  }
}

// search box
form.addEventListener("submit", (e) => {
  e.preventDefault()
  const searchBase = search.value

  if (searchBase && searchBase !== "") {
    getMovies(searchUrl + searchBase)
    search.value = ''
  } else {
    window.location.reload()
  }
})