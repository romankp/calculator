import React from 'react';
import PropTypes from 'prop-types';

const Screen = props => {
    return (
        <div className="screen">
            <span className="screen-content">{props.screenContent}</span>
        </div>
    )
}

Screen.propTypes = {
    screenContent: PropTypes.string
};

export default Screen;
