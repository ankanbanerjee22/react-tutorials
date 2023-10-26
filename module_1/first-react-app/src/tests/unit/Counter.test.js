import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CounterLegacy from '../../components/CounterLegacy';

test('Counter component renders initial value provided in props', () => {
    const counter = new CounterLegacy({ initialValue: 5 });
    expect(counter.state.count).toBe(5);
});

test('renders initial value provided in props', () => {
    const { getByText } = render(<CounterLegacy initialValue={5} />);
    expect(getByText('5')).toBeInTheDocument();
});

test('clicking decrement button decrements the displayed value', () => {
    const { getByText } = render(<CounterLegacy initialValue={3} />);
    const decrementButton = getByText('remove');
    fireEvent.click(decrementButton);
    expect(getByText('2')).toBeInTheDocument();
});

test('clicking increment button increments the displayed value', () => {
    const { getByText } = render(<CounterLegacy initialValue={8} />);
    const incrementButton = getByText('add');
    fireEvent.click(incrementButton);
    expect(getByText('9')).toBeInTheDocument();
});