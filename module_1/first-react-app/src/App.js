import React, { useEffect, useState, useRef } from 'react';
import SearchBox from './components/SearchBox.js';
import MovieGenre from './components/MovieGenre.js';
import CounterLegacy from './components/CounterLegacy.js';
import MovieSortBy from './components/MovieSortBy.js';
import Movie from './components/Movie.js';
import MovieMetadata from './MovieMetadata.json';
import MovieDetails from './components/MovieDetails.js';

function App() {

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
    //alert('Genre is: ' + genre);
  };

  const handleSearch = (query) => {
    alert("Searching movies with name: " + query);
  }

  const handleTileClick = (movie) => {
    //alert("trying to select movie: ", movie);
    console.log(movie.movieName);
    setSelectedMovie(movie);
    movieDetailRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCloseMovieDetails = () => {
    setSelectedMovie(null);
  };

  const [sortBy, setSortBy] = useState('releaseDate'); // State to manage sorting criteria

  const handleSortChange = (value) => {
    setSortBy(value);
    alert("selected value is: " + value);
  };

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
          <div className="collapsible-header"><i className="material-icons">star_half</i>Movie Selection</div>
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
                  <div className="col s3 m3 l3 xxl" key={movie.imageUrl}>
                    <Movie imageUrl={movie.imageUrl} movieName={movie.movieName}
                      releaseYear={movie.releaseYear} genres={movie.genres}
                      onTileClick={() => handleTileClick(movie)} >
                    </Movie>
                  </div>
                )
              })}
            </div>
          </div>
        </li>

      </ul>
    </>
  );

}

export default App;