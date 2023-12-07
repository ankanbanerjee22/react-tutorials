import { NetflixRoulette } from './components/NetflixRoulette.js';
import PageNotFound from './components/PageNotFound.js';
import {  Routes, Route } from 'react-router-dom';
// import {  Routes, Route } from "@remix-run/react"

import AddMovie from './components/AddMovie.js'
import EditMovie from './components/EditMovie.js';
import DeleteMovie from './components/DeleteMovie.js';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NetflixRoulette />}>
          <Route path="add" element={<AddMovie/>} />
          <Route path=":movieId" >
            <Route path="edit" element={<EditMovie/>} />
            <Route path="delete" element={<DeleteMovie/>} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );

}

export default App;
