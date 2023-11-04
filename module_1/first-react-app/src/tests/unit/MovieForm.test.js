import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import MovieForm from '../../components/MovieForm';

describe('MovieForm Component', () => {
  global.M = {
    AutoInit: jest.fn(),
  };

  const mockOnSubmit = jest.fn();

  const initialMovie = {
    movieName: 'Example Movie',
    releaseYear: '2023',
    imageUrl: 'example-url.jpg',
    rating: 8,
    genres: ['action', 'adventure'],
    duration: '120 mins',
    description: 'Example movie description',
  };

  it('renders MovieForm component with initial values', () => {
    const { getByText } = render(<MovieForm initialMovie={initialMovie} onSubmit={mockOnSubmit} />);

    expect(getByText('Example Movie'));
    expect(getByText('2023-01-01'));
    expect(getByText('example-url.jpg'));
    expect(getByText('8'));
    expect(getByText((['action', 'adventure'])));
    expect(getByText(('120 mins')));
    expect(getByText(('Example movie description')));
  });

  it('submits the form with correct data when filled out', () => {
    render(<MovieForm initialMovie={initialMovie} onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText('Movie Name:'), {
      target: { value: 'New Movie' },
    });
    fireEvent.change(screen.getByLabelText('Rating:'), { target: { value: '9' } });
    fireEvent.change(screen.getByLabelText('Runtime:'), { target: { value: '130 mins' } });

    fireEvent.submit(screen.getByTestId('movie-form'));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'New Movie',
      releaseDate: '2023-01-01',
      movieUrl: 'example-url.jpg',
      rating: '9',
      runtime: '130 mins',
      overview: 'Example movie description',
    });
  });
});
