import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Movie, useGetMovie } from '../../components/Movie/Movie';
import { Like } from '../../components/Like/Like';

function Movie_Info() {
  const { movieId } = useParams();
  const { movie, movieLoadingError } = useGetMovie(movieId);
  //   console.log(movie);

  return (
    <div className="App">
      <header className="App-header">
        <Movie movie={movie} />
        <Like movieId={movieId}></Like>
      </header>
    </div>
  );
}

export default Movie_Info;
