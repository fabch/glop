var React = require('react'),
    ReactDOM = require('react-dom');

var Preloader         = require('../utils/Preloader');
var AnimationMixin = require('../../mixins/AnimationMixin');

var GardenItem        = require('./GardenItem');
var GardenItemActions = require('../../actions/GardenItemActions');
var GardenStore       = require('../../stores/GardenStore');
var GardenItemStore   = require('../../stores/GardenItemStore');


var GardenItemDesc = React.createClass({

    mixins :[ AnimationMixin ],

    shouldComponentUpdate: function (nextProps, nextState) {
        return this.props.item != nextProps.item;
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (prevProps != this.props && this.props.item) {
            this.addAnimationStyle(ReactDOM.findDOMNode(this), ['animated','fadeInDown'], 0, 1000);
        }
    },

    render: function() {
        if (!this.props.item) {
            return (
                <div></div>
            );
        }
        return (
            <div>
                <h3>
                    <i className={this.props.item.picto}></i> {this.props.item.name}</h3>
                <p>{this.props.item.infos}</p>
                <ul>
                    {this.props.item.vals.map((val, index) => {
                        return (
                            <li key={'ItemVal' + index} >{val.desc} <span>{val.val + val.unit}</span></li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});

var GardenItemSelector = React.createClass({

    getInitialState: function() {
        return GardenItemStore.getState();
    },

    componentDidMount() {
        GardenItemStore.listen(this.onChange);
        GardenItemActions.fetchGardenItems();
    },

    componentWillUnmount() {
        GardenItemStore.unlisten(this.onChange);
    },

    componentWillUpdate(nextProps, nextState) {
        if(nextState.selectedItem !== this.state.selectedItem){
            this.props.changeSelectedItem(this.state.selectedItem, nextState.selectedItem);

            if(nextState.selectedItem !== null){
                document.querySelector('.gardenItemSelector').style.marginTop = - document.querySelector('.gardenItemSelector').clientTop;
                document.querySelector('.gardenItemSelector').style.overflow = 'visible';
            }else{
                document.querySelector('.gardenItemSelector').style.overflow = 'auto';
                document.querySelector('.gardenItemSelector').style.marginTop = 0;
            }
        }
    },

    componentDidUpdate(prevProps, prevState) {
        if(this.state.focusedItem !== null){
            ReactDOM.findDOMNode(this.refs['gardenItem' + this.state.focusedItem.id]).focus();
        }
    },

    onChange(state) {
        this.setState(state);
    },

    render: function() {

        if (!this.state.gardenItems.length) {
            return ( <Preloader /> );
        }

        return (
            <div className="gardenItemSelector">
                <GardenItemDesc item={this.state.focusedItem} />
                {this.state.gardenItems.map((gardenItem, index) => {
                    return (
                        <GardenItem
                            key={gardenItem.id}
                            ref={'gardenItem' + gardenItem.id}
                            index={index}
                            item={gardenItem}
                            points={this.props.points}
                            />
                    );
                })}
            </div>
        );
    }
});

module.exports = GardenItemSelector;