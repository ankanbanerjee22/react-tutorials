import React, { useEffect, useRef } from 'react';


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
  // Initialize tabs when the component mounts
  const tabsRef = useRef(null);

  useEffect(() => {
    // Initialize Materialize tabs component using the ref
    const instance = window.M.Tabs.init(tabsRef.current);
    // Cleanup on component unmount
    return () => {
      instance.destroy();
    };
  }, []); // Empty dependency array ensures that this effect runs once after the initial render


  const customTabsStyle = {
    height: '50px', // Set the desired height for the tab bar
    lineHeight: '20px', // Center the text vertically within the tab bar
    width: '40%', // Set the desired width for the tab bar
    backgroundColor: '#3e2723', // Set the background color of the tab bar
    color: '#18ffff', // Set the font color of the tab text
  };


  return (
    <div className="genre-list">
      <div className="row">
        <div className="col s12">
          <ul className="tabs  z-depth-5" style={customTabsStyle} ref={tabsRef}>
            {genres.map((genre) => (
              <li key={genre} className="tab">
                <a href={`#${genre}`} className={genre === selectedGenre ? 'active' : ''} onClick={() => onSelect(genre)}>
                  {genre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

};

export default MovieGenre;