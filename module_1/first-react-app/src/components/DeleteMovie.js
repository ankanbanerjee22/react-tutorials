import React, { useState } from 'react';
import MovieDatabaseService from '../services/MovieDatabaseRepository';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Dialog from './Dialog';
import MovieForm from './MovieForm';

/**
 * This was made as wanted to write the same Counter component using JSX as well, to understand the legacy reactJs
 * with current style of writing components using JSX
 * 
 * @returns Counter with JSX
 */
const DeleteMovie = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleDeleteMovieSubmit = async (movieId) => {
        setIsDialogOpen(false);
        await deleteMovie(movieId);
        navigate(`/?${searchParams.toString()}`);
        window.location.reload(false);
    }

    const handleDialogOnClose = () => {
        setIsDialogOpen(false);
        navigate(-1);
    }

    async function deleteMovie(movieId) {
        try {
            const { data, error } = await MovieDatabaseService.deleteMovie(movieId);

            if (error) {
                // Handle error, show an error message, etc.
            } else {
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <Dialog title="Delete Movie" onClose={handleDialogOnClose} isOpen={isDialogOpen}>
                <MovieForm initialMovie={null} deleteMovie={true} onSubmit={handleDeleteMovieSubmit} />
            </Dialog>
        </>
    );

};

export default DeleteMovie;







