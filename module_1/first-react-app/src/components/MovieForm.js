import React, { useState, useEffect } from 'react';
import '../css/MovieForm.css';
import '../index.css';

const MovieForm = ({ initialMovie, deleteMovie = false, onSubmit }) => {
  const [formData, setFormData] = useState(initialMovie || {});

  // TODO release year needs to be handled properly , now only taking year from movie metadata json file, 
  // changes will be requried in Movie component as well for release year badge 
  const defaultYear = formData.releaseYear; // Assuming formData.releaseYear contains the year as a string
  const formattedReleaseYear = `${defaultYear}-01-01`; // Set default day and month to '01'

  const [selectedGenres, setSelectedGenres] = useState(formData && formData.genres ? formData.genres.map(option => option) : []);

  const handleGenreChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    console.log('selected: ', event.target.selectedOptions)
    setSelectedGenres(selectedOptions);
  };

  const genres = [
    { value: 'all', label: 'All' },
    { value: 'action', label: 'Action' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'drama', label: 'Drama' },
    { value: 'sci-fi', label: 'Sci-Fi' }
  ];

  useEffect(() => {
    window.M.AutoInit();
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formValues = Object.fromEntries(new FormData(event.target));
    formValues.rating = parseFloat(formValues.rating);
    onSubmit(formValues);
  };


  if (deleteMovie) {
    return (
      <>
        <form className="bordered-form" onSubmit={handleFormSubmit} data-testid="movie-form" >
          <div className="row">
            <div className="col s8 m7 offset-s1 offset-m3">
              <h5>Are you sure you want to delete this movie?</h5>
            </div>
          </div>
          <div className="row">
            <div className="col s6 m7 offset-s3 offset-m3 right-align">
              <button className="btn-large waves-effect waves-green red custom-btn" type="submit">
                Confirm
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
  else {
    return (
      <form className="col s12 bordered-form" onSubmit={handleFormSubmit} data-testid="movie-form" >
        <div className="row">
          <div className="col s12 m8 input-field">
            <div className="input-style-form-label">Movie Name:</div>
            <div className="input-style-form">
              <input id="title"
                data-testid="title"
                type="text"
                className="input-style-form"
                name="title"
                placeholder="Film title here"
                defaultValue={formData.movieName}
                required />
            </div>
          </div>
          <div className="col s12 m4 input-field">
            <div className="input-style-form-label">Release Date:</div>
            <div className="input-style-form">
              <input id="releaseDate"
                data-testid="releaseDate"
                type="date"
                placeholder="Release date"
                className="datepicker input-style-form"
                name="releaseDate"
                defaultValue={formattedReleaseYear}
                required />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m8 input-field">
            <div className="input-style-form-label">Movie URL:</div>
            <div className="input-style-form">
              <input id="movieUrl"
                data-testid="movieUrl"
                type="url"
                className="input-style-form"
                name="movieUrl"
                placeholder="Poster URL here"
                defaultValue={formData.imageUrl}
                required />
            </div>
          </div>
          <div className="col s12 m4 input-field">
            <div className="input-style-form-label">Rating:</div>
            <div className="input-style-form">
              <input id="rating"
                data-testid="rating"
                type="number"
                className="input-style-form"
                name="rating"
                placeholder="Movie rating"
                defaultValue={formData.rating}
                required />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m8 input-field">
            <div className="input-style-form-label">Genre:</div>
            <div className="input-style-form" >
              <select multiple id="dropdown" data-testid="dropdown" className="input-style-form" defaultValue={selectedGenres} onSelect={handleGenreChange}>
                {genres.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col s12 m4 input-field">
            <div className="input-style-form-label">Runtime:</div>
            <div className="input-style-form">
              <input id="runtime"
                data-testid="runtime"
                type="text"
                className="input-style-form"
                name="runtime"
                placeholder="Movie runtime"
                defaultValue={formData.duration} required />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 input-field">
            <div className="input-style-form-label">Overview:</div>
            <div className="input-style-form">
              <textarea id="overview"
                data-testid="overview"
                className="materialize-textarea"
                name="overview"
                placeholder="Movie overview"
                defaultValue={formData.description}
                required />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 right-align">
            <button className="btn-large waves-effect waves-green transparent custom-btn" type="reset">
              Reset
            </button>
            <button className="btn-large waves-effect waves-green red custom-btn" type="submit">
              Confirm
            </button>
          </div>
        </div>
      </form>
    );
  }

};

export default MovieForm;
