var React = require('react'),
    ReactDOM = require('react-dom');

var GardenStore       = require('../../stores/GardenStore');
var Preloader         = require('../utils/Preloader');

var GardenIndicator = React.createClass({

    getInitialState: function() {
        return {
            indicator  : this.props.indicator
        };
    },

    componentDidMount() {
        var node = ReactDOM.findDOMNode(this);
        node.classList.add('animated','fadeInUp');
        node.style.animationDelay = this.props.index/10 + 's';
        node.addEventListener("webkitTransitionEnd", this.endAnimation);
    },


    endAnimation:function(e){
        e.target.classList.remove('pulse','fadeInUp');
        e.target.style.animationDelay = 'initial';
    },

    componentDidUpdate: function (prevProps) {
        if (!prevProps.indicator && this.props.indicator) {
        }
    },

    render: function() {
        if (!this.props.indicator) {
            return ( <Preloader /> );
        }

        return (
            <div className="gardenIndicator">
                {this.props.indicator.name}
            </div>
        );
    }
});

var GardenIndicatorWrapper = React.createClass({

    getInitialState: function() {
        return {
            gardenIndicators  : this.props.gardenIndicators
        };
    },

    componentDidMount() {
        //GardenStore.listen(this.onChange);
    },

    componentDidUpdate: function (prevProps) {
        if (!prevProps.gardenIndicators && this.props.gardenIndicators) {
        }
    },

    render: function() {
        if (!this.props.gardenIndicators) {
            return ( <Preloader /> );
        }

        return (
            <div className="gardenIndicatorWrapper">
                {this.props.gardenIndicators.map((gardenIndicator, index) => {
                    return (
                        <GardenIndicator
                            key={gardenIndicator.id}
                            index={index}
                            indicator={gardenIndicator}
                            />
                    );
                })}
            </div>
        );
    }
});

module.exports = GardenIndicatorWrapper;