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
const AddMovie = () => {

  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleAddMovie = (movie) => {
    addNewMovie(movie);
    setIsDialogOpen(false);
    navigate(-1);
  };

  const handleDialogOnClose = () => {
    setIsDialogOpen(false);
    navigate(-1);
  }

  // TODO move these to a common service
  async function addNewMovie(movieData) {
    try {
      const { data, error } = await MovieDatabaseService.addMovie(movieData);

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
      <Dialog title="Add Movie" onClose={handleDialogOnClose} isOpen={isDialogOpen}>
        <MovieForm initialMovie={null} onSubmit={handleAddMovie} />
      </Dialog>
    </>
  );

};

export default AddMovie;
