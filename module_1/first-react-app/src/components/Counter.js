import React, { useState } from 'react';

/**
 * This was made as wanted to write the same Counter component using JSX as well, to understand the legacy reactJs
 * with current style of writing components using JSX
 * 
 * @returns Counter with JSX
 */
const Counter = () => {
    const [count, setCount] = useState(0); // Initialize state for the counter


    const handleIncrement = () => {
        setCount(count + 1); // Increment the counter
    };

    const handleDecrement = () => {
        setCount(count - 1); // Decrement the counter
    };



    // for css
    const chipStyle = {
        backgroundColor: '#fafafa', // Set your desired background color
        color: '#009688', // Text color
        fontSize: '2.2rem', // Set the font size
        fontWeight: 'bold',
        borderColor: 'black',
        border: '2px solid black',
        borderRadius: '20px', // Set border radius for a rounded shape
    };

    return (
        <div className="container"> {/* Materialize container class */}

            <div className="row"> {/* Materialize row class */}
                <div className="col s5 right-align" style={{ margin: '6px 20px' }}>
                    <button className="waves-effect red btn right-align" onClick={handleDecrement}>
                        <i class="material-icons">remove</i>
                    </button>
                </div>
                <div className="col s1"> {/* Materialize column classes */}
                    <div className="text-input center-align" style={chipStyle}> {/* Materialize chip class */}
                        {count} {/* Counter value */}
                    </div>
                </div>
                <div className="col s1 left-align" style={{ margin: '6px 20px' }}>
                    <button className="waves-effect green btn" onClick={handleIncrement}>
                        <i class="material-icons">remove</i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Counter;