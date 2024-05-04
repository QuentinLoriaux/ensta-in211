import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    title: {
      primary: true,
      type: String,
    },
    release_date: {
      type: String,
    },
    backdrop_path: {
      type: String,
    },
    description: {
      type: String,
    },
  },
});

export default Movie;
