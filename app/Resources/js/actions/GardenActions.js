var alt = require('../alt');
var GardenSource = require('../sources/GardenSource');

class GardenActions {

    updateGarden(garden) {
        return garden;
    }

    fetchGarden() {
        return (dispatch) => {
            dispatch();
            GardenSource.fetch('api/garden/1')
                .then((response) => {
                    //response.json();
                    return JSON.parse(response)
                })
                .then((response) => {
                    this.updateGarden(response);
                })
                .catch((error) => {
                    this.gardenFailed(error);
                });
                /*
                fetch('/web/app_dev.php/api/gardens/1.json')
                .then((response) => {
                    var r = response.json()
                })
                .then((response) => {
                    console.log(response);
                    this.updateGarden(response);
                })
                .catch((error) => {
                    this.gardenFailed(error);
                });
                */
        }
    }

    gardenFailed(errorMessage) {
        return errorMessage;
    }

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

    gardenItemsFailed(errorMessage) {
        console.log(errorMessage);
        return errorMessage;
    }

    focusGardenItem(gardenItem){
        return gardenItem;
    }

    blurGardenItem(gardenItem){
        return gardenItem;
    }

    selectGardenItem(gardenItem){
        return gardenItem;
    }

    releaseGardenItem(gardenItem){
        return gardenItem;
    }

    enterGardenTile(gardenTile){
        return gardenTile;
    }

    leaveGardenTile(gardenTile){
        return gardenTile;
    }

    dropGardenTile(gardenTile, gardenItem){
        gardenTile.item = gardenItem;
        return gardenTile;
    }
}

module.exports = alt.createActions(GardenActions);