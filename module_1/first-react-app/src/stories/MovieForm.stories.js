import React from 'react';
import MovieForm from '../components/MovieForm';

export default {
  title: 'Movie Form',
  component: MovieForm,
};

export const Default = () => (
  <div className='row '>
      <MovieForm
        initialMovie={ {
            "id": 338970,
            "movieName": "Tomb Raider",
            "tagline": "Her legend begins",
            "rating": 6.2,
            "vote_count": 817,
            "releaseYear": "2018",
            "imageUrl": "https://image.tmdb.org/t/p/w500/ePyN2nX9t8SOl70eRW47Q29zUFO.jpg",
            "description": "Lara Croft, the fiercely independent daughter of a missing adventurer, must push herself beyond her limits when she finds herself on the island where her father disappeared.",
            "budget": 94000000,
            "revenue": 126025000,
            "genres": [
              "Action",
              "Adventure"
            ],
            "duration": "1 hour 30 mins"
          }}
        onSubmit={(formData) => {
      
        }}
      />
  </div>
);
