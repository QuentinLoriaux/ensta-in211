import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';

const router = express.Router();

// ========== FETCH ALL MOVIES ==========
//ceci est un listener qui écoute http://localhost:8080/api/movies/ et reçoit les requêtes GET de cet URL
router.get('/', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({})
    .then(function (movies) {
      res.json({ movies: movies });
    });
  // res.send([]);
});

// ========== ADD A MOVIE ==========
router.post('/new', function (req, res) {
  console.log(req.body);

  const MovieRepository = appDataSource.getRepository(Movie);
  const newMovie = MovieRepository.create({
    title: req.body.title,
    release_date: req.body.release_date,
    description: req.body.description,
    backdrop_path: req.body.backdrop_path,
  });

  MovieRepository.insert(newMovie)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
    });
});

// ========== DELETE A MOVIE ==========
router.delete('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .delete({ id: req.params.movieId })
    .then(function () {
      res.status(204).json({ message: 'Movie successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the Movie' });
    });
});

// ========== FETCH ONE MOVIE ==========
router.get('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .findOne({ where: { id: req.params.movieId } })
    .then(function (movie) {
      // console.log(movie);
      res.json({ movie: movie });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while reading Movie data' });
    });
});

export default router;
