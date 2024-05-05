import express from 'express';
import { appDataSource } from '../datasource.js';
import Like from '../entities/likes.js';

const router = express.Router();

// ========== FETCH ALL LIKES [DEBUG] ==========
router.get('/', function (req, res) {
  appDataSource
    .getRepository(Like)
    .find({})
    .then(function (likes) {
      res.json({ likes: likes });
    });
});

// ========== ADD A LIKE ==========
router.post('/new', function (req, res) {
  console.log(req.body);

  const LikeRepository = appDataSource.getRepository(Like);
  const newLike = LikeRepository.create({
    movieId: req.body.movieId,
    userId: req.body.userId,
  });

  LikeRepository.insert(newLike)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
    });
});

// ========== REMOVE A LIKE ==========
router.delete('/:movieId/:userId', function (req, res) {
  appDataSource
    .getRepository(Like)
    // .delete({ movieId: req.params.movieId  })
    .destroy({
      where: { movieId: req.params.movieId, userId: req.params.userId },
    })
    .then(function () {
      res.status(204).json({ message: 'Like successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the Like' });
    });
});

// ========== COUNT NUMBER OF LIKES OF A MOVIE ==========
router.get('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Like)
    .count({ where: { id: req.params.movieId } })
    .then(function (nbLikes) {
      res.json({ nbLikes: nbLikes });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while counting likes' });
    });
});

export default router;
