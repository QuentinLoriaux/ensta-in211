import axios from 'axios';

const popularMoviesURL =
  'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=522d421671cf75c2cba341597d86403a';

const imgURL = 'https://image.tmdb.org/t/p/w500';

axios
  .get(popularMoviesURL)
  .then((response) => {
    // Do something if call succeeded
    console.log('donnees de film chargees');
    const movies = response.data.results;
    for (const movie of movies) {
      movie.backdrop_path = imgURL + movie.backdrop_path;
      movie.description = movie.overview;
      axios
        .post(`${process.env.VITE_BACKDEND_URL}/movies/new`, movie)
        .then(() => {
          console.log('successfuly populated movie database');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  })
  .catch((error) => {
    // Do something if call failed
    console.log('probleme');
    console.log(error);
  });
