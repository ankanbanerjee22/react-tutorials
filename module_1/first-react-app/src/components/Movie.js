import { UNKNOWN_MOVIE } from '../literals';
import { NOT_APPLICABLE } from '../literals';
import '../css/Movie.css';

const Movie = ({ imageUrl, movieName, releaseYear, genres, onTileClick }) => {

    const displayedGenre = genres ? genres.flat().join(", ") : NOT_APPLICABLE;
    const displayedMovieName = movieName ? movieName : UNKNOWN_MOVIE;
    const displayedReleaseYear = releaseYear ? releaseYear : NOT_APPLICABLE;

    return (
        <>
            <div className="row" >
                <div className="col s12 movie-list">
                    <div className="card large" onClick={onTileClick} >
                        <div className="card-image movie-tile" >
                            <img src={imageUrl} height='100%' alt='...' />
                        </div>
                        <div className="card-content black movie-description">
                            <span className="badge green darken-3 new bold-text" data-badge-caption="">{displayedReleaseYear}</span>
                            <p className="title  white-text text-lighten-4">{displayedMovieName}</p>
                            <p className="genre">{displayedGenre}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Movie;