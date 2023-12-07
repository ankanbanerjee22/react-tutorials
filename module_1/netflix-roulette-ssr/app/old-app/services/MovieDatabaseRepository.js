import { API_URL } from '../configs/appconfigs';

const MovieDatabaseService = {
  loadMovies: async (searchQuery, sortCriteria, genreFilter, limit, offset) => {
    try {
      const encodedsearchQuery = encodeURIComponent(searchQuery);
      const encodedsortCriteria = (sortCriteria);
      const encodedGenreFilter = genreFilter !== 'All' ? encodeURIComponent(genreFilter): encodeURIComponent('') ;
      const response = await fetch(`${API_URL}?search=${encodedsearchQuery}&searchBy=title&sortBy=${encodedsortCriteria}&filter=${encodedGenreFilter}&sortOrder=desc&limit=${limit}&offset=${offset}`);  
      const data     = await response.json();
      return { data };
    }
    catch (error) {
      return { error: error.response };
    }
  },
  loadMovieById: async (movieId) => {
    try {
      const response = await fetch(`${API_URL}/${movieId}`);  
      const data     = await response.json();
      return { data };
    }
    catch (error) {
      return { error: error.response };
    }
  },
  searchMovies: async (query) => {
    try {
    
      const encodedQuery = encodeURIComponent(query);
      const response = await fetch(`${API_URL}?search=${encodedQuery}&searchBy=title&sortBy=release_date&sortOrder=desc`);   
      const data     = await response.json();

      return  {data};
    }
    catch (error) {
      console.error(error)
      return { error: error.response };
    }
  },
  addMovie: async (movieData) => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
      });
      
      if (response.ok) {
        const data = await response.json();
        return { data };
      } else {
        const errorData = await response.json();
        return { error: errorData };
      }
    } catch (error) {
      return { error: error.message };
    }
  },
  deleteMovie: async (movieId) => {
    try {
      const response = await fetch(`${API_URL}/${movieId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        return { success: true };
      } else {
        const errorData = await response.json();
        return { error: errorData };
      }
    } catch (error) {
      return { error: error.message };
    }
  },
  updateMovie: async (movieData) => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
      });
      
      if (response.ok) {
        const data = await response.json();
        return { data };
      } else {
        const errorData = await response.json();
        return { error: errorData };
      }
    } catch (error) {
      return { error: error.message };
    }
  }
};

export default MovieDatabaseService;