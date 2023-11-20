import { NetflixRoulette } from './components/NetflixRoulette.js';
import PageNotFound from './components/PageNotFound.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<NetflixRoulette/>} />
        <Route exact path="/:movieId" element={<NetflixRoulette/>} />
        <Route exact path="*" element = {<PageNotFound/>} />
      </Routes>
    </Router>
  );

}

export default App;