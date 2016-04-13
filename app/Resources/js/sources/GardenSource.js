var _ = require('underscore');

var GardenItem = {
    id            : 0,
    name_canonical: 'item-0',
    name          : 'Item',
    type          : 0,
    type_name     : 'type',
    picto         : 'ion-leaf',
    cl            : 'picto-cl1',
    odr           : 0,
    price         : 100,
    infos         : 'Texte explicatif de l\'item',
    vals:[
        {
            desc    : 'description valeur 1',
            val     : '+10',
            unit    : '%',
            criteria: 0
        },
        {
            desc    : 'description valeur 1',
            val     : '+10',
            unit    : '%',
            criteria: 1
        }
    ]
};
var pictos=['ion-leaf','ion-lightbulb','ion-bug','ion-film-marker','ion-trophy','ion-waterdrop','ion-bonfire','ion-earth','ion-umbrella'];
var cl = ['engie-blueLight', 'engie-blue', 'engie-green', 'engie-yellow', 'engie-red', 'engie-purple', 'engie-pink'];
var GardenItems = _.map( _.range(1, 10), function(num, key){
    return _.extend(_.clone(GardenItem), {
        id   : key,
        odr  : key,
        name : 'Item' + key,
        price: 100 * key,
        picto: pictos[key],
        cl   : cl[key % cl.length]
    });
});

var GardenIndicator = {
    id            : 0,
    name_canonical: 'indicator',
    name          : 'Indicator',
    picto         : 'picto-1',
    cl            : 'picto-cl1',
    criteria      : 0,
    val           : 0,
    min           : 0,
    max           : 100,
    unit          : '%'
};

var pictos2=['ion-heart','ion-thermometer','ion-flag'];
var cl2 = ['engie-red', 'engie-purple', 'engie-green'];
var GardenIndicators = _.map( _.range(1, 3), function(num, key){
    var min = Math.floor(Math.random() * (3000 - 0)) + 0;
    var max = Math.floor(Math.random() * (10000 - min)) + min;
    return _.extend(_.clone(GardenIndicator), {
        id            : key,
        name_canonical: 'indicator' + key,
        name          : 'Indicator ' + key,
        picto         : pictos2[key],
        cl            : cl2[key % cl.length],
        criteria      : key,
        val           : Math.floor(Math.random() * (max - min)) + min,
        min           : min,
        max           : max
    });
});

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
    points: 400,
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