import React, { useEffect, useState, useRef } from 'react';
import SearchBox from './components/SearchBox.js';
import MovieGenre from './components/MovieGenre.js';
import CounterLegacy from './components/CounterLegacy.js';
import MovieSortBy from './components/MovieSortBy.js';
import Movie from './components/Movie.js';
import MovieMetadata from './movie-metadata.json';
import MovieDetails from './components/MovieDetails.js';
import Dialog from './components/Dialog.js';
import MovieForm from './components/MovieForm.js';
import MovieDatabaseService from './services/MovieDatabaseService.js';

function App() {


  const [movies, setMovies] = useState([]);


  useEffect(() => {
    const collapsibleElems = document.querySelectorAll('.collapsible');

    window.M.Collapsible.init(collapsibleElems, {
      accordion: false
    });

  }, []);

  const genres = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Sci-Fi'];
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const movieDetailRef = useRef(null);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  const handleSearch = (query) => {
    alert("Searching movies with name: " + query);
  }

  const handleTileClick = (movie) => {
    setSelectedMovie(movie);
    movieDetailRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCloseMovieDetails = () => {
    setSelectedMovie(null);
  };

  const [sortBy, setSortBy] = useState('releaseDate');

  const handleSortChange = (value) => {
    setSortBy(value);
    alert("selected value is: " + value);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedMovie, setEditedMovie] = useState(null);

  const handleEditMovie = (movie) => {
    setEditedMovie(movie);
    setIsDialogOpen(true);
  };

  const handleDeleteMovie = (movie) => {
    // TODO
    // logic for handle delete movie
  };


  const handleAddMovie = (movie) => {
    // Handle adding a new movie (submit data to API, update state, etc.)
    setIsDialogOpen(false);
  };

  const handleDeleteMovie = (movie) => {
    // TODO
    // logic for handle delete movie
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditedMovie(null);
  };

  const [selectedOption, setSelectedOption] = useState("Add Movie");

  async function submitSearch(query) {
    try {
      const data = await MovieDatabaseService.searchMovies(query);
      console.log('reciving data: ', data);
      if (data.data && data.data.length > 0) {
        setMovies(data.data); // Set the movies state using response data
      } else {
        setMovies([]); // Set movies state to empty array if no data is received
      }
    } catch (error) {
      console.log(error);
    }
    console.log('movies: ', movies);
    console.log(MovieMetadata);
  }



  return (
    <>
      <ul className="collapsible  popout">
        <li>
          <div className="collapsible-header"><i className="material-icons">star_half</i>Counter Legacy</div>
          <div className="collapsible-body"><span><CounterLegacy initialValue={0} />
          </span></div>
        </li>
        <li>
          <div className="collapsible-header"><i className="material-icons">star_half</i>Search Box</div>
          <div className="collapsible-body"><span><SearchBox initialQuery="" onSearch={handleSearch} /></span></div>
        </li>
        <li>
          <div className="collapsible-header"><i className="material-icons">star_half</i>Movie Genre List</div>
          <div className="collapsible-body"><span><MovieGenre genres={genres} selectedGenre={selectedGenre} onSelect={handleGenreSelect} />
          </span></div>
        </li>
        <li>
          <div className="collapsible-header"><i className="material-icons">star_half</i>Movie Sort By</div>
          <div className="collapsible-body" ><span> <MovieSortBy sortBy={sortBy} onSortChange={handleSortChange}></MovieSortBy>
          </span></div>
        </li>
        <li>
          <div className="collapsible-header" tabIndex="3"><i className="material-icons">star_half</i>Movie Selection</div>
          <div className="collapsible-body black-background">
            <div ref={movieDetailRef} className='row'>
              {selectedMovie ? (
                <MovieDetails
                  imageUrl={selectedMovie.imageUrl}
                  movieName={selectedMovie.movieName}
                  releaseYear={selectedMovie.releaseYear}
                  rating={selectedMovie.rating}
                  duration={selectedMovie.duration}
                  description={selectedMovie.description}
                  genres={selectedMovie.genres}
                  onClose={handleCloseMovieDetails}
                />
              ) : (
                <SearchBox initialQuery="" onSearch={handleSearch} />
              )}
            </div>
            <div className="row">
              {/*  fetching from movie */}
              {MovieMetadata.map((movie) => {
                return (
                  <div className="col s6 m4 l3 xxl" key={movie.imageUrl}>
                    <Movie imageUrl={movie.imageUrl} movieName={movie.movieName}
                      releaseYear={movie.releaseYear} genres={movie.genres}
                      onClick={() => handleTileClick(movie)} >
                    </Movie>
                  </div>
                )
              })}
            </div>
          </div>
        </li>
        <li>
          <div className="collapsible-header"><i className="material-icons">star_half</i>Movie Operations</div>
          <div className="collapsible-body black"><span>  <div className="input-field dropdown-container">
            <p className="label">Movie Operations : </p>
            <select className="black" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="Add Movie">Add Movie</option>
              <option value="Edit Movie">Edit Movie</option>
              <option value="Delete Movie">Delete Movie</option>
            </select>
          </div>
            {selectedOption === "Add Movie" && (
              <button className="btn waves-effect waves-orange yellow black-text btn-large" onClick={() => setIsDialogOpen(true)}>
                Add Movie
              </button>
            )}

            {selectedOption === "Edit Movie" && (
              <button className="btn waves-effect waves-orange yellow black-text btn-large" onClick={() => setIsDialogOpen(true)}>
                Edit Movie
              </button>
            )}

            {isDialogOpen && selectedOption === "Add Movie" && (
              <Dialog title="Add Movie" onClose={handleCloseDialog}>
                <MovieForm initialMovie={null} onSubmit={handleAddMovie} />
              </Dialog>
            )}

            {isDialogOpen && selectedOption === "Edit Movie" && (
              <Dialog title="Edit Movie" onClose={handleCloseDialog}>
                <MovieForm initialMovie={MovieMetadata[2]} onSubmit={handleEditMovie} />
              </Dialog>
            )}

            {isDialogOpen && selectedOption === "Delete Movie" && (
              <Dialog title="Delete Movie" onClose={handleCloseDialog}>
                <MovieForm initialMovie={MovieMetadata[2]} deleteMovie={true} onSubmit={handleDeleteMovie} />
              </Dialog>
            )}
          </span></div>
        </li>
      </ul>
      <div>
        {Array.isArray(movies) && movies.length > 0 && movies.data.map((movie, index) => (
          <div className="row" key={index}>
            <p>Movie Name: {movie.movieName}</p>
            <p>Release Year: {movie.releaseYear}</p>
            {/* ... other properties of the movie object */}
          </div>
        ))}
      </div>
    </>


  );

}

export default App;