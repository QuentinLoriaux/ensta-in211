import express from 'express';
import { appDataSource } from '../datasource.js';
import Comment from '../entities/comments.js';

const router = express.Router();

// ========== FETCH ALL COMMENTS [DEBUG] ==========
router.get('/', function (req, res) {
  appDataSource
    .getRepository(Comment)
    .find({})
    .then(function (comment) {
      res.json({ comment: comment });
    });
});

// ========== ADD A COMMENT ==========
router.post('/new', function (req, res) {
  console.log(req.body);
  const currentDate = new Date().toDateString();

  const CommentRepository = appDataSource.getRepository(Comment);
  const newComment = CommentRepository.create({
    movieId: req.body.movieId,
    userId: req.body.userId,
    textContent: req.body.textContent,
    date: currentDate,
  });

  CommentRepository.insert(newComment)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
    });
});

// ========== REMOVE A COMMENT ==========
router.delete('/:commentId', function (req, res) {
  appDataSource
    .getRepository(Comment)
    .delete({ id: req.params.commentId })
    .then(function () {
      res.status(204).json({ message: 'Comment successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the comment' });
    });
});

// ========== FETCH COMMENTS OF A MOVIE ==========
router.get('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Comment)
    .find({ where: { movieId: req.params.movieId } })
    .then(function (comments) {
      res.json({ comments: comments });
    })
    .catch(function () {
      res
        .status(500)
        .json({ message: 'Error while fetching comments about the movie' });
    });
});

// ========== FETCH COMMENTS BY A USER ==========
router.get('/:userId', function (req, res) {
  appDataSource
    .getRepository(Comment)
    .find({ where: { userId: req.params.userId } })
    .then(function (comments) {
      res.json({ comments: comments });
    })
    .catch(function () {
      res
        .status(500)
        .json({ message: 'Error while fetching comments by the user' });
    });
});

export default router;
