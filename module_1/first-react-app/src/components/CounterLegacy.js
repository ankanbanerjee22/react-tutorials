import React from 'react';
import '../css/Counter.css';

/**
 * This component is built as per ECMA script
 * 
 * Requirements
 * --------------
 * 1. A component that renders a numeric value and two buttons: one to decrement the value by 1, another to increment the value by 1.
 * 2. The component should take an initial value in a property.
 * 3. The component should be written using EcmaScript classes syntax, the `render` method should use `React.createElement` API (without JSX).
 */
class CounterLegacy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    handleIncrement = () => {
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    };

    handleDecrement = () => {
        if (this.state.count <= 0) {
            alert("Your count value is going to be negative");
        }
        this.setState(prevState => ({
            count: prevState.count - 1
        }));

    };
    
    render() {
        return React.createElement('div', null, [
            React.createElement('div', { className: 'row', key: 'row' }, [
                React.createElement('div', { className: 'col s5 right-align counter-button-style', key: 'decrementButton' }, [
                    React.createElement('button', { className: 'waves-effect red btn right-align', onClick: this.handleDecrement, key: 'decrementButtonInner' }, [
                        React.createElement('i', { className: 'material-icons', key: 'decrementIcon' }, 'remove')
                    ])
                ]),
                React.createElement('div', { className: 'col s1', key: 'countDisplay' }, [
                    React.createElement('div', { className: 'text-input center-align counter-style', key: 'countValue' }, [
                        this.state.count
                    ])
                ]),
                React.createElement('div', { className: 'col s1 counter-button-style', key: 'incrementButton' }, [
                    React.createElement('button', { className: 'waves-effect green btn', onClick: this.handleIncrement, key: 'incrementButtonInner' }, [
                        React.createElement('i', { className: 'material-icons', key: 'incrementIcon' }, 'add')
                    ])
                ])
            ])
        ]);
    }

}

export default CounterLegacy;
