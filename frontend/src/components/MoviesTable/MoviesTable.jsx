import { useEffect, useState } from 'react';
import axios from 'axios';
import './MoviesTable.css';

export const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/movies`)
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((error) => {
        setMoviesLoadingError('An error occured while fetching movies.');
        console.error(error);
      });
  }, []);

  return { movies, moviesLoadingError };
};

function MoviesTable() {
  const { movies, moviesLoadingError } = useFetchMovies();

  const deleteMovie = (movieId) => {
    axios.delete(`${import.meta.env.VITE_BACKDEND_URL}/movies/${movieId}`);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>release_date</th>
            <th>cover</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.release_date}</td>
              <td>
                <img src={movie.backdrop_path} alt="movie backdrop"></img>
              </td>
              <td>{movie.description}</td>
              <td>
                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {moviesLoadingError !== null && (
        <div className="movies-loading-error">{moviesLoadingError}</div>
      )}
    </div>
  );
}

export default MoviesTable;
