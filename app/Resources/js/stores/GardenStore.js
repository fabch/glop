var alt = require('../alt');
var _ = require('underscore');
var GardenActions = require('../actions/GardenActions');
var GardenItemStore = require('../stores/GardenItemStore');

class GardenStore {

    constructor() {
        this.garden = {};
        this.isItems = false;
        this.focusedItem = null;
        this.selectedItem = null;
        this.selectedTile = null;
        this.errorMessage = null;
        this.bindListeners({
            handleUpdateGarden      : GardenActions.UPDATE_GARDEN,
            handleFetchGarden       : GardenActions.FETCH_GARDEN,
            handleGardenFailed      : GardenActions.GARDEN_FAILED,
            handleFetchGardenItems  : GardenActions.FETCH_GARDEN_ITEMS,
            handleUpdateGardenItems : GardenActions.UPDATE_GARDEN_ITEMS,
            handleFocusGardenItem   : GardenActions.FOCUS_GARDEN_ITEM,
            handleBlurGardenItem    : GardenActions.BLUR_GARDEN_ITEM,
            handleSelectGardenItem  : GardenActions.SELECT_GARDEN_ITEM,
            handleReleaseGardenItem : GardenActions.RELEASE_GARDEN_ITEM,
            handleEnterGardenTile   : GardenActions.ENTER_GARDEN_TILE,
            handleLeaveGardenTile   : GardenActions.LEAVE_GARDEN_TILE,
            handleDropGardenTile    : GardenActions.DROP_GARDEN_TILE
        });

        this.on('beforeEach', (payload, currentState) => {
            //console.log(payload, currentState);
        });

    }

    handleUpdateGarden(garden) {
        this.waitFor(GardenItemStore);
        this.garden = garden;
        this.focusedItem = GardenItemStore.getState().focusedItem;
        this.errorMessage = null;
    }

    handleFetchGarden() {
        // reset the array while we're fetching new locations so React can
        // be smart and render a spinner for us since the data is empty.
        this.garden = {};
        this.isItems = false;
        this.selectedItem = null;
        this.focusedItem = null;
        this.selectedTile = null;
    }

    handleFetchGardenItems() {
        this.isItems = false;
    }

    handleUpdateGardenItems() {
        this.isItems = true;
    }

    handleFocusGardenItem(focusedItem){
        this.waitFor(GardenItemStore);
        this.focusedItem = GardenItemStore.getState().focusedItem;
    }

    handleBlurGardenItem(focusedItem){
        this.waitFor(GardenItemStore);
        this.focusedItem = GardenItemStore.getState().focusedItem;
    }

    handleSelectGardenItem(selectedItem){
        this.waitFor(GardenItemStore);
        this.selectedItem = GardenItemStore.getState().selectedItem;
    }

    handleReleaseGardenItem(releasedItem){
        this.waitFor(GardenItemStore);
        this.selectedItem = GardenItemStore.getState().selectedItem;
    }

    handleEnterGardenTile(enteredTile){
        this.selectedTile = enteredTile;
    }

    handleLeaveGardenTile(leavedTile){
        this.selectedTile = null;
    }

    handleDropGardenTile(tile){
        this.garden.tiles[tile.id] = tile;
        this.garden.points -= tile.item.price;
        _.chain(tile.item.percs)
        .map(function(perc, name_canonical){
            if(this.hasOwnProperty(name_canonical)){
                var indicator = this[name_canonical];
                //var addVal = Math.round(((indicator.val - indicator.min) * parseInt(perc.val) / 100));
                //this[name_canonical].val = this[name_canonical].val + addVal <= indicator.max ? this[name_canonical].val + addVal : indicator.max;
                var addVal = parseInt(perc.val);
                this[name_canonical].val = this[name_canonical].val + addVal <= indicator.max ? this[name_canonical].val + addVal : indicator.max;
            }
            return this;
        }, this.garden.indicators);
    }

    handleGardenFailed(errorMessage) {
        this.isItems = false;
        this.errorMessage = errorMessage;
    }
}

module.exports = alt.createStore(GardenStore, 'GardenStore');