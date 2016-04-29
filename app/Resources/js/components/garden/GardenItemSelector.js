var React = require('react'),
    ReactDOM = require('react-dom');
var _ = require('underscore');
var Preloader         = require('../utils/Preloader');
var AnimationMixin = require('../../mixins/AnimationMixin');

var GardenItem        = require('./GardenItem');
var GardenActions     = require('../../actions/GardenActions');
var GardenStore       = require('../../stores/GardenStore');
var GardenItemStore   = require('../../stores/GardenItemStore');



var GardenItemSelector = React.createClass({

    getInitialState: function() {
        return GardenItemStore.getState();
    },

    componentDidMount() {
        GardenItemStore.listen(this.onChange);
        GardenActions.fetchGardenItems();
    },

    componentWillUnmount() {
        GardenItemStore.unlisten(this.onChange);
    },

    componentWillUpdate(nextProps, nextState) {
        if(nextState.selectedItem !== this.state.selectedItem){
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
            ReactDOM.findDOMNode( this.refs[this.state.focusedItem.name_canonical] ).focus();
        }
    },

    onChange(state) {
        this.setState(state);
    },

    render: function() {
        console.log(this.state.gardenItems);
        if (_.isNull(this.state.gardenItems)) {
            return ( <Preloader /> );
        }
        return (
            <div className="gardenItemSelectorWrapper">
                <div className="gardenItemSelector">
                    { _.map(this.state.gardenItems, (gardenItem, key) => {
                        return (
                            <GardenItem
                                key={key}
                                ref={key}
                                item={gardenItem}
                                points={this.props.points}
                                />
                        );
                    })}
                </div>
            </div>
        );
    }
});

module.exports = GardenItemSelector;