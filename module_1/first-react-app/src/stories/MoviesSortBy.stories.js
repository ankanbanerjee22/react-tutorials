import React from 'react';
import { action } from '@storybook/addon-actions';
import MovieSortBy from '../components/MovieSortBy'
export default {
  title: 'Movie Sort by dropdown',
  component: MovieSortBy,
};

const Template = (args) => <MovieSortBy {...args} />;

export const Default = Template.bind({});
Default.args = {
  sortBy: 'releaseDate',
  onSortChange: action('Sort Changed'),
};
