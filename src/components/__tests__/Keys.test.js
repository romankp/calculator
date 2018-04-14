import React from 'react';
import Keys from '../Keys.jsx';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
    .create(<Keys/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});
