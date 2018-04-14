var React = require('react');
var Screen = require('./Screen.jsx');
var Keys = require('./Keys.jsx');

class CalculatorApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenContent: ''
        };

        this.perensCount = {
            left: 0,
            right: 0
        };

        this.handleKeyClick = this.handleKeyClick.bind(this);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    perensCount: {
        left: 0,
        right: 0
    }

    handleKeyClick(key) {
        ///////// Still Need:
        // Common symbols to equation safe characters and back for screen.
        // Floating point solution.
        // Check if string has weird formatting like: '4x06', and either remove zero or error out.

        switch (key) {
            // Operands
            case '0':
                this.processOperands('0');
                break;

            case '1':
                this.processOperands('1');
                break;

            case '2':
                this.processOperands('2');
                break;

            case '3':
                this.processOperands('3');
                break;

            case '4':
                this.processOperands('4');
                break;

            case '5':
                this.processOperands('5');
                break;

            case '6':
                this.processOperands('6');
                break;

            case '7':
                this.processOperands('7');
                break;

            case '8':
                this.processOperands('8');
                break;

            case '9':
                this.processOperands('9');
                break;

            // Decimal
            case '.':
                this.processOperands('.');
                break;

            // Operand Modifiers
            case '+/-':
                this.processModifiers('(-');
                break;

            case '(':
                this.processModifiers('(');
                break;

            case ')':
                this.processModifiers(')');
                break;

            // Simple Operators
            case '/':
                this.processOperator('/');
                break;

            case '*':
                this.processOperator('*');
                break;

            case '-':
                this.processOperator('-');
                break;

            case '+':
                this.processOperator('+');
                break;

            // Clear
            case 'c':
                this.setState({
                    screenContent: ''
                });
                break;

            // Equals
            case '=':
                let equationString = this.state.screenContent;
                // let translatedString = this.translateString(equationString);

                console.log(this.closingOperatorTest());

                if (this.closingOperatorTest() && this.extraPerensTest()) { // If equation passes string tests for acceptible notation.
                    // let evalContent = eval(translatedString);
                    let evalContent = eval(equationString);

                    if (evalContent) {
                        this.setState({
                            screenContent: evalContent.toString() // Eval() numbers need to be formatted back to string before being saved to state.
                        });
                    } else {
                        this.setState({
                            screenContent: "can't do that, mate"
                        });
                    }

                    console.log('pass');
                } else {
                    this.setState({
                        screenContent: "let's try again"
                    });

                    setTimeout(() => { // Reinstates equation so user can edit it.
                        this.setState({
                            screenContent: equationString
                        });
                    }, 1200);

                    console.log('fails a formatting test');
                }
                break;

            // If all else fails...
            default:
                this.setState({
                    screenContent: "I don't know that button"
                });
        }
    }

    concatEquationString(char) { // Concatenates button character to the end of equation string.
        this.setState({
            screenContent: this.state.screenContent + char
        });
    }

    closingOperatorTest() { // Tests for operator, or opening perens, at the end of equation string.
        const lastTriggerArray = ['-', '+', '*', '/', '('];
        let string = this.state.screenContent;
        let lastChar = string.charAt(string.length - 1);
        let testState = true;

        lastTriggerArray.forEach((trigChar) => { // Checks the last character of the screen content string against each possible trigger character.
            if (lastChar === trigChar) {
                testState = false;
            }
        });

        return testState;
    }

    extraPerensTest() { // Tests for incomplete or extra perens notation.
        if (this.perensCount.left === this.perensCount.right) {
            return true;
        } else {
            return false;
        }
    }

    // translateString(equationString) {
    //     if (equationString.indexOf('%') > -1) {
    //         console.log('contains %');
    //     }
    // }

    processOperands(x) { // Processes incomplete or oddly constructed operand strings.
        let equationString = this.state.screenContent;
        let lastChar = equationString.charAt(equationString.length - 1);

        if (x === '0' && equationString === '0') { // To prevent awkward '0' related opening operands such as 0000.1.
            return
        } else if (x !== '.' && equationString === '0') { // To prevent opening operands like '06' but still allow decimal notation. Valid operand replaces opening '0'.
            this.setState({
                screenContent: x
            });
        } else if (x === '.' && lastChar === '.') { // If last character in string is already a decimal and the decimal button is clicked.
            return
        } else {
            this.concatEquationString(x);
        }
    }

    processModifiers(x) { // Addresses complications resulting from operand modifier formatting.
        let equationString = this.state.screenContent;

        if (x === '(-') {
            if (equationString.substring(0, 2) === '(-') {
                this.setState({
                    screenContent: this.state.screenContent.slice(2)
                });
            } else {
                this.setState({
                    screenContent: x + this.state.screenContent
                });
            }
        } else if (x === '(') {
            this.perensCount.left += 1;
            this.concatEquationString('(');
        } else if (x === ')') {
            this.perensCount.right += 1;
            this.concatEquationString(')');
        }
    }

    processOperator(x) { // Addresses incorrect use of extra operators in equation string.
        if (this.closingOperatorTest()) {
            this.concatEquationString(x);
        } else {
            let string = this.state.screenContent;

            this.setState({
                screenContent: string.slice(0, -1) + x
            });
        }
    }

    render() {
        return (
            <div className="app-root">
                <main className="calculator">
                    <Screen
                        screenContent={this.state.screenContent}
                    />
                    <Keys
                        handleKeyClick={this.handleKeyClick}
                    />
                </main>
                <div className="background"></div>
            </div>
        )
    }
};

module.exports = CalculatorApp;
