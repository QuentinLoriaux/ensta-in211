import './Movie.css';

function Movie(movie) {
  return (
    <li key={movie.movie.id.toString()} className="listItem">
      <div id="movieName">{movie.movie.title}</div>
      <div id="movieRelease">release : {movie.movie.release_date}</div>
      <img src={movie.movie.backdrop_path} alt="movie backdrop"></img>
    </li>
  );
}

export default Movie;
