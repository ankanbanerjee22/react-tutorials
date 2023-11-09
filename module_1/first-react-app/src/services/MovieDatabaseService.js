import { API_URL } from '../configs/appconfigs';

const MovieDatabaseService = {
  loadMovies: async (searchQuery, sortCriteria, genreFilter, limit) => {
    try {
      const encodedsearchQuery = encodeURIComponent(searchQuery);
      const encodedsortCriteria = (sortCriteria);
      const encodedGenreFilter = genreFilter !== 'All' ? encodeURIComponent(genreFilter): encodeURIComponent('') ;
      const response = await fetch(`${API_URL}?search=${encodedsearchQuery}&searchBy=title&sortBy=${encodedsortCriteria}&filter=${encodedGenreFilter}&sortOrder=desc&limit=${limit}`);  
      const data     = await response.json();
      console.log('url',`${API_URL}?search=${encodedsearchQuery}&searchBy=title&sortBy=${encodedsortCriteria}&filter=${encodedGenreFilter}&sortOrder=desc&limit=${limit}` )
      console.log('loaded.data', data);
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
      console.log(`${API_URL}?search=${encodedQuery}&searchBy=title`);
      const data     = await response.json();

      return  {data};
    }
    catch (error) {
      console.error(error)
      return { error: error.response };
    }
  }
};

export default MovieDatabaseService;