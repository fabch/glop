var React = require('react');
var ReactDOM = require('react-dom');
var update = require('react-addons-update');

var GardenActions = require('../actions/GardenActions');
var GardenStore = require('../stores/GardenStore');

var Preloader = require('./utils/Preloader');
var GardenItemSelector = require('./garden/GardenItemSelector');
var GardenIndicatorWrapper = require('./garden/GardenIndicatorWrapper');
var GardenPointCounter = require('./garden/GardenPointCounter');
var GardenField = require('./garden/GardenField');

var Garden = React.createClass({
    getInitialState() {
        return GardenStore.getState();
    },

    componentDidMount() {
        GardenStore.listen(this.onChange);
        GardenActions.fetchGarden();
    },

    componentWillUnmount() {
        GardenStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    changeSelectedItem:function(old_item, new_item){
        var points_change = (old_item ? old_item.price : 0) - (new_item ? new_item.price : 0);
        var newState = update(this.state, {
            garden: {
                points: { $set: this.state.garden.points + points_change }
            }
        });
        this.setState(newState);
    },

    dropSelectedItem:function(){
        console.log(_params);
    },

    render() {

        if (!this.state.garden) {
            return ( <Preloader /> )
        }

        return (
            <div id="AppWrapper">
                <div id="GardenPointCounter">
                    <GardenPointCounter
                        key={'gardenPointCounter'}
                        points={this.state.garden.points}
                    />
                </div>
                <div id="GardenIndicatorWrapper">
                    <GardenIndicatorWrapper
                        gardenIndicators={this.state.garden.indicators}
                    />
                </div>
                <div id="GardenItemSelector">
                    <GardenItemSelector
                        key={'gardenItemSelector'}
                        points={this.state.garden.points}
                        changeSelectedItem={this.changeSelectedItem}
                    />
                    <div style={{clear:'both'}}></div>
                </div>
                <div id="GardenField">
                    <GardenField
                        key={'gardenField'}
                        tiles={this.state.garden.tiles}
                        isItems={this.state.isItems}
                        dropSelectedItem={this.dropSelectedItem}
                    />
                </div>
            </div>
        );
    }
});

module.exports = Garden;