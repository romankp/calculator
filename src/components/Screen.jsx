var React = require('react');

//var Screen = React.createClass({

class Screen extends React.Component {
    // render: function() {
    render() {
        return (
            <div className="screen">
                <span className="screen-content">{this.props.screenContent}</span>
            </div>
        )
    }
// });
};

module.exports = Screen;
