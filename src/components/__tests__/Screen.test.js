import React from 'react';
import Screen from '../Screen.jsx';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
    .create(<Screen/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});
