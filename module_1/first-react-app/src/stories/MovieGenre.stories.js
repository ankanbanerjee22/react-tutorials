import React from 'react';
import MovieGenre from '../components/MovieGenre'; // Update the path to the MovieGenre component

export default {
  title: 'Movie Genre List',
  component: MovieGenre,
};

const Template = (args) => <MovieGenre {...args} />;

export const Default = Template.bind({});
Default.args = {
  genres: ['All', 'Action', 'Drama', 'Comedy', 'Sci-Fi'], 
  selectedGenre: 'All', 
  onSelect: (genre) => alert(`Selected Genre: ${genre}`), 
};