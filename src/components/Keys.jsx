import React from 'react';

class Keys extends React.Component {
    constructor(props) {
        super(props);
        this.registerClick = this.registerClick.bind(this);
    }

    // const keyDetails = {
    //     ['c', 'clear'],
    //     ['(', 'left-paren'],
    //     [')', 'right-paren'],
    //     ['/', 'divide'],
    //     ['7', 'seven'],
    //     ['8', 'eight'],
    //     ['9', 'nine'],
    //     ['*', 'multiply'],
    //     ['4', 'four'],
    //     ['5', 'five'],
    //     ['6', 'six'],
    //     ['-', 'subtract'],
    //     ['1', 'one'],
    //     ['2', 'two'],
    //     ['3', 'three'],
    //     ['+', 'plus'],
    //     ['+/-', 'pos-neg'],
    //     ['0', 'zero'],
    //     ['.', 'decimal'],
    //     ['=', 'equals']
    // }

    registerClick(keyFunction) {
        this.props.handleKeyClick(keyFunction);
    };

    render() {
        return (
            <div className="keys">
                <div className="key-row">
                    <button onClick={() => this.registerClick('c')} type="button" className="key clear">
                        C
                    </button>
                    <button onClick={() => this.registerClick('(')} type="button" className="key left-paren">
                        (
                    </button>
                    <button onClick={() => this.registerClick(')')} type="button" className="key right-paren">
                        )
                    </button>
                    <button onClick={() => this.registerClick('/')} type="button" className="key divide">
                        /
                    </button>
                </div>

                <div className="key-row">
                    <button onClick={() => this.registerClick('7')} type="button" className="key seven">
                        7
                    </button>
                    <button onClick={() => this.registerClick('8')} type="button" className="key eight">
                        8
                    </button>
                    <button onClick={() => this.registerClick('9')} type="button" className="key nine">
                        9
                    </button>
                    <button onClick={() => this.registerClick('*')} type="button" className="key multiply">
                        *
                    </button>
                </div>

                <div className="key-row">
                    <button onClick={() => this.registerClick('4')} type="button" className="key four">
                        4
                    </button>
                    <button onClick={() => this.registerClick('5')} type="button" className="key five">
                        5
                    </button>
                    <button onClick={() => this.registerClick('6')} type="button" className="key six">
                        6
                    </button>
                    <button onClick={() => this.registerClick('-')} type="button" className="key subtract">
                        -
                    </button>
                </div>

                <div className="key-row">
                    <button onClick={() => this.registerClick('1')} type="button" className="key one">
                        1
                    </button>
                    <button onClick={() => this.registerClick('2')} type="button" className="key two">
                        2
                    </button>
                    <button onClick={() => this.registerClick('3')} type="button" className="key three">
                        3
                    </button>
                    <button onClick={() => this.registerClick('+')} type="button" className="key add">
                        +
                    </button>
                </div>

                <div className="key-row">
                    <button onClick={() => this.registerClick('+/-')} type="button" className="key pos-neg">
                        +/-
                    </button>
                    <button onClick={() => this.registerClick('0')} type="button" className="key zero">
                        0
                    </button>
                    <button onClick={() => this.registerClick('.')} type="button" className="key decimal">
                        .
                    </button>
                    <button onClick={() => this.registerClick('=')} type="button" className="key equals">
                        =
                    </button>
                </div>
            </div>
        )
    };
};

export default Keys;
