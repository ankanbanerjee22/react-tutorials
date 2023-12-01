import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Movie from '../../components/Movie';


  const mockMovie = {
    imageUrl: 'test-image-url',
    movieName: 'Test Movie',
    releaseYear: '2023',
    genres: ['Action', 'Adventure'],
    description: 'Test movie description',
    rating: 8.5,
  };

  test('renders movie details correctly', () => {
    const { getByText } = render(<Movie {...mockMovie} />);
    expect(getByText('Test Movie')).toBeInTheDocument();
    expect(getByText('2023')).toBeInTheDocument();
    expect(getByText('Action, Adventure')).toBeInTheDocument();
  });

  test('calls onTileClick when clicked', () => {
    const mockOnTileClick = jest.fn();
    const { getByText } = render(<Movie {...mockMovie} onClick={mockOnTileClick} />);
    fireEvent.click(getByText('Test Movie'));
    expect(mockOnTileClick).toHaveBeenCalledTimes(1);
  });

   test('displays default text for missing movie name', () => {
    const { container } = render(<Movie {...mockMovie} movieName={null} />);
    expect(container.textContent).toContain('Unknown Movie');
  });

  test('displays default text for missing genres', () => {
    const { container } = render(<Movie {...mockMovie} genres={null} />);
    expect(container.textContent).toContain('N/A');
  });

  test('displays N/A for missing release year', () => {
    const { container } = render(<Movie {...mockMovie} releaseYear={null} />);
    expect(container.textContent).toContain('N/A');
  });