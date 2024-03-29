import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';

const router = express.Router();

//ceci est un listener qui écoute http://localhost:8080/api/movies/ et reçoit les requêtes GET de cet URL
router.get('/', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({})
    .then(function (movies) {
      res.json({ movies: movies });
    });
  // console.log('toto\n');
  // res.send([]);
});

router.post('/new', function (req, res) {
  console.log(req.body);

  const MovieRepository = appDataSource.getRepository(Movie);
  const newMovie = MovieRepository.create({
    id: req.body.id,
    title: req.body.title,
    release_date: req.body.release_date,
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

export default router;
