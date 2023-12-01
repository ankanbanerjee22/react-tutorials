import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieForm from '../../components/MovieForm';

describe('MovieForm component', () => {

    global.M = {
        AutoInit: jest.fn(),
    };

    const initialMovie = {
        title: 'Example Movie',
        release_date: '2022-01-01',
        poster_path: 'http://example.com/poster.jpg',
        vote_average: 8,
        genres: ['action', 'adventure'],
        runtime: '120',
        overview: 'A sample movie description',
    };

    const mockOnSubmit = jest.fn();

    it('renders correctly with initial data', () => {
        const { getByTestId, getByText } = render(<MovieForm initialMovie={initialMovie} onSubmit={mockOnSubmit} />);

        expect(getByTestId('movie-form')).toBeInTheDocument();
        expect(getByTestId('title')).toHaveValue(initialMovie.movieName);
        expect(getByTestId('releaseDate')).toHaveValue('2022-01-01');
        expect(getByTestId('movieUrl')).toHaveValue(initialMovie.imageUrl);
        expect(getByTestId('rating')).toHaveValue(initialMovie.vote_average);
        expect(getByTestId('dropdown')).toHaveValue(['action', 'adventure']);
        expect(getByTestId('runtime')).toHaveValue(initialMovie.runtime);
        expect(getByTestId('overview')).toHaveValue(initialMovie.overview);
    });

    it('calls onSubmit with form data when submitted', () => {
        const { getByTestId } = render(<MovieForm initialMovie={initialMovie} onSubmit={mockOnSubmit} />);

        fireEvent.submit(getByTestId('movie-form'));

        const expectedFormData = {
            title: initialMovie.title,
            releaseDate: '2022-01-01',
            movieUrl: initialMovie.poster_path,
            rating: initialMovie.vote_average,
            runtime: initialMovie.runtime,
            overview: initialMovie.overview,
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