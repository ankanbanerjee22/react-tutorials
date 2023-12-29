import { useState, useEffect } from 'react';
import { UNKNOWN_MOVIE } from '../literals';
import { NOT_APPLICABLE } from '../literals';
import Dialog from './Dialog';
import MovieForm from './MovieForm';
import  '../css/Movie.css';

const Movie = ({movie , onMovieClick }) => {

    const displayedGenre = movie.genres ? movie.genres.flat().join(", ") : NOT_APPLICABLE;
    const displayedMovieName = movie.title ? movie.title : UNKNOWN_MOVIE;
    const displayedReleaseYear = movie.release_date ? movie.release_date.substring(0, 4) : NOT_APPLICABLE;

    const [selectedOption, setSelectedOption] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOptionSelect = (event, option) => {
        setSelectedOption(option);
        setIsDialogOpen(true);
    }

    const handleCloseDialog = (event) => {
        setIsDialogOpen(false);
      };

    const renderSelectedComponent = () => {
        switch (selectedOption) {
            case 'Edit Movie':
                return (
                    <>
                        {isDialogOpen ? (
                            <Dialog title="Edit Movie" onClose={(e) => handleCloseDialog(e)}>
                                <MovieForm initialMovie={movie} onSubmit={null} />
                            </Dialog>
                        ) : null}
                    </>
                )
            case 'Delete Movie':
                return (
                    <>
                        {isDialogOpen ? (
                            <Dialog title="Delete Movie" onClose={(e) => handleCloseDialog(e)}>
                                <MovieForm initialMovie={movie} deleteMovie={true} onSubmit={null} />
                            </Dialog>
                        ) : null}
                    </>
                )
            default:
                return null;
        }
    }

    useEffect(() => {
        // Initialize the dropdown menu
        const dropdownElems = document.querySelectorAll('.dropdown-trigger');
        window.M.Dropdown.init(dropdownElems, {
            constrainWidth: false,
            hover: false,
        });
    }, []);

    const handleTileOnClick = (event) => {
        if(event.target && event.target.id !== 'menu-id'){
            onMovieClick();
        }
    }

    return (
        <>
            <div className="row" >
                <div className="col s12 movie-list">
                    <div className="card movie-card" onClick={(e) => handleTileOnClick(e)}  >
                        <div className="card-image movie-tile" style={{ position: 'relative', overflow: 'hidden' }}>
                            <div className="movie-menu  click-to-toggle">
                                <a href="#" className='btn-floating halfway-fab dropdown-trigger btn grey darken-3 card-menu-dropdown'
                                    style={{ position: 'absolute', top: 10, left: 10 }}
                                    data-target={`dropdown-${displayedMovieName}`}><i id="menu-id" className='material-icons large red-text'>more_vert</i></a>
                                <ul id={`dropdown-${displayedMovieName}`} className='dropdown-content'>
                                    <li><a href="#" onClick={(event) => handleOptionSelect(event, 'Edit Movie')}>Edit</a></li>
                                    <li><a href="#" onClick={(event) => handleOptionSelect(event, 'Delete Movie')}>Delete</a></li>
                                </ul>
                            </div>
                            <img src={movie.poster_path || '/images/image_not_available.svg.png'}
                                height="100%"
                                alt={displayedMovieName}
                                onError={(e) => {
                                    e.target.src = '/images/image_not_available.svg.png';
                                    e.target.onError = null;
                                }}
                            />
                        </div>
                        <div className="card-content black movie-description">
                            <span className="badge green darken-3 new bold-text" data-badge-caption="">{displayedReleaseYear}</span>
                            <p className="title  white-text text-lighten-4">{displayedMovieName}</p>
                            <p className="genre">{displayedGenre}</p>
                        </div>
                    </div>
                </div>
            </div>
            {selectedOption && renderSelectedComponent()}
        </>
    );

}

export default Movie;