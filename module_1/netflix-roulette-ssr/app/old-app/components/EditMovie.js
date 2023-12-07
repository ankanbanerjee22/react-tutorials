import React, { useState } from 'react';
import MovieDatabaseService from '../services/MovieDatabaseRepository';
// import { useNavigate, useSearchParams } from 'react-router-dom';
import { useNavigate, useSearchParams } from "@remix-run/react"

import Dialog from './Dialog';
import MovieForm from './MovieForm';


const EditMovie = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleEditMovieSubmit = async (movie) => {
        await updateMovie(movie);
        setIsDialogOpen(false);
        navigate(`/${movie.id}?${searchParams.toString()}`);
        window.location.reload(false);
    }

    const handleDialogOnClose = () => {
        setIsDialogOpen(false);
        navigate(-1);

    }

    async function updateMovie(movieData) {
        try {
            const { data, error } = await MovieDatabaseService.updateMovie(movieData);

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
            <Dialog title="Edit Movie" onClose={handleDialogOnClose} isOpen={isDialogOpen}>
                <MovieForm initialMovie={null} onSubmit={handleEditMovieSubmit} />
            </Dialog>
        </>
    );

};

export default EditMovie;
