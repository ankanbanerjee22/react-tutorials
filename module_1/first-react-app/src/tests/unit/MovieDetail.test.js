import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieDetails from '../../components/MovieDetails';

const mockMovie = {
    imageUrl: 'mockImageUrl',
    movieName: 'Mock Movie',
    releaseYear: '2023',
    rating: 4,
    duration: '2h 30m',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et tempus quam. Duis nec ante vel felis consectetur tristique.',
    genres: ['Action', 'Adventure'],
    onClose: jest.fn(),
};

test('renders movie details correctly', () => {
    const { getByText } = render(<MovieDetails {...mockMovie} />);
    expect(getByText('Mock Movie')).toBeInTheDocument();
    expect(getByText('2023')).toBeInTheDocument();
    expect(getByText('2h 30m')).toBeInTheDocument();
    expect(getByText('Action, Adventure')).toBeInTheDocument();
    expect(getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et tempus quam. Duis nec ante vel felis consectetur tristique.')).toBeInTheDocument();
});

test('trims description correctly if it exceeds 400 characters', () => {
    const longDescription = 'a'.repeat(500);
    const { getByText } = render(<MovieDetails {...mockMovie} description={longDescription} />);
    const descriptionElement = getByText(/aaa/);
    const displayedDescription = descriptionElement.textContent;
    const expectedDescription = `Description: ${'a'.repeat(400)}......`;

    expect(displayedDescription).toContain(expectedDescription);
});

test('calls onClose when close button is clicked', () => {
    const { getByText } = render(<MovieDetails {...mockMovie} />);
    fireEvent.click(getByText('close'));
    expect(mockMovie.onClose).toHaveBeenCalledTimes(1);
});

test('renders unknown release year if releaseYear is missing', () => {
    render(<MovieDetails {...mockMovie} releaseYear={null} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
});

test('renders unknown genres if genres are missing', () => {
    render(<MovieDetails {...mockMovie} genres={null} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
});