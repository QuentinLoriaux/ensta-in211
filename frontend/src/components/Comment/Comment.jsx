import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
// import './Movie.css';

const useGetComment = (movieId) => {
  const [comment, setComment] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/comments/fetch/${movieId}`, {
        params: { movieId: movieId },
      })
      .then((response) => {
        setComment(response.data.comments);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movieId]);

  return comment;
};

const postComment = (event, textContent, movieId) => {
  // This avoid page reload
  event.preventDefault();

  if (textContent === '') {
    console.error('Missing id, this field is required');

    return;
  }

  axios
    .post(`${import.meta.env.VITE_BACKDEND_URL}/comments/new`, {
      textContent: textContent.textContent,
      movieId: movieId,
      userId: Cookies.get(`id`),
      date: new Date().toDateString(),
    })
    .then(() => {
      console.log('successfully shitposted');
    })
    .catch((error) => {
      console.error(error);
    });
};

export function Comment(movieId) {
  const commentList = useGetComment(movieId);
  const displayList = commentList.map((elt) => (
    <li>
      <div>
        user : {elt.userId},{elt.date}
      </div>
      <p>{elt.textContent}</p>{' '}
    </li>
  ));
  const [textContent, setTextContent] = useState('');

  return (
    //blank input to put a comment
    //other comments about the movie, with author and date
    <div>
      Commentaires
      <form
        className="add-movie-form"
        onSubmit={(event) => postComment(event, textContent, movieId)}
      >
        <input
          className="add-movie-input"
          placeholder="comment"
          onChange={(event) =>
            setTextContent({ textContent: event.target.value })
          }
        />
        <button className="add-comment" type="submit">
          Ajouter le commentaire
        </button>
      </form>
      <ul id="commentList">{displayList}</ul>
    </div>
  );
}

export default Comment;
