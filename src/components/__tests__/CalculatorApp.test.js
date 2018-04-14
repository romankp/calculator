import React from 'react';
import CalculatorApp from '../CalculatorApp.jsx';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
    .create(<CalculatorApp/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});
