import React, {  useEffect } from 'react';
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
    }, []);

    return (
        <>
            <div className="input-field dropdown-container">
                <span className="label">Sort By : </span>
                <select id="dropdown" data-testid="sortdown" className="select" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
                    <option key="release_date" id="release_date" value="release_date">Release Dates</option>
                    <option value="title">Title</option>
                    <option value="vote_average">Rating</option>
                    <option value="vote_count">Vote</option>
                    <option value="budget">Budget</option>
                    <option value="revenue">Revenue</option>
                    <option value="runtime">Movie Runtime</option>
                </select>
            </div>
        </>
    );

}

export default MovieSortBy;