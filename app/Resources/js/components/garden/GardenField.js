var React = require('react'),
    ReactDOM = require('react-dom');

var GardenItemStore   = require('../../stores/GardenItemStore');
var GardenActions = require('../../actions/GardenActions');
var RootPathMixin = require('../../mixins/RootPathMixin');

var interact = require('interact');
var _=require('underscore');

var GardenTile = React.createClass({

    mixins :[ RootPathMixin ],

    getInitialState: function() {
        return {
            tile  : this.props.tile,
            isItems:false
        };
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
        return (
            nextProps.isItems !== this.props.isItems ||
            nextProps.tile.item !== this.props.tile.item
        );
    },

    componentDidMount: function(){
        var that = this;
        // enable draggables to be dropped into this
        this.interact = interact(ReactDOM.findDOMNode(this)).dropzone({
            // only accept elements matching this CSS selector
            //accept: '.gardenItem',
            // Require a 75% element overlap for a drop to be possible
            //overlap: 0.75,
            enabled :true,
            // listen for drop related events:

            ondropactivate: function (event) {
                event.target.classList.add('dropActive');
                that.handleDropActivate();
            },
            ondragenter: function (event) {
                // feedback the possibility of a drop
                event.relatedTarget.classList.add('dropTarget');
                event.target.classList.add('canDrop');
                that.handleDragEnter();
            },
            ondragleave: function (event) {
                // remove the drop feedback style
                event.relatedTarget.classList.remove('dropTarget');
                event.target.classList.remove('canDrop');
                that.handleDragLeave();
            },
            ondrop: function (event) {
                event.target.classList.remove('dropActive');
                that.handleDrop();
            },
            ondropdeactivate: function (event) {
                // remove active dropzone feedback
                event.relatedTarget.classList.remove('dropTarget');
                event.target.classList.remove('dropActive');
            }
        });
    },

    componentDidUpdate: function (prevProps) {
        if (!prevProps.isItems && this.props.isItems) {
            ReactDOM.findDOMNode(this)
        }
        if (this.props.tile.item) {
            this.interact.dropzone({ enabled : false });
        }
    },

    handleDropActivate :function(){
        //console.log('handleDropActivate');
    },

    handleDragEnter:function(){
        GardenActions.enterGardenTile(this.props.tile);
        //console.log('handleDragEnter');
    },

    handleDragLeave:function(){
        GardenActions.leaveGardenTile(this.props.tile);
        //console.log('handleDragLeave');
    },

    handleDrop:function(){
        this.props.onDropItem(this.props.tile);
    },

    render: function() {
        if(this.props.tile.item){
            return (
                <div className="gardenTile">
                    <span className={'gardenTileItem  animated slideInUp'}>
                        <img className=" animated bounceInDown" src={this.rootPath + 'images/pictos/' + this.props.tile.item.picto} />
                    </span>
                </div>
            );
        }
        return (
            <div className="gardenTile"></div>
        );
    }
});

var GardenField = React.createClass({

    getInitialState: function() {
        return {
            isItems: this.props.isItems,
            tiles  : this.props.tiles,
            currentItem:this.props.selectedItem
        };
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
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
        GardenActions.dropGardenTile(tile, this.props.selectedItem);
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