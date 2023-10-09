import React from 'react';


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

        // not using global css, wanted to try this way using react
        const buttonStyle = {
            margin: '6px 20px'
        };

        const counterStyle = {
            backgroundColor: '#fafafa', 
            color: '#009688', // Text color
            fontSize: '2.2rem',
            fontWeight: 'bold',
            borderColor: 'black',
            border: '2px solid black',
            borderRadius: '20px', //radius for a rounded shape
        };

        return React.createElement('div', null, [
            React.createElement('div', { className: 'row' }, [
                React.createElement('div', { className: 'col s5 right-align', style: buttonStyle }, [
                    React.createElement('button', { className: 'waves-effect red btn right-align', onClick: this.handleDecrement }, [
                        React.createElement('i', { className: 'material-icons' }, 'remove')
                    ])
                ]),
                React.createElement('div', { className: 'col s1' }, [
                    React.createElement('div', { className: 'text-input center-align', style: counterStyle }, [
                        this.state.count
                    ])
                ]),
                React.createElement('div', { className: 'col s1 left-align', style: buttonStyle }, [
                    React.createElement('button', { className: 'waves-effect green btn', onClick: this.handleIncrement }, [
                        React.createElement('i', { className: 'material-icons' }, 'add')
                    ])
                ])
            ])
        ]);
    }
}
export default CounterLegacy;
