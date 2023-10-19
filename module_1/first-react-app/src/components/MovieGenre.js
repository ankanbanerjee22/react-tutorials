import React, { useEffect, useRef } from 'react';
import '../css/MovieGenre.css';

/**
 * 
 * Requirements
 * ----------------
 * implement a component that renders a list of movie genres with currently selected genre highlighted.
 * The component should accept three properties:
 * 1. A list of genre names to display. Use the incoming list to render genre buttons.
 * 2. A name of currently selected genre. Use the name to identify which button to highlight.
 * 3. A "onSelect" callback property. Call the callback function when the user clicks on any genre button. Pass respective genre name to the callback arguments.
 *
 *
 * @param {*} param0 
 * @returns 
 */

const MovieGenre = ({ genres, selectedGenre, onSelect }) => {
  // Initialize tabs 
  const tabsRef = useRef(null);

  useEffect(() => {
    const instance = window.M.Tabs.init(tabsRef.current);
    return () => {
      instance.destroy();
    };
  }, []);

  return (
    <>
      <div className="genre-list">
        <div className="row">
          <div className="col s12">
            <ul className="tabs movie-genre-tabs" ref={tabsRef}>
              {genres.map((genre) => {
                const genreLink = `#${genre}`;
                const isActive = genre === selectedGenre;
                const activeClass = isActive ? 'active' : '';

                return (
                  <li key={genre} className="tab">
                    <a key={genre} href={genreLink} className={activeClass} onClick={() => onSelect(genre)}>
                      {genre}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );

};


export default MovieGenre;
