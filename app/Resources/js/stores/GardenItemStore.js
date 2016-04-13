var alt = require('../alt');
var GardenItemActions = require('../actions/GardenItemActions');

class GardenItemStore {

    constructor() {
        this.gardenItems = [];
        this.selectedItem = null;
        this.errorMessage = null;
        this.bindListeners({
            handleUpdateGardenItems: GardenItemActions.UPDATE_GARDEN_ITEMS,
            handleFetchGardenItems : GardenItemActions.FETCH_GARDEN_ITEMS,
            handleGardenItemsFailed: GardenItemActions.GARDEN_ITEMS_FAILED,
            handleSelectItem       : GardenItemActions.GARDEN_SELECT_ITEM,
            handleReleaseItem      : GardenItemActions.GARDEN_RELEASE_ITEM,
            handleFocusItem        : GardenItemActions.GARDEN_FOCUS_ITEM,
            handleBlurItem         : GardenItemActions.GARDEN_BLUR_ITEM
        });
    }

    handleUpdateGardenItems(gardenItems) {
        this.gardenItems = gardenItems;
        this.focusedItem = gardenItems[0];
        this.errorMessage = null;
    }

    handleFetchGardenItems() {
        // reset the array while we're fetching new locations so React can
        // be smart and render a spinner for us since the data is empty.
        this.gardenItems = [];
        this.selectedItem = null;
        this.focusedItem = null;
    }

    handleFocusItem(focusedItem){
        this.focusedItem = focusedItem;
    }

    handleBlurItem(focusedItem){
        this.focusedItem = null;
    }

    handleSelectItem(selectedItem){
        this.selectedItem = selectedItem;
    }

    handleReleaseItem(selectedItem){
        this.selectedItem = null;
    }

    handleGardenItemsFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

module.exports = alt.createStore(GardenItemStore, 'GardenItemStore');