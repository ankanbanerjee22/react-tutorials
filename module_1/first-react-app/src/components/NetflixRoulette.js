import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import SearchBox from './SearchBox.js';
import MovieGenre from './MovieGenre.js';
import MovieSortBy from './MovieSortBy.js';
import Movie from './Movie.js';
import MovieDetails from './MovieDetails.js';
import MovieDatabaseService from '../services/MovieDatabaseService.js';
import { SEARCH_PARAM_GENRE_KEY, SEARCH_PARAM_SORTBY_KEY, SEARCH_PARAM_QUERY_KEY, DEFAULT_PAGE_SIZE } from '../literals.js';

export function NetflixRoulette() {

  const [movies, setMovies] = useState([]);
  const [pagesize, setPagesize] = useState(DEFAULT_PAGE_SIZE);
  const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSearchQuery, setSelectedSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('release_date');
  const [resultCount, setResultCount] = useState(0);

  const movieDetailRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { movieId } = useParams();

  // hook to handle search param values
  useEffect(() => {
    const queryParam = searchParams.get(SEARCH_PARAM_QUERY_KEY);
    const genreParam = searchParams.get(SEARCH_PARAM_GENRE_KEY);
    const sortByParam = searchParams.get(SEARCH_PARAM_SORTBY_KEY);
  
    if (queryParam) {
      setSelectedSearchQuery(queryParam);
    }
  
    if (genreParam) {
      setSelectedGenre(genreParam);
    }
  
    if (sortByParam) {
      setSortBy(sortByParam);
    }
  }, [searchParams]);

  useEffect(() => {
    setMovies(loadMovies(selectedSearchQuery, sortBy, selectedGenre, pagesize));
  }, [pagesize, selectedGenre, selectedSearchQuery, sortBy]);

  // hook to handle selected movie from movie list
  useEffect(() => {
    if(movieId){
      loaSelectedMovieById(movieId);
    }
  }, [movieId]);

  const updateSearchParams = (searchParams, paramKey, paramValue) => {
    const existingParams = new URLSearchParams(searchParams.toString());
    existingParams.set(paramKey, paramValue);
    setSearchParams(existingParams.toString());
  }

  const handleGenreSelect = (genre) => {
    const byGenre = genre === 'All' ? '' : genre;
    setSelectedGenre(byGenre);
    setPagesize(DEFAULT_PAGE_SIZE);
    updateSearchParams(searchParams, SEARCH_PARAM_GENRE_KEY, byGenre);
  };

  const handleSearch = (query) => {
    setSelectedSearchQuery(query);
    setSelectedGenre('All');
    setPagesize(DEFAULT_PAGE_SIZE);
    updateSearchParams(searchParams, SEARCH_PARAM_QUERY_KEY, query);
    updateSearchParams(searchParams, SEARCH_PARAM_GENRE_KEY, 'All');
  };

  const handleTileClick = (movie) => {
    setSelectedMovie(movie);
    movieDetailRef.current.scrollIntoView({ behavior: 'smooth' });
    console.log('selected movie id is : ', movie.id);
    navigate(`/${movie.id}?${searchParams.toString()}`);
  };

  const handleCloseMovieDetails = () => {
    setSelectedMovie(null);
    navigate(`/?${searchParams.toString()}`);
  };


  const handleSortChange = (sortCriteria) => {
    setSortBy(sortCriteria);
    setPagesize(DEFAULT_PAGE_SIZE);
    updateSearchParams(searchParams, SEARCH_PARAM_SORTBY_KEY, sortCriteria);
  };

  /**
   * Method that communicates with backend client service to fetch movies data
   *
   * @param {*} searchQuery
   * @param {*} sortCriteria
   * @param {*} genreFilter
   * @param {*} limit
   */
  async function loadMovies(searchQuery, sortCriteria, genreFilter, limit) {
    try {
      const { data, error } = await MovieDatabaseService.loadMovies(searchQuery, sortCriteria, genreFilter, limit);

      if (error) {
        // Handle error, show an error message, etc.
      } else {
        setMovies(data.data);
        setResultCount(data.totalAmount);
      }
    } catch (error) {
      console.error('Error:', error);

    }
  }

  /**
   * Method to fetch a movie by its id from movie database and set it as the selected movie from list of movies
   * @param {*} movieId : id of the that we want to fetch
   */
  async function loaSelectedMovieById(movieId) {
    try {
      const { data, error } = await MovieDatabaseService.loadMovieById(movieId);

      if (error) {
        // Handle error, show an error message, etc.
      } else {
        setSelectedMovie(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleLoadMoreMovie = (event) => {
    event.preventDefault();
    let updatePagesize = pagesize + 10;
    setPagesize(updatePagesize);
  };

  return (
    <>
      <div ref={movieDetailRef} className="row">
        {selectedMovie ? (
          <MovieDetails
            selectedMovie={selectedMovie}
            onClose={handleCloseMovieDetails} />
        ) : (
          <SearchBox initialQuery={selectedSearchQuery} onSearch={handleSearch} />
        )}
      </div>

      <div className="row">
        <div className="col s9 m8">
          <MovieGenre genres={genres} selectedGenre={selectedGenre} onSelect={handleGenreSelect} />
        </div>
        <div className='col s3 m4'>
          <MovieSortBy sortBy={sortBy} onSortChange={handleSortChange}></MovieSortBy>
        </div>
      </div>

      <div className="row">
        <div className="col s12 m12 white-text result-count-wrapper">
          <h6><strong>{resultCount}</strong> movies found</h6>
        </div>
      </div>

      <div className="row">
        {/*  fetching from movie */}
        {Array.isArray(movies) && movies.length > 0 && movies.map((movie) => {
          return (
            <div className="col s6 m4 l3 xxl" key={movie.poster_path}>
              <Movie movie={movie}
                onMovieClick={() => handleTileClick(movie)}>
              </Movie>
            </div>
          );
        })}
      </div>

      {resultCount > DEFAULT_PAGE_SIZE && (<div className="row">
        <div className="col s12 center-align">
          <button className="btn-large waves-effect waves-light transparent custom-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleLoadMoreMovie(e); e.preventDefault(); e.stopPropagation(); }}>
            Load More
          </button>
        </div>
      </div>)}

    </>
  );

}





export default NetflixRoulette;


