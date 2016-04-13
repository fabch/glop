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
        console.log(errorMessage);
        return errorMessage;
    }
}

module.exports = alt.createActions(GardenActions);