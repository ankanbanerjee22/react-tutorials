import React, { useState } from 'react';
import MovieDetails from '../components/MovieDetails';
import { NOT_APPLICABLE, UNKNOWN_MOVIE } from '../literals';

export default {
    title: 'MovieDetails',
    component: MovieDetails,
  };
  
  const Template = (args) => <MovieDetails {...args} />;
  
  export const Default = Template.bind({});

  Default.args = {
    "id": 354912,
    "movieName": "Coco",
    "tagline": "The celebration of a lifetime",
    "rating": 7.8,
    "vote_count": 3619,
    "releaseYear": "2017",
    "imageUrl": "https://image.tmdb.org/t/p/w500/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg",
    "description": "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
    "genres": [
        "Adventure",
        "Comedy",
        "Family",
        "Animation"
    ],
    "duration": 117,
    onClose: () => { }, // Mock onClose function
  };
