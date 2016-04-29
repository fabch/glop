var React = require('react'),
    ReactDOM = require('react-dom');

var Preloader = React.createClass({

    render: function() {
        return (
            <div className="sk-cube-grid">
                <div className="sk-cube sk-cube1 bgEngieBlueLight"></div>
                <div className="sk-cube sk-cube2 bgEngieBlue"></div>
                <div className="sk-cube sk-cube3 bgEngieGreenLight"></div>
                <div className="sk-cube sk-cube4 bgEngieGreen"></div>
                <div className="sk-cube sk-cube5 bgEngieGreenDark"></div>
                <div className="sk-cube sk-cube6 bgEngieYellow"></div>
                <div className="sk-cube sk-cube7 bgEngieRed"></div>
                <div className="sk-cube sk-cube8 bgEngiePurple"></div>
                <div className="sk-cube sk-cube9 bgEngiePink"></div>
            </div>
        );
    }
});


module.exports = Preloader;

