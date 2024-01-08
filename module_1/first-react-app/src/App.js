import { NetflixRoulette } from './components/NetflixRoulette.js';
import PageNotFound from './components/PageNotFound.js';
import {  Routes, Route } from 'react-router-dom';
import Dialog from './components/Dialog.js';
import MovieForm from './components/MovieForm.js';
import { useState } from 'react';
import MovieDatabaseService from './services/MovieDatabaseRepository.js';
import { useNavigate, useSearchParams } from 'react-router-dom';



function App() {

  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const changePath = (path) => {
    window.history.pushState({}, '', path);
  }

  const handleEditMovieSubmit = async (movie) => {
    await updateMovie(movie);
    setIsDialogOpen(false);
    navigate(`/${movie.id}?${searchParams.toString()}`);
    window.location.reload(false);
  }

  const handleDeleteMovieSubmit = async (movieId) => {
    setIsDialogOpen(false);
    await deleteMovie(movieId);
    navigate(`/?${searchParams.toString()}`);
    //changePath('/');
    window.location.reload(false);
  }

  const handleAddMovie = (movie) => {
    addNewMovie(movie);
    setIsDialogOpen(false);
    navigate(-1);
    //changePath('/');
    //window.location.reload(false);

  };

  const handleDialogOnClose = () => {
    setIsDialogOpen(false);
    navigate(-1);

  }

  return (
    <>
      <Routes>
        <Route path="/" element={<NetflixRoulette />}>
          <Route path="add" element={
            (
              <>
                <Dialog title="Add Movie" onClose={handleDialogOnClose} isOpen={isDialogOpen}>
                  <MovieForm initialMovie={null} onSubmit={handleAddMovie} />
                </Dialog>
              </>)
          } />

          <Route path=":movieId" >
            <Route path="edit" element={
              <Dialog title="Edit Movie" onClose={handleDialogOnClose} isOpen={isDialogOpen}>
                <MovieForm initialMovie={null} onSubmit={handleEditMovieSubmit} />
              </Dialog>
            } />
            <Route path="edit"  element={
              <Dialog title="Edit Movie" onClose={handleDialogOnClose} isOpen={isDialogOpen}>
                <MovieForm initialMovie={null} onSubmit={handleEditMovieSubmit} />
              </Dialog>
            } />
            <Route path="delete" element={
              <Dialog title="Delete Movie" onClose={handleDialogOnClose} isOpen={isDialogOpen}>
                <MovieForm initialMovie={null} deleteMovie={true} onSubmit={handleDeleteMovieSubmit} />
              </Dialog>} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );

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


}




export default App;