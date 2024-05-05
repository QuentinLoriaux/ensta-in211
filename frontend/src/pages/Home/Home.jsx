import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './Home.css';
import Movie from '../../components/Movie/Movie';
import { useFetchMovies } from '../../components/MoviesTable/MoviesTable';

// const popularMoviesURL =
//   'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=522d421671cf75c2cba341597d86403a';

// const useFetchMovies = () => {
//   const [movies, setMovies] = useState([]);
//   useEffect(() => {
//     console.log('Chargement de la page Home');
//     axios
//       .get(popularMoviesURL)
//       .then((response) => {
//         // Do something if call succeeded
//         console.log('donnees de film chargees');
//         setMovies(response.data.results);
//       })
//       .catch((error) => {
//         // Do something if call failed
//         console.log('probleme');
//         console.log(error);
//       });
//   }, []);

//   return { movies };
// };

function Home() {
  const [movieName, setMovieName] = useState('');
  const { movies } = useFetchMovies();
  const [listMovies, setListMovies] = useState([]);
  const [Result, setResult] = useState('');
  const initialRender = useRef(true); //to prevent filter on startup, useless

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(movieName.toLowerCase()),
      );
      setListMovies(filteredMovies.map((elt) => <Movie movie={elt} />));
      if (filteredMovies.length === 0) {
        setResult("Aucun résultat n'a été trouvé.");
      } else {
        setResult(filteredMovies.length.toString() + ' résultats');
      }
    }
  }, [movieName, movies]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Film Mania</p>
        <label>
          Entrer un film :{' '}
          <input
            value={movieName} // ...force the input's value to match the state variable...
            onChange={(e) => setMovieName(e.target.value)}
          />
        </label>
        <p>{movieName}</p>
        <p>{Result}</p>
        <ul id="movieList">{listMovies}</ul>
        {/* <img src={logo} className="App-logo" alt="logo" />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default Home;
