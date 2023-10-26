import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MovieGenre from '../../components/MovieGenre';

const genres = ['Action', 'Comedy', 'Drama', 'Horror'];
const selectedGenre = 'Comedy';
const onSelectMock = jest.fn();


global.M = {
  Tabs: {
    init: jest.fn(), // Mock the init method of Tabs
  },

};

test('component renders all genres passed in props', () => {
  const { getByText } = render(<MovieGenre genres={genres} selectedGenre={selectedGenre} onSelect={onSelectMock} />);
  genres.forEach(genre => {
    expect(getByText(genre)).toBeInTheDocument();
  });
});

test('component highlights a selected genre passed in props', () => {
  const { getByText } = render(<MovieGenre genres={genres} selectedGenre={selectedGenre} onSelect={onSelectMock} />);
  const selectedGenreButton = getByText(selectedGenre);
  expect(selectedGenreButton).toHaveClass('active');
});

test('after a click event on a genre button component calls "onChange" callback and passes correct genre in arguments', () => {
  const { getByText } = render(<MovieGenre genres={genres} selectedGenre={selectedGenre} onSelect={onSelectMock} />);
  const genreToSelect = 'Action';
  const genreButton = getByText(genreToSelect);
  fireEvent.click(genreButton);
  expect(onSelectMock).toHaveBeenCalledWith(genreToSelect);
});
