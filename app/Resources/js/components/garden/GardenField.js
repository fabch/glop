var React = require('react'),
    ReactDOM = require('react-dom');

var GardenItemActions = require('../../actions/GardenItemActions');
var GardenItemStore   = require('../../stores/GardenItemStore');

var interact = require('interact');
var _=require('underscore');

var GardenTile = React.createClass({

    getInitialState: function() {
        return {
            tile  : this.props.tile,
            isItems:false
        };
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return (
            nextProps.isItems !== this.props.isItems
        );
    },

    componentDidMount: function(){
        var that = this;
        // enable draggables to be dropped into this
        interact(ReactDOM.findDOMNode(this)).dropzone({
            // only accept elements matching this CSS selector
            //accept: '.gardenItem',
            // Require a 75% element overlap for a drop to be possible
            //overlap: 0.75,

            // listen for drop related events:

            ondropactivate: function (event) {
                event.target.classList.add('drop-active');
                that.handleDropActivate();
            },
            ondragenter: function (event) {
                // feedback the possibility of a drop
                event.relatedTarget.classList.add('drop-target');
                event.target.classList.add('can-drop');
                that.handleDragEnter();
            },
            ondragleave: function (event) {
                // remove the drop feedback style
                event.target.classList.remove('drop-target');
                event.relatedTarget.classList.remove('can-drop');
                that.handleDragLeave();
            },
            ondrop: function (event) {
                that.handleDrop();
            }
        });
    },

    componentDidUpdate: function (prevProps) {
        if (!prevProps.isItems && this.props.isItems) {

        }
    },

    handleDropActivate :function(){
        console.log('handleDropActivate');
    },

    handleDragEnter:function(){
        console.log('handleDragEnter');
    },

    handleDragLeave:function(){
        console.log('handleDragLeave');
    },

    handleDrop:function(){
        console.log('handleDrop');
        this.props.onDropItem(this.props.tile);
    },

    render: function() {
        return (
            <div className="gardenTile"></div>
        );
    }
});

var GardenField = React.createClass({

    getInitialState: function() {
        return {
            isItems: this.props.isItems,
            tiles  : this.props.tiles
        };
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return (
            nextProps.tiles !== this.props.tiles ||
            nextState.tiles !== this.state.tiles ||
            nextProps.isItems !== this.props.isItems ||
            nextState.isItems !== this.state.isItems
        );
    },

    componentDidUpdate: function (prevProps) {
        if (!prevProps.isItems && this.props.isItems) {
            // enable draggables to be dropped into this
        }
    },

    handleDroppedItem:function(tile){
        console.log(tile);
    },

    render: function() {
        var flatTiles = _.reduce(this.props.tiles, function(x, y){ return x.concat(y); }, []);
        return (
            <div className="gardenField">
                <div className="gardenTable">
                    {flatTiles.map((tile, index) => {
                        return (
                            <GardenTile
                                index={tile.id}
                                ref={'gardenTile_' + tile.id}
                                key={'gardenTile_' + tile.id}
                                tile={tile}
                                isItems={this.props.isItems}
                                onDropItem={this.handleDroppedItem}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
});

module.exports = GardenField;