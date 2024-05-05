import typeorm from 'typeorm';

const Comment = new typeorm.EntitySchema({
  name: 'Comment',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    movieId: {
      primary: true,
      type: String,
    },
    userId: {
      primary: true,
      type: String,
    },
    textContent: {
      type: String,
    },
    date: {
      type: String,
    },
  },
});

export default Comment;
