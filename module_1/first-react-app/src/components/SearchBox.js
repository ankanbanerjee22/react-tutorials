import React, { useState } from 'react';


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

    const cardStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/movie-list.jpg)`,
        backgroundSize: 'cover',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black overlay
        borderRadius: '15px'
    };

    const inputStyle = {
        backgroundColor: '#263238',
        borderRadius: '20px',
        padding: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        width: '100%'
    };


    return (
        <>
            <div className="row center-align">
                <div className="col s12 m8 offset-m2">
                    <div className="card medium" style={cardStyle}>
                        <div className="card-content" style={overlayStyle}>
                            <div className="row center-align">
                                <div className="col s12 center-align">
                                    <h3 style={{ color: '#eceff1' }}>Find Your Movie</h3>
                                </div>
                                <div className="col s6 offset-s3 right-align">
                                    <div className="input-field" style={inputStyle}>
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
                                <div className="col s2 left-align" style={{ marginTop: '30px' }}>
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
