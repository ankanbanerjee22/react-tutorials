import React, { useState } from 'react';
import '../css/Counter.css';

/**
 * This was made as wanted to write the same Counter component using JSX as well, to understand the legacy reactJs
 * with current style of writing components using JSX
 * 
 * @returns Counter with JSX
 */
const Counter = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        setCount(count - 1);
    };

    return (
        <div className="container"> 

            <div className="row">
                <div className="col s5 right-align counter-button-style">
                    <button className="waves-effect red btn right-align" onClick={handleDecrement}>
                        <i className="material-icons">remove</i>
                    </button>
                </div>
                <div className="col s1"> 
                    <div className="text-input center-align counter-style">
                        {count}
                    </div>
                </div>
                <div className="col s1 left-align counter-button-style">
                    <button className="waves-effect green btn" onClick={handleIncrement}>
                        <i class="material-icons">add</i>
                    </button>
                </div>
            </div>
        </div>
    );

};


export default Counter;
