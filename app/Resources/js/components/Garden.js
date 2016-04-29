var React = require('react');
var ReactDOM = require('react-dom');
var update = require('react-addons-update');

var GardenActions = require('../actions/GardenActions');
var GardenStore = require('../stores/GardenStore');

var Preloader = require('./utils/Preloader');
var GardenItemSelector = require('./garden/GardenItemSelector');
var GardenItemDesc = require('./garden/GardenItemDesc');
var GardenIndicatorWrapper = require('./garden/GardenIndicatorWrapper');
var GardenPointCounter = require('./garden/GardenPointCounter');
var GardenField = require('./garden/GardenField');

var Garden = React.createClass({

    current_points : 0,

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
        this.current_points = (state.garden.points ? state.garden.points : 0) - (state.selectedItem ? state.selectedItem.price  : 0);
        this.setState(state);
    },

    render() {

        if (!this.state.garden) {
            return ( <Preloader /> )
        }

        return (
            <div id="AppWrapper">
                <div id="GardenPointCounterWrapper">
                    <GardenPointCounter
                        key={'gardenPointCounter'}
                        points={this.current_points}
                    />
                </div>
                <div id="GardenItemSelectorWrapper">
                    <GardenItemSelector
                        key={'gardenItemSelector'}
                        points={this.current_points}
                        />
                    <div style={{clear:'both'}}></div>
                </div>
                <div id="GardenIndicatorWrapper">
                    <GardenIndicatorWrapper
                        gardenIndicators={this.state.garden.indicators}
                    />
                </div>
                <div id="GardenItemDescWrapper">
                    <GardenItemDesc item={this.state.focusedItem} />
                </div>
                <div id="GardenFieldWrapper">
                    <GardenField
                        key={'gardenField'}
                        tiles={this.state.garden.tiles}
                        isItems={this.state.isItems}
                        selectedItem={this.state.selectedItem}
                        />
                </div>
            </div>
        );
    }
});

module.exports = Garden;