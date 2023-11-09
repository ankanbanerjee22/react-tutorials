import React from 'react';
import MovieForm from '../components/MovieForm';

export default {
  title: 'Movie Form',
  component: MovieForm,
  args: {
    initialMovie:
    {
      "id": 338970,
      "title": "Tomb Raider",
      "tagline": "Her legend begins",
      "vote_average": 6.2,
      "vote_count": 817,
      "release_date": "2018-01-10",
      "poster_path": "https://image.tmdb.org/t/p/w500/ePyN2nX9t8SOl70eRW47Q29zUFO.jpg",
      "overview": "Lara Croft, the fiercely independent daughter of a missing adventurer, must push herself beyond her limits when she finds herself on the island where her father disappeared.",
      "budget": 94000000,
      "revenue": 126025000,
      "genres": [
        "Action",
        "Adventure"
      ],
      "runtime": "140"
    }
  },
};

export const Default = (args) => (
  <div className='row '>
    <MovieForm
      initialMovie={args.initialMovie}
      onSubmit={(formData) => {
      }}
    />
  </div>
);



