import React, { useEffect, useState, useRef } from 'react';
import SearchBox from './components/SearchBox.js';
import MovieGenre from './components/MovieGenre.js';
import MovieSortBy from './components/MovieSortBy.js';
import Movie from './components/Movie.js';
import MovieDetails from './components/MovieDetails.js';
import MovieDatabaseService from './services/MovieDatabaseService.js';


function App() {


  const [movies, setMovies] = useState([]);
  const [pagesize, setPagesize] = useState(10);



  const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSearchQuery, setSelectedSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('release_date');
  const [resultCount, setResultCount] = useState(0);

  useEffect(() => {
    setMovies(loadMovies(selectedSearchQuery, sortBy, selectedGenre, pagesize))
  }, [pagesize, selectedGenre, selectedSearchQuery, sortBy]);


  const movieDetailRef = useRef(null);

  const handleGenreSelect = (genre) => {
    const byGenre = genre === 'All' ? '' : genre;
    setSelectedGenre(byGenre);
    setPagesize(10);
    //loadMovies(selectedSearchQuery, sortBy, byGenre, 10)
  };

  const handleSearch = (query) => {
    setSelectedSearchQuery(query);
    setSelectedGenre('All');
    setPagesize(10);
    //loadMovies(query, sortBy, 'All', 10)
  }

  const handleTileClick = (movie) => {
    setSelectedMovie(movie);
    movieDetailRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCloseMovieDetails = () => {
    setSelectedMovie(null);
  };


  const handleSortChange = (sortCriteria) => {
    setSortBy(sortCriteria);
    setPagesize(10);
    //loadMovies(selectedSearchQuery, sortCriteria, selectedGenre, 10)
  };

  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [editedMovie, setEditedMovie] = useState(null);

  // const handleEditMovie = (movie) => {
  //   setEditedMovie(movie);
  //   setIsDialogOpen(true);
  // };

  // const handleDeleteMovie = (movie) => {
  //   // TODO
  //   // logic for handle delete movie
  // };


  // const handleAddMovie = (movie) => {
  //   // Handle adding a new movie (submit data to API, update state, etc.)
  //   setIsDialogOpen(false);
  // };

  // const handleCloseDialog = () => {
  //   setIsDialogOpen(false);
  //   setEditedMovie(null);
  // };

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
        console.error('Error fetching data:', error);
        // Handle error, show an error message, etc.
      } else {
        console.log('total count: ', data.totalAmount);
        setMovies(data.data);
        setResultCount(data.totalAmount);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle unexpected errors during the fetch operation
    }
  }


  const handleLoadMoreMovie = () => {
    let updatePagesize = pagesize + 10;
    setPagesize(updatePagesize);
    //loadMovies(selectedSearchQuery, sortBy, selectedGenre, updatePagesize)
  }




  const [selectedOption, setSelectedOption] = useState("Add Movie");

  return (

    <>

      <div ref={movieDetailRef} className="row">
        {selectedMovie ? (
          <MovieDetails
            imageUrl={selectedMovie.poster_path}
            movieName={selectedMovie.title}
            releaseYear={selectedMovie.release_date}
            rating={selectedMovie.vote_average}
            duration={selectedMovie.runtime}
            description={selectedMovie.overview}
            genres={selectedMovie.genres}
            onClose={handleCloseMovieDetails}
          />
        ) : (
          <SearchBox initialQuery={selectedSearchQuery} onSearch={handleSearch} />
        )}
      </div>

      <div className="row">
        <div className="col s9 m8">
          <MovieGenre genres={genres} selectedGenre={selectedGenre} onSelect={handleGenreSelect} />
        </div>
        <MovieSortBy sortBy={sortBy} onSortChange={handleSortChange}></MovieSortBy>
      </div>

      <div className="row">
        <div className="col s12 m12 white-text">
          <h6><strong>{resultCount}</strong> movies found</h6>
        </div>
      </div>





      <div className="row">
        {/*  fetching from movie */}
        {Array.isArray(movies) && movies.length > 0 && movies.map((movie) => {
          return (
            <div className="col s6 m4 l3 xxl" key={movie.poster_path}>
              <Movie movie={movie}
                onMovieClick={() => handleTileClick(movie)} >
              </Movie>
            </div>
          )
        })}
      </div>


      {resultCount > 10 && (<div className="row">
        <div className="col s12 center-align">
          <button className="btn-large waves-effect waves-light transparent custom-btn" onClick={handleLoadMoreMovie}>
            Load More
          </button>
        </div>
      </div>)}



    </>


  );






}

export default App;