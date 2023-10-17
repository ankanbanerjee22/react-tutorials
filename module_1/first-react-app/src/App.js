import React, { useEffect, useState } from 'react';
import SearchBox from './components/SearchBox.js';
import MovieGenre from './components/MovieGenre.js';
import CounterLegacy from './components/CounterLegacy.js';

function App() {

  useEffect(() => {
    const collapsibleElems = document.querySelectorAll('.collapsible');

    window.M.Collapsible.init(collapsibleElems, {
      accordion: false
    });

  }, []);

  const genres = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Sci-Fi'];
  const [selectedGenre, setSelectedGenre] = useState('All');

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    //alert('Genre is: ' + genre);
  };

  const handleSearch = (query) => {
    alert("Searching movies with name: " + query);
  }

  return (
    <>
      <ul className="collapsible  popout">
        <li>
          <div className="collapsible-header"><i className="material-icons">star_half</i>Counter Legacy</div>
          <div className="collapsible-body"><span><CounterLegacy />
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
      </ul>
    </>
  );
  
}

export default App;