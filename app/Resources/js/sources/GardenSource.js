var _ = require('underscore');

var GardenIndicator = {
    id            : 0,
    name_canonical: 'indicator-',
    name          : 'Indicator',
    picto         : 'picto-1',
    cl            : 'picto-cl1',
    criteria      : 0,
    val           : 0,
    min           : 0,
    max           : 100,
    unit          : '%'
};

var pictos2=['pictos-09.svg','pictos-10.svg','pictos-11.svg'];
var cl2 = ['engieYellow', 'engieRed', 'engieBlue','engieGreen'];
var GardenIndicators = _.chain([1,2,3]).map(function(num, key){
    var min = Math.floor(Math.random() * (3000 - 0)) + 0;
    var max = Math.floor(Math.random() * (10000 - min)) + min;
    var val = Math.floor(Math.random() * (max - min)) + min;
    min = 0;
    max = 100;
    val = 0;

    return _.chain(GardenIndicator).clone().extend({
        id            : key,
        name_canonical: 'indicator-' + key,
        name          : 'Indicator ' + key,
        picto         : pictos2[key],
        cl            : cl2[key % cl2.length],
        criteria      : key,
        val           : val,
        min           : min,
        max           : max
    }).value();

}).indexBy('name_canonical').value();

var GardenItem = {
    id            : 0,
    name_canonical: 'item-',
    name          : 'Item',
    type          : 0,
    type_name     : 'type',
    picto         : 'ion-leaf',
    cl            : 'picto-cl1',
    odr           : 0,
    price         : 100,
    infos         : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in finibus urna.',
    percs         : null

};
var pictos=['pictos-01.svg','pictos-02.svg','pictos-03.svg','pictos-04.svg','pictos-05.svg','pictos-06.svg','pictos-07.svg','pictos-08.svg'];
var cl = ['engieBlueLight', 'engieBlue', 'engieGreen', 'engieYellow', 'engieRed', 'engiePurple', 'engiePink'];
var GardenItems = _.chain(_.range(1, 9)).map(function (num, key) {
    var nbPercs = _.random(1, 3);
    return _.chain(this).clone().extend({
        id            : key,
        name_canonical: 'item-' + key,
        odr           : key,
        name          : 'Item' + key,
        price         : 100 * key,
        picto         : pictos[key],
        cl            : cl[key % cl.length],
        percs         : _.chain(GardenIndicators).clone().sample(nbPercs).map(function (cIndicator, key) {

            //var val = _.random(-50, 50);
            //val     = val > 0 ? '+' + val : '' + val;
            var val = _.random(-4, 16);
            val     = val > 0 ? '+' + val : '' + val;
            return {
                desc     : cIndicator.name,
                val      : val,
                unit     : '',
                indicator: cIndicator
            };

        }).indexBy(function (perc) {
            return perc.indicator.name_canonical;
        }).value()

    }).value();
}, GardenItem).indexBy('name_canonical').value();


var GardenTile = {
    id  : 0,
    x   : 0,
    y   : 0,
    item: null
};

var GardenTiles = _.map( _.range(0, 25), function(num, key){
    var xX = (key % 5) + 1;
    var yY = Math.trunc(key / 5) +1;
    return _.extend(_.clone(GardenTile), {
        id: key,
        x : xX,
        y : yY
    });
});

var GardenData = {
    id: 0,
    text: 'abudsqdqsd Dhabi',
    points: 4000,
    indicators : GardenIndicators,
    tiles : GardenTiles
};

var GardenSource = {
    fetch: function (url) {
        switch(url) {

            case 'api/garden/1':

                return new Promise(function(resolve, reject) {
                    window.setTimeout(function() {
                        resolve( JSON.stringify(GardenData) );
                    }, Math.random() * 1000 + 1000);
                });

                break;
            case 'api/garden/1/tile':

                return new Promise(function(resolve, reject) {
                    window.setTimeout(function() {
                        resolve( JSON.stringify(GardenData) );
                    }, Math.random() * 1000 + 1000);
                });

                break;
            case 'api/gardenitems':

                return new Promise(function(resolve, reject) {
                    window.setTimeout(function() {
                        resolve( JSON.stringify(GardenItems) );
                    }, Math.random() * 1000 + 1000);
                });

                break;
            default:

                return new Promise(function(resolve, reject) {
                    window.setTimeout(function() {
                        reject( JSON.stringify({'error':'ouos !'}) );
                    }, Math.random() * 1000 + 1000);
                });

        }

    }
};

module.exports = GardenSource;