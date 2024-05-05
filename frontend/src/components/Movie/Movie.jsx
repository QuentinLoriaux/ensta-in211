import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Movie.css';

export const useGetMovie = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [movieLoadingError, setMovieLoadingError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/movies/${movieId}`)
      .then((response) => {
        setMovie(response.data.movie);
        // console.log(response.data.movie);
        // console.log(movie);
      })
      .catch((error) => {
        setMovieLoadingError('An error occured while reading movie info.');
        console.error(error);
      });
  }, [movieId]);

  return { movie, movieLoadingError };
};

export function Movie(movie) {
  if (movie.movie == null) {
    return <p>No movie sorry bro!</p>;
  } else {
    const movieLink = '/movies/' + movie.movie.id;

    return (
      <li key={movie.movie.id.toString()} className="listItem">
        <div id="movieName">{movie.movie.title}</div>
        <div id="movieRelease">release : {movie.movie.release_date}</div>
        <Link className="Link" to={movieLink}>
          <img src={movie.movie.backdrop_path} alt="movie backdrop"></img>
        </Link>
      </li>
    );
  }
}
export default Movie;
