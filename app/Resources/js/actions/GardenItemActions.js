var alt = require('../alt');
var GardenSource = require('../sources/GardenSource');

class GardenItemActions {

    updateGardenItems(gardenItems) {
        return gardenItems;
    }

    fetchGardenItems() {
        return (dispatch) => {
            dispatch();
            GardenSource.fetch('api/gardenitems')
                .then((response) => {
                    //response.json();
                    return JSON.parse(response)
                })
                .then((response) => {
                    this.updateGardenItems(response);
                })
                .catch((error) => {
                    this.gardenItemsFailed(error);
                });
        }
    }

    gardenFocusItem(gardenItem){
        return gardenItem;
    }

    gardenBlurItem(gardenItem){
        return gardenItem;
    }

    gardenSelectItem(gardenItem){
        return gardenItem;
    }

    gardenReleaseItem(gardenItem){
        return gardenItem;
    }

    gardenItemsFailed(errorMessage) {
        console.log(errorMessage);
        return errorMessage;
    }
}

module.exports = alt.createActions(GardenItemActions);