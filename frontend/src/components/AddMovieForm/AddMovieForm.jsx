import { useState } from 'react';
import axios from 'axios';
import './AddMovieForm.css';

const DEFAULT_FORM_VALUES = {
  title: '',
  release_date: '',
  description: '',
  backdrop_path: '',
};

const useSaveMovie = () => {
  const [movieCreationError, setMovieCreationError] = useState(null);
  const [movieCreationSuccess, setMovieCreationSuccess] = useState(null);
  const displayCreationSuccessMessage = () => {
    setMovieCreationSuccess('New movie created successfully');
    setTimeout(() => {
      setMovieCreationSuccess(null);
    }, 3000);
  };

  const saveMovie = (event, formValues, setFormValues) => {
    // This avoid page reload
    event.preventDefault();

    setMovieCreationError(null);
    if (formValues.id === '') {
      console.error('Missing id, this field is required');

      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/movies/new`, formValues)
      .then(() => {
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_VALUES);
      })
      .catch((error) => {
        setMovieCreationError('An error occured while creating new movie.');
        console.error(error);
      });
  };

  return { saveMovie, movieCreationError, movieCreationSuccess };
};

function AddMovieForm() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const { saveMovie, movieCreationError, movieCreationSuccess } =
    useSaveMovie();

  return (
    <div>
      <form
        className="add-movie-form"
        onSubmit={(event) => saveMovie(event, formValues, setFormValues)}
      >
        <input
          className="add-movie-input"
          placeholder="Title"
          value={formValues.title}
          onChange={(event) =>
            setFormValues({ ...formValues, title: event.target.value })
          }
        />
        <input
          className="add-movie-input"
          placeholder="Release Date"
          value={formValues.release_date}
          onChange={(event) =>
            setFormValues({ ...formValues, release_date: event.target.value })
          }
        />

        <input
          className="add-movie-input"
          placeholder="Description"
          value={formValues.description}
          onChange={(event) =>
            setFormValues({ ...formValues, description: event.target.value })
          }
        />

        <input
          className="add-movie-input"
          placeholder="image"
          value={formValues.backdrop_path}
          onChange={(event) =>
            setFormValues({ ...formValues, backdrop_path: event.target.value })
          }
        />
        <button className="add-movie-button" type="submit">
          Add movie
        </button>
      </form>
      {movieCreationSuccess !== null && (
        <div className="movie-creation-success">{movieCreationSuccess}</div>
      )}
      {movieCreationError !== null && (
        <div className="movie-creation-error">{movieCreationError}</div>
      )}
    </div>
  );
}

export default AddMovieForm;
