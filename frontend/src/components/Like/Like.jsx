import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import './Movie.css';

// export const useGetComment = (commentId) => {
//   const [comment, setcomment] = useState(null);
//   const [commentLoadingError, setCommentLoadingError] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKDEND_URL}/comments/${commentId}`)
//       .then((response) => {
//         setcomment(response.data.comment);
//         // console.log(response.data.comment);
//         // console.log(comment);
//       })
//       .catch((error) => {
//         setCommentLoadingError('An error occured while reading comment info.');
//         console.error(error);
//       });
//   }, [commentId]);

//   return { comment, commentLoadingError };
// };

export function Like(movie) {
  if (movie.movie == null) {
    return <p>No movie sorry bro!</p>;
  } else {

    return (
      //Display the count of likes
      //show a like button the user can click to like/unlike
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
