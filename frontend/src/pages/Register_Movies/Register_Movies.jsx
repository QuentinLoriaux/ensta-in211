import './Register_Movies.css';
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm';
import MoviesTable from '../../components/MoviesTable/MoviesTable';

function Register_Movies() {
  return (
    <div className="Movies-container">
      <h1>You can add a movie here.</h1>
      <AddMovieForm />
      <MoviesTable />
    </div>
  );
}

export default Register_Movies;
