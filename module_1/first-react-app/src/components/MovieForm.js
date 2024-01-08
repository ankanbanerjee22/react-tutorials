import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import '../css/MovieForm.css';
import '../index.css';
import { useParams } from 'react-router';
import MovieDatabaseService from '../services/MovieDatabaseRepository';

const MovieForm = ({ initialMovie, deleteMovie = false, onSubmit }) => {

    const { movieId } = useParams();
    const [movie, setMovie] = useState(initialMovie);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const [genres, setGenres] = useState([
        { value: 'Documentary', label: 'Documentary' },
        { value: 'Comedy', label: 'Comedy' },
        { value: 'Horror', label: 'Horror' },
        { value: 'Crime', label: 'Crime' }
    ]);

    const [renderFormikForm, setRenderFormikForm] = useState(false);
    const formattedReleaseYear = movie && movie.release_date;

    useEffect(() => {
        if (!movie && movieId) {
            loadMovieById(movieId);
        }
        const delay = setTimeout(() => {
            setRenderFormikForm(true);
        }, 500);

        return () => clearTimeout(delay);
    }, [movie]);

    useEffect(() => {
        var elems = document.querySelectorAll('select');
        var instances = window.M.FormSelect.init(elems);
    }, [renderFormikForm]);

    /**
    * Method to fetch a movie by its id from movie database and set it as the selected movie from list of movies
    * @param {*} movieId : id of the that we want to fetch
    */
    async function loadMovieById(movieId) {
        try {
            const { data, error } = await MovieDatabaseService.loadMovieById(movieId);

            if (error) {
                // Handle error, show an error message, etc.
            } else {
                setMovie(data);
                setSelectedGenres(data.genres || []);

                const uniqueSelectedGenres = data.genres.filter(genre => !genres.some(existingGenre => existingGenre.value === genre));
                const additionalGenres = uniqueSelectedGenres.map(genre => ({
                    value: genre,
                    label: genre
                }));

                setGenres([...genres, ...additionalGenres]);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleGenreChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedGenres(selectedOptions);
    };

    const handleSubmit = (values, { setSubmitting }) => {
        const moviePayload = { ...values, genres: selectedGenres };
        setSubmitting(false);
        onSubmit(moviePayload);
    };

    const handleDeleteFormSubmit = () => {
        onSubmit(movie.id);
    };

    if (deleteMovie) {
        return (
            <form className="bordered-form" onSubmit={(e) => { e.preventDefault(); handleDeleteFormSubmit(); }} data-testid="movie-form" >
                <div className="row">
                    <div className="col s8 m7 offset-s1 offset-m3">
                        <h5>Are you sure you want to delete this movie?</h5>
                    </div>
                    <div className="col s8 m7 offset-s1 offset-m3">
                        <h5 className='center-align'><b className='green-text '> {movie?.title}</b></h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 m7 offset-s3 offset-m3 right-align">
                        <button className="btn-large waves-effect waves-light red custom-btn" type="submit">
                            Confirm
                        </button>
                    </div>
                </div>
            </form>
        );
    }
    else {
        return (
            <div>
                {renderFormikForm && (
                    <Formik
                        enableReinitialize
                        initialValues={movie || {}}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, handleSubmit, handleReset }) => (
                            <form className="col s12 bordered-form"
                                onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
                                data-testid="movie-form" >
                                <div className="row">
                                    <div className="col s12 m8 input-field">
                                        <div className="input-style-form-label">Movie Name:</div>
                                        <div className="input-style-form">
                                            <Field id="title"
                                                data-testid="title"
                                                type="text"
                                                className="input-style-form"
                                                name="title"
                                                placeholder="Film title here"
                                                required />
                                        </div>
                                    </div>
                                    <div className="col s12 m4 input-field">
                                        <div className="input-style-form-label">Release Date:</div>
                                        <div className="input-style-form">
                                            <Field id="release_date"
                                                data-testid="releaseDate"
                                                type="date"
                                                placeholder="Release date"
                                                className="datepicker input-style-form"
                                                name="release_date"
                                                defaultValue={formattedReleaseYear}
                                                required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 m8 input-field">
                                        <div className="input-style-form-label">Movie URL:</div>
                                        <div className="input-style-form">
                                            <Field id="poster_path"
                                                data-testid="movieUrl"
                                                type="url"
                                                className="input-style-form"
                                                name="poster_path"
                                                placeholder="Poster URL here"

                                                required />
                                        </div>
                                    </div>
                                    <div className="col s12 m4 input-field">
                                        <div className="input-style-form-label">Rating:</div>
                                        <div className="input-style-form">
                                            <Field id="vote_average"
                                                data-testid="rating"
                                                type="number"
                                                className="input-style-form"
                                                name="vote_average"
                                                placeholder="Movie rating"
                                                required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 m8 input-field">
                                        <div className="input-style-form-label">Genre:</div>
                                        <div className="input-style-form" >


                                            <select
                                                multiple
                                                id="dropdown"
                                                data-testid="dropdown"
                                                className="input-style-form"
                                                defaultValue={selectedGenres}
                                                data-cy="genres"
                                                onChange={(e) => handleGenreChange(e)}>
                                                {genres.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}

                                            </select>

                                        </div>
                                    </div>
                                    <div className="col s12 m4 input-field">
                                        <div className="input-style-form-label">Runtime:</div>
                                        <div className="input-style-form">
                                            <Field id="runtime"
                                                data-testid="runtime"
                                                type="number"
                                                className="input-style-form"
                                                name="runtime"
                                                placeholder="Movie runtime"
                                                required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 input-field">
                                        <div className="input-style-form-label">Overview:</div>
                                        <div className="input-style-form">
                                            <Field
                                                as="textarea"
                                                id="overview"
                                                data-testid="overview"
                                                className="textarea materialize-textarea"
                                                name="overview"
                                                placeholder="Movie overview"
                                                required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 right-align">
                                        <button className="btn-large waves-effect waves-light transparent custom-btn" type="reset" onClick={handleReset}>
                                            Reset
                                        </button>
                                        <button className="btn-large waves-effect waves-light red custom-btn" type="submit" disabled={isSubmitting}>
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                )}
            </div>
        );
    }

};

export default MovieForm;
