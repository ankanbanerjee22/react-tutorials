import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieSortBy from '../../components/MovieSortBy';

global.M = {
    AutoInit: jest.fn(),
};

describe('MovieSortBy Component', () => {
  it('renders the component', () => {
    render(<MovieSortBy sortBy="releaseDate" onSortChange={() => {}} />);
    expect(screen.getByText('Sort By :')).toBeInTheDocument();
  });

  it('displays the correct options in the dropdown', () => {
    render(<MovieSortBy sortBy="releaseDate" onSortChange={() => {}} />);
    expect(screen.getByText('Release Dates')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

});
