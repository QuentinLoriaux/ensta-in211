import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
// import './Movie.css';

const useGetLikes = (movieId) => {
  const [numbLikes, setNumbLikes] = useState(0);
  // const [numbLikesLoadingError, setNumbLikesLoadingError] = useState(null);

  if (movieId !== null) {
    useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_BACKDEND_URL}/likes/${movieId}`)
        .then((response) => {
          setNumbLikes(response.data.nbLikes);
        })
        .catch((error) => {
          console.error(error);

          return null;
        });
    }, [numbLikes, movieId]);

    return numbLikes;
  }
};

const setLike = (movieId) => {
  axios
    .get(
      `${import.meta.env.VITE_BACKDEND_URL}/likes/${movieId}/${Cookies.get(`id`)}`,
    )
    .then((response) => {
      if (response.data.nbLikes === 0) {
        axios.post(`${import.meta.env.VITE_BACKDEND_URL}/likes/new`, {
          movieId: movieId,
          userId: Cookies.get(`id`),
        }).then(() => window.location.reload());
      } else {
        axios.delete(
          `${import.meta.env.VITE_BACKDEND_URL}/likes/${movieId}/${Cookies.get(`id`)}`,
        ).then(() => window.location.reload());
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export function Like({ movieId }) {
  const numbLikes = useGetLikes(movieId);
  if (numbLikes == null) {
    return <p>Like error</p>;
  } else {
    return (
      //Display the count of likes
      //show a like button the user can click to like/unlike
      <div>
        <button onClick={() => setLike(movieId)}>J'aime </button>
        <p>{numbLikes} Likes</p>
      </div>
    );
  }
}
export default Like;
