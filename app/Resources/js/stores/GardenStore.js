var alt = require('../alt');
var GardenActions = require('../actions/GardenActions');
var GardenItemActions = require('../actions/GardenItemActions');

class GardenStore {

    constructor() {
        this.garden = {};
        this.isItems = false;
        this.selectedItem = null;
        this.droppedTile = null;
        this.errorMessage = null;
        this.bindListeners({
            handleUpdateGarden     : GardenActions.UPDATE_GARDEN,
            handleFetchGarden      : GardenActions.FETCH_GARDEN,
            handleGardenFailed     : GardenActions.GARDEN_FAILED,
            handleFetchGardenItems : GardenItemActions.FETCH_GARDEN_ITEMS,
            handleUpdateGardenItems: GardenItemActions.UPDATE_GARDEN_ITEMS
        });
    }

    handleUpdateGarden(garden) {
        this.garden = garden;
        this.errorMessage = null;
    }

    handleFetchGarden() {
        // reset the array while we're fetching new locations so React can
        // be smart and render a spinner for us since the data is empty.
        this.garden = {};
        this.isItems = false;
    }

    handleFetchGardenItems() {
        this.isItems = false;
    }

    handleUpdateGardenItems() {
        this.isItems = true;
    }

    handleGardenFailed(errorMessage) {
        this.isItems = false;
        this.errorMessage = errorMessage;
    }
}

module.exports = alt.createStore(GardenStore, 'GardenStore');