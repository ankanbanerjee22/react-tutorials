import React, { useEffect, useState } from 'react';
import '../css/SearchBox.css'
import { FIND_YOUR_MOVIE } from '../literals';
import Dialog from './Dialog';
import MovieForm from './MovieForm';
import MovieDatabaseService from '../services/MovieDatabaseRepository';
// import { useNavigate } from 'react-router';
import { useNavigate }  from "@remix-run/react";


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
const SearchBox = ({ initialQuery = '', onSearch }) => {
    const [query, setQuery] = useState(initialQuery);
    const navigate = useNavigate();

    useEffect(() => {
        setQuery(initialQuery || '');
    }, [initialQuery]);

    // handler for input change
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    // handler on hiting search button
    const handleSearch = () => {
        //setQuery(query);
        onSearch(query);
    };

    // handler for Enter press, same behaviour as hitting search button
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setQuery(query);
            onSearch(query);
        }
    };

    const handleAddMovieButton = () => {
        setIsDialogOpen(true);
        changePath('/add');
    }
    
    const changePath = (path) => {
        window.history.pushState({}, '', path);
    }
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleAddMovie = (movie) => {
        addNewMovie(movie);
        setIsDialogOpen(false);
        navigate('/');
        window.location.reload(false);

    };

    async function addNewMovie(movieData) {
        try {
            const { data, error } = await MovieDatabaseService.addMovie(movieData);

            if (error) {

            } else {
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <>
            <div className="row center-align">
                <div className="col s12 m12">
                    <div className="card medium card-style">
                        <div className="card-content overlay-style">
                            <div className="row right-align">
                                <div className="col s12">
                                    <button className="btn-large waves-effect waves-light add-movie-btn" onClick={() => handleAddMovieButton()}>
                                        + Add Movie
                                    </button>
                                    {(
                                        <Dialog title="Add Movie" onClose={handleCloseDialog} isOpen={isDialogOpen}>
                                            <MovieForm initialMovie={null} onSubmit={handleAddMovie} />
                                        </Dialog>
                                    )}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col s12 center-align">
                                    <h3 className="fym-heading">{FIND_YOUR_MOVIE}</h3>
                                </div>
                                <div className="col s9 offset-s3 center-align">
                                    <div className="col s6 input-field input-style">
                                        <input
                                            id="search-input"
                                            type="text"
                                            className="white-text font-large"
                                            placeholder='What do you want to watch ?'
                                            defaultValue={query}
                                            onChange={handleInputChange}
                                            onKeyPress={handleKeyPress}
                                        />
                                        <label htmlFor="search-input"></label>
                                    </div>
                                    <div className="col s6 left-align">
                                        <button className="btn-large waves-effect waves-light red custom-btn"
                                            onClick={handleSearch}
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                                <div className="col s6 left-align search-movie-button" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};

export default SearchBox;
