import React from 'react';
import StarRating from './StarRating';
import '../css/MovieDetails.css';
import { NOT_APPLICABLE, UNKNOWN_MOVIE } from '../literals';
import { ConvertMinutesToHoursAndMinutes } from '../services/UtilityService';

const MovieDetails = ({ selectedMovie, onClose }) => {
  const {
    id, poster_path, title, release_date, vote_average, duration, overview, genres,
  } = selectedMovie;

  const displayedGenre = genres ? genres.flat().join(', ') : NOT_APPLICABLE;
  const displayedMovieName = title || UNKNOWN_MOVIE;
  const displayedReleaseYear = release_date || NOT_APPLICABLE;
  const displayedDescription = overview ? (overview.length <= 400 ? overview : `${overview.slice(0, 400)}.......`) : NOT_APPLICABLE;
  const displayedDuration = duration ? ConvertMinutesToHoursAndMinutes(duration) : NOT_APPLICABLE;

  return (
        <>
            <div className="row">
                <div className="col s4 m4 xl3">
                    <div className="card horizontal medium black ">
                        <img src={poster_path || '/images/image_not_available.svg.png'}
                                height="100%"
                                alt={title}
                                className="movie-image-style"
                                onError={(e) => {
                                  e.target.src = '/images/image_not_available.svg.png';
                                  e.target.onError = null;
                                }}
                            />
                    </div>
                </div>
                <div className="col s8 m8 xl9">
                    <div className="card horizontal medium">
                        <div className="card-stacked">
                            <div className="card-content">
                                <div className="row">
                                    <div className="col s10 m10">
                                        <h3>{displayedMovieName}</h3>
                                    </div>

                                    <div className="col s2 m2">
                                        <button className="btn-floating btn-small  waves-effect waves-light red right" onClick={onClose}>
                                            <i className="material-icons">close</i>
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6 m6">
                                        <p className="red-text"> <strong>{displayedReleaseYear}</strong></p>
                                    </div>
                                    <div className="col s6 m6">
                                        <p className="red-text"><strong>{displayedDuration}</strong></p>
                                    </div>
                                </div>
                                <div> <StarRating rating={vote_average} /></div>
                                <p className="green-text" ><span><strong>{displayedGenre}</strong></span></p>
                                <div className="movie-description-text"><b>Description: </b>{displayedDescription}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  );
};

export default MovieDetails;
