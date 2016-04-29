var alt = require('../alt');
var _ = require('underscore');
var GardenActions = require('../actions/GardenActions');

class GardenItemStore {

    constructor() {
        this.gardenItems = null;
        this.selectedItem = null;
        this.errorMessage = null;
        this.bindListeners({
            handleUpdateGardenItems: GardenActions.UPDATE_GARDEN_ITEMS,
            handleFetchGardenItems : GardenActions.FETCH_GARDEN_ITEMS,
            handleGardenItemsFailed: GardenActions.GARDEN_ITEMS_FAILED,
            handleFocusGardenItem  : GardenActions.FOCUS_GARDEN_ITEM,
            handleBlurGardenItem   : GardenActions.BLUR_GARDEN_ITEM,
            handleSelectGardenItem : GardenActions.SELECT_GARDEN_ITEM,
            handleReleaseGardenItem: GardenActions.RELEASE_GARDEN_ITEM
        });
    }

    handleUpdateGardenItems(gardenItems) {
        this.gardenItems = gardenItems;
        this.focusedItem = _.findWhere(gardenItems, {odr: 0});
        this.errorMessage = null;
    }

    handleFetchGardenItems() {
        // reset the array while we're fetching new locations so React can
        // be smart and render a spinner for us since the data is empty.
        this.gardenItems = null;
        this.selectedItem = null;
        this.focusedItem = null;
    }

    handleSelectGardenItem(selectedItem){
        this.selectedItem = selectedItem;
    }

    handleReleaseGardenItem(selectedItem){
        this.selectedItem = null;
    }

    handleFocusGardenItem(focusedItem){
        this.focusedItem = focusedItem;
    }

    handleBlurGardenItem(focusedItem){
        this.focusedItem = null;
    }

    handleGardenItemsFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

module.exports = alt.createStore(GardenItemStore, 'GardenItemStore');