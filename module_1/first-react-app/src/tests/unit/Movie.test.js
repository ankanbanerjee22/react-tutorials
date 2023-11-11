import { render, screen, fireEvent } from '@testing-library/react';
import Movie from '../../components/Movie';

global.M = {
  Dropdown: {
    init: jest.fn(), // Mock AutoInit function
  } 
};

  const mockMovie = {
    poster_path: 'test-image-url',
    title: 'Test Movie',
    release_date: '2023',
    genres: ['Action', 'Adventure'],
    overview: 'Test movie description',
    voting_avg: 8.5,
  };

  test('renders movie details correctly', () => {
    const { getByText } = render(<Movie movie={mockMovie} />);
    expect(getByText('Test Movie')).toBeInTheDocument();
    expect(getByText('2023')).toBeInTheDocument();
    expect(getByText('Action, Adventure')).toBeInTheDocument();
  });

  test('calls onTileClick when clicked', () => {
    const mockOnTileClick = jest.fn();
    const { getByText } = render(<Movie movie={mockMovie} onMovieClick={mockOnTileClick} />);
    fireEvent.click(getByText('Test Movie'));
    expect(mockOnTileClick).toHaveBeenCalledTimes(1);
  });

  //  test('displays default text for missing movie name', () => {
  //   const { container } = render(<Movie movie={mockMovie} movieName={null} />);
  //   expect(container.textContent).toContain('Unknown Movie');
  // });

  // test('displays default text for missing genres', () => {
  //   const { container } = render(<Movie movie={mockMovie} genres={null} />);
  //   expect(container.textContent).toContain('N/A');
  // });

  // test('displays N/A for missing release year', () => {
  //   const { container } = render(<Movie movie={mockMovie} releaseYear={null} />);
  //   expect(container.textContent).toContain('N/A');
  // });