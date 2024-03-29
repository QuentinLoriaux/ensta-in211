import './Movie.css';
const imgURL = 'https://image.tmdb.org/t/p/w500/';

function Movie(movie) {
  const movieImgURL = imgURL + movie.movie.backdrop_path;

  return (
    <li key={movie.movie.id.toString()} className="listItem">
      <div id="movieName">{movie.movie.title}</div>
      <div id="movieRelease">release : {movie.movie.release_date}</div>
      <img src={movieImgURL} alt="movie backdrop"></img>
    </li>
  );
}

export default Movie;
