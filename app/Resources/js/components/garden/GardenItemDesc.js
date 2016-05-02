var React = require('react'),
    ReactDOM = require('react-dom');
var _ = require('underscore');
var Preloader         = require('../utils/Preloader');
var AnimationMixin = require('../../mixins/AnimationMixin');
var RootPathMixin = require('../../mixins/RootPathMixin');

var GardenItemDesc = React.createClass({

    mixins :[ AnimationMixin, RootPathMixin ],

    shouldComponentUpdate: function (nextProps, nextState) {
        return this.props.item != nextProps.item;
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (prevProps != this.props && this.props.item) {
            this.addAnimationStyle(ReactDOM.findDOMNode(this), ['animated','fadeInUp'], 0, 500);
        }
    },

    render: function() {
        if (!this.props.item) {
            return (
                <div className="GardenItemDesc"></div>
            );
        }
        return (
            <div id={'GardenItemDesc'} className={'gardenItemDesc'}>
                <div className={'gardenItemDescContent'}>
                    <h3><i className={this.props.item.picto}></i> {this.props.item.name}</h3>
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
                    <img src={this.rootPath + 'images/pictos/' + this.props.item.picto} />
                    <p>{this.props.item.infos}</p>
                    <ul>
                        { _.map(this.props.item.percs, (perc, key) => {
                            return (
                                <li key={'perc' + key} className={perc.indicator.cl}>
                                    <div className="imageWrapper"><img src={this.rootPath + 'images/pictos/' + perc.indicator.picto } /></div>
                                    <span>{perc.val + perc.unit}</span>
                                </li>
                            );
                        }) }
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = GardenItemDesc;