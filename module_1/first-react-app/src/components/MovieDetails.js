import StarRating from "./StarRating";
import "../css/MovieDetails.css"
import { NOT_APPLICABLE, UNKNOWN_MOVIE } from "../literals";

const MovieDetails = ({ imageUrl, movieName, releaseYear, rating, duration, description, genres, onClose }) => {

    const trimmedDescription = description.length <= 400 ? description : description.slice(0, 400) + ".......";
    const displayedGenre = genres ? genres.flat().join(", ") : NOT_APPLICABLE;
    const displayedMovieName = movieName ? movieName : UNKNOWN_MOVIE;
    const displayedReleaseYear = releaseYear ? releaseYear : NOT_APPLICABLE;

    return (
        <>
            <div className="row">
                <div className="col s4 m4 xl3">
                    <div className="card horizontal medium black ">
                        <img className="movie-image-style" src={imageUrl} height="100%" alt={movieName} />
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
                                        <p className="red-text"><strong>{duration}</strong></p>
                                    </div>
                                </div>
                                <div> <StarRating rating={rating} /></div>
                                <p className="grey-text" ><strong>{displayedGenre}</strong></p>
                                <div className="movie-description-text"><strong>Description: </strong>{trimmedDescription}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};

export default MovieDetails;
