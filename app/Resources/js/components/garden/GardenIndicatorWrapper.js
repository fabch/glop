var React = require('react'),
    ReactDOM = require('react-dom');

var _ = require('underscore');

var GardenStore       = require('../../stores/GardenStore');
var Preloader         = require('../utils/Preloader');
var AnimationMixin = require('../../mixins/AnimationMixin');
var RootPathMixin = require('../../mixins/RootPathMixin');

var GardenIndicator = React.createClass({

    mixins :[ AnimationMixin, RootPathMixin ],

    statics: {
        getMeterLevel: function(indicator) {
            console.log((indicator.max - indicator.min) * (indicator.val - indicator.min) /100);
            return (indicator.max - indicator.min) * (indicator.val - indicator.min) / 100;
        }
    },

    meterLevel : 0,

    getInitialState: function() {
        return {
            indicator  : this.props.indicator
        };
    },

    componentDidMount() {
        this.addAnimationStyle(ReactDOM.findDOMNode(this), ['animated','rubberBand'], 0, 1000);
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (this.state.indicator.val - prevState.indicator.val) {
            this.addAnimationStyle(ReactDOM.findDOMNode(this), ['animated','rubberBand'], 0, 1000);
        }
    },

    render: function() {
        if (!this.props.indicator) {
            return ( <Preloader /> );
        }
        var meterLevel = Math.round(((this.props.indicator.val - this.props.indicator.min) * 100) / (this.props.indicator.max - this.props.indicator.min));
        var text = this.props.indicator.name + '-' + meterLevel +'%';
        return (
            <div className={'gardenIndicator '  + this.props.indicator.cl}>
                <span className={'gardenIndicatorPicto'} >
                    <img src={this.rootPath + 'images/pictos/' + this.props.indicator.picto } />
                </span>
                <div className={'meter animate '}>
                    <span style={{width: meterLevel + '%'}}><span></span></span>
                </div>
            </div>
        );
    }
});

var GardenIndicatorWrapper = React.createClass({

    mixins :[ RootPathMixin ],

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
                <img src={this.rootPath + 'images/LOGO_CHALLENGIEGARDEN_RVB.png'} alt="" height="60px" />
                <div className="gardenColorBar">
                    <div className="colorBar">
                        <div className="bgEngiePink"></div>
                        <div className="bgEngieYellow"></div>
                        <div className="bgEngieBlueLight"></div>
                        <div className="bgEngieGreenLight"></div>
                        <div className="bgEngieGreen"></div>
                        <div className="bgEngieGreenDark"></div>
                        <div className="bgEngieBlue"></div>
                        <div className="bgEngieGreenDark2"></div>
                        <div className="bgEngieRed"></div>
                        <div className="bgEngiePurple"></div>
                    </div>
                </div>
                {_.map(this.props.gardenIndicators, (gardenIndicator, key) => {
                    return (
                        <GardenIndicator
                            key={key}
                            odr={key}
                            indicator={gardenIndicator}
                            />
                    );
                })}
            </div>
        );
    }
});

module.exports = GardenIndicatorWrapper;