import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBox from '../../components/SearchBox';

test('renders an input with the value equal to initial value passed in props', () => {
    const { getByPlaceholderText } = render(<SearchBox initialQuery="initial value" onSearch={() => {}} />);
    const searchInput = getByPlaceholderText(/What do you want to watch/i);
    expect(searchInput.value).toBe('initial value');
});

test('onChange prop is called with proper value after typing and clicking the Search button', () => {
    const onSearchMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(<SearchBox initialQuery="" onSearch={onSearchMock} />);
    const searchInput = getByPlaceholderText(/What do you want to watch/i);
    fireEvent.change(searchInput, { target: { value: 'random movie' } });
    fireEvent.click(getByText('Search'));
    expect(onSearchMock).toHaveBeenCalledWith('random movie');
});

test('onChange prop is called with proper value after typing and pressing Enter key', () => {
    const onSearchMock = jest.fn();
    const { getByPlaceholderText } = render(<SearchBox initialQuery="" onSearch={onSearchMock} />);
    const searchInput = getByPlaceholderText(/What do you want to watch/i);
    fireEvent.change(searchInput, { target: { value: 'random movie' } });
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    expect(onSearchMock).toHaveBeenCalledWith('random movie');
});
