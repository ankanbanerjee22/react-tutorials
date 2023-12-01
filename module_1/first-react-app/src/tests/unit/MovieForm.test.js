import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieForm from '../../components/MovieForm';

describe('MovieForm component', () => {

    global.M = {
        AutoInit: jest.fn(),
    };

    const initialMovie = {
        movieName: 'Example Movie',
        releaseYear: '2022',
        imageUrl: 'http://example.com/poster.jpg',
        rating: 8,
        genres: ['action', 'adventure'],
        duration: '120',
        description: 'A sample movie description',
    };

    const mockOnSubmit = jest.fn();

    it('renders correctly with initial data', () => {
        const { getByTestId, getByText } = render(<MovieForm initialMovie={initialMovie} onSubmit={mockOnSubmit} />);

        expect(getByTestId('movie-form')).toBeInTheDocument();
        expect(getByTestId('title')).toHaveValue(initialMovie.movieName);
        expect(getByTestId('releaseDate')).toHaveValue('2022-01-01');
        expect(getByTestId('movieUrl')).toHaveValue(initialMovie.imageUrl);
        expect(getByTestId('rating')).toHaveValue(initialMovie.rating);
        expect(getByTestId('dropdown')).toHaveValue(['action', 'adventure']);
        expect(getByTestId('runtime')).toHaveValue(initialMovie.duration);
        expect(getByTestId('overview')).toHaveValue(initialMovie.description);
    });

    it('calls onSubmit with form data when submitted', () => {
        const { getByTestId } = render(<MovieForm initialMovie={initialMovie} onSubmit={mockOnSubmit} />);

        fireEvent.submit(getByTestId('movie-form'));

        const expectedFormData = {
            title: initialMovie.movieName,
            releaseDate: '2022-01-01',
            movieUrl: initialMovie.imageUrl,
            rating: 8,
            runtime: initialMovie.duration,
            overview: initialMovie.description,
        };

        expect(mockOnSubmit).toHaveBeenCalledWith(expectedFormData);
    });

    it('updates rating input field correctly', () => {
        const { getByTestId } = render(<MovieForm initialMovie={initialMovie} onSubmit={mockOnSubmit} />);
        fireEvent.change(getByTestId('rating'), { target: { value: 9 } });
        expect(getByTestId('rating')).toHaveValue(9);
    });

    it('updates movie name input field correctly', () => {
        const { getByTestId } = render(<MovieForm initialMovie={initialMovie} onSubmit={mockOnSubmit} />);
        fireEvent.change(getByTestId('title'), { target: { value: 'New Movie' } });
        expect(getByTestId('title')).toHaveValue('New Movie');
    });

    it('updates release date input field correctly', () => {
        const { getByTestId } = render(<MovieForm initialMovie={initialMovie} onSubmit={mockOnSubmit} />);
        fireEvent.change(getByTestId('releaseDate'), { target: { value: '2022-12-15' } });
        expect(getByTestId('releaseDate')).toHaveValue('2022-12-15');
    });

    it('updates movie URL input field correctly', () => {
        const { getByTestId } = render(<MovieForm initialMovie={initialMovie} onSubmit={mockOnSubmit} />);
        fireEvent.change(getByTestId('movieUrl'), { target: { value: 'http://newexample.com/poster.jpg' } });
        expect(getByTestId('movieUrl')).toHaveValue('http://newexample.com/poster.jpg');
    });

    it('updates runtime input field correctly', () => {
        const { getByTestId } = render(<MovieForm initialMovie={initialMovie} onSubmit={mockOnSubmit} />);
        fireEvent.change(getByTestId('runtime'), { target: { value: '2h 45min' } });
        expect(getByTestId('runtime')).toHaveValue('2h 45min');
    });

    it('updates overview textarea field correctly', () => {
        const { getByTestId } = render(<MovieForm initialMovie={initialMovie} onSubmit={mockOnSubmit} />);
        fireEvent.change(getByTestId('overview'), { target: { value: 'New overview text' } });
        expect(getByTestId('overview')).toHaveValue('New overview text');
    });

});