import typeorm from 'typeorm';

const Like = new typeorm.EntitySchema({
  name: 'Like',
  columns: {
    movieId: {
      primary: true,
      type: String,
    },
    userId: {
      primary: true,
      type: String,
    },
  },
});

export default Like;
