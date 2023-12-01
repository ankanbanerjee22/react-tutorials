import { API_URL } from '../configs/appconfigs';
import MovieDatabaseService from './MovieDatabaseRepository';

const MovieDatabaseService = {
  loadMovies: async (searchQuery, sortCriteria, genreFilter, limit, offset) => {

  },
  loadMovieById: async (movieId) => {

  },
  updateMovie : async (movieData) => {
    try {
      const { data, error } = await MovieDatabaseService.updateMovie(movieData);

      if (error) {
        // Handle error
      } else {
        console.log('Updated movie : ', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
};

export default MovieDatabaseService;