import React, { useState } from 'react';
import '../css/SearchBox.css'
import {FIND_YOUR_MOVIE} from '../literals';

/**
 * Requirements
 * --------------
 * implement a component that renders a search input and a button that triggers a new search.
 * 
 * The component should accept two properties:
 * 1. Initial search query. Use the value to set the initial value for the input
 * 2. A "onSearch" callback property. Call the callback property 
 *          every time the user presses Enter when the input has focus 
 *          or when the user clicks the Search button. 
 *          Pass current input value in callback arguments.
 * 
 */
const SearchBox = ({ initialQuery, onSearch }) => {
    const [query, setQuery] = useState(initialQuery);

    // handler for input change
    const handleInputChange = (event) => {
        setQuery(event.target.value);
        //alert("Input chaning");
    };

    // handler on hiting search button
    const handleSearch = () => {
        onSearch(query);
    };

    // handler for Enter press, same behaviour as hitting search button
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSearch(query);
        }
    };

    return (
        <>
            <div className="row center-align">
                <div className="col s12 m8 offset-m2">
                    <div className="card medium card-style">
                        <div className="card-content overlay-style">
                            <div className="row center-align">
                                <div className="col s12 center-align">
                                    <h3 className="fym-heading">{FIND_YOUR_MOVIE}</h3>
                                </div>
                                <div className="col s6 offset-s3 right-align">
                                    <div className="input-field input-style">
                                        <input
                                            id="search-input"
                                            type="text"
                                            className="white-text"
                                            placeholder='What do you want to watch ?'
                                            value={query}
                                            onChange={handleInputChange}
                                            onKeyPress={handleKeyPress}
                                        />
                                        <label htmlFor="search-input"></label>
                                    </div>
                                </div>
                                <div className="col s2 left-align search-movie-button">
                                    <button
                                        className="waves-effect waves-light red btn"
                                        onClick={handleSearch}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};


export default SearchBox;