import React, { useEffect, useState } from 'react';
import '../css/MoviesSortBy.css';

/**
 * Requirements
 * --------------
 * This component will render a label "Sort by" and a select control to the right. Select should have the following options:
 *  Release Date
 *  Title
 * 
 * The component should take a property that specifies current selection. Additionally, it should take a callback property to handle selection changes. The callback should be called every time a user changes "Sort by" value. The new value should be passed in callback arguments.
 * Use Storybook when implementing every individual component. Write a story for every component you create. It will help you to check the result and play around with some interactivity before you embed components into the app.
 * 
 */
const MovieSortBy = ({ sortBy, onSortChange }) => {

    useEffect(() => {
        window.M.AutoInit();
    }, [sortBy]);

    const [optionsList, setOptionsList] = useState([
        { key: 'release_date', value: 'release_date', label: 'Release Dates' },
        { key: 'title', value: 'title', label: 'Title' },
        { key: 'vote_average', value: 'vote_average', label: 'Rating' },
        { key: 'vote_count', value: 'vote_count', label: 'Vote' },
        { key: 'budget', value: 'budget', label: 'Budget' },
        { key: 'revenue', value: 'revenue', label: 'Revenue' },
        { key: 'runtime', value: 'runtime', label: 'Movie Runtime' }
    ]);

    return (
        <>
            <div className="input-field dropdown-container">
                <span className="label">Sort By : </span>
                <select id="dropdown" data-testid="sortdown" className="select" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
                    {optionsList.map((option) => (
                        <option key={option.key} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );

}

export default MovieSortBy;