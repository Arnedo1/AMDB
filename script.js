const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGIyNzQ1YWQ4OTI2OTI1M2JiYmJiN2RiZDczZDU5MSIsIm5iZiI6MTczNzY1MDQ4OS42NDMwMDAxLCJzdWIiOiI2NzkyNzEzOWVhNjQ2ODIzNGVlYWQxMTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.abOf3qCh023kezAu5bVrYHyrtxA9gDEf5b48QWCzVRI'  // Replace with your actual token
    }
  };
  
//   global const variables
  const input = document.querySelector('.input')
  const infoSpace = document.querySelector('.info')
  const moviesToggle = document.querySelector('.movie')
  const tvShowsToggle = document.querySelector('.tvShow')
  const btn = document.querySelector('button')
  
//   function get the movie data
  async function getMovieInfo(title) {
      try {
          const movieUrl = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&query=${title}`
          const res = await fetch(movieUrl, options)
          const movieInfo = await res.json()
          console.log(movieInfo.results)
          toTheDom(movieInfo.results[0])
          input.value = ''
      } catch (error) {
          console.log(error)
      }
  }
//   function get the serie data
  async function getSerieInfo(title) {
    try {
        const serieUrl = `https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&query=${title}`
        const res = await fetch(serieUrl, options)
        const serieInfo = await res.json()
        console.log(serieInfo.results)
        toTheDomSerie(serieInfo.results[0])
        input.value = ''
    } catch (error) {
        console.log(error)
    }
}
// function put all the serie data to the page
const toTheDomSerie = (movieData) => {
    infoSpace.className = 'movie-card'
    if (!movieData) {
        infoSpace.innerHTML = 'Error, cannot find title. Please try again';
        return;
    }
    
    infoSpace.innerHTML = `<h2>${movieData.name}</h2>
    <img src="https://image.tmdb.org/t/p/w500${movieData.poster_path}" >
    
    <p><strong>Release-date:</strong> ${movieData.first_air_date}</p>
    <p><strong>Rating:</strong> ${movieData.vote_average} / 10</p>
    <p><strong>Description:</strong> ${movieData.overview}</p>`
}
// function put all the movie data to the page
const toTheDom = (movieData) => {
    infoSpace.className = 'movie-card'
    if (!movieData) {
        infoSpace.innerHTML = 'Error, cannot find title. Please try again';
        return;
    }
    
    infoSpace.innerHTML = `<h2>${movieData.title}</h2>
    <img src="https://image.tmdb.org/t/p/w500${movieData.poster_path}" >
    
    <p><strong>Release-date:</strong> ${movieData.release_date}</p>
    <p><strong>Rating:</strong> ${movieData.vote_average} / 10</p>
    <p><strong>Description:</strong> ${movieData.overview}</p>`
}

// function capatilize the first letter when typing
input.addEventListener('input', () => {
    if (input.value.length > 0) {
        input.value = input.value[0].toUpperCase() + input.value.slice(1)
    }
})
// function when pressing the enter key the value from the inputfield gets searched for
input.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
        if (moviesToggle.style.color === 'yellow'){
        getMovieInfo(input.value)
        input.value = ''
        } else {getSerieInfo(input.value)
            input.value = ''}}
})

moviesToggle.addEventListener('click', () => {
    if (moviesToggle.style.color !== 'yellow') {
        moviesToggle.style.color = 'yellow';
        tvShowsToggle.style.color = 'black';
        input.placeholder = "Enter Movie title";
        // Now it's a function, not a string
        btn.onclick = () => getMovieInfo(input.value);
    }
});

tvShowsToggle.addEventListener('click', () => {
    if (tvShowsToggle.style.color !== 'yellow') {
        tvShowsToggle.style.color = 'yellow';
        moviesToggle.style.color = 'black';
        input.placeholder = "Enter TV Show title";
        // Now it's a function, not a string
        btn.onclick = () => getSerieInfo(input.value);
    }
});
