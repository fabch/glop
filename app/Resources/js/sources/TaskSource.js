var mockData = [
    { id: 0,  text: 'abudsqdqsd Dhabi' },
    { id: 1,  text: 'Berlin' },
    { id: 2,  text: 'Bogota' },
    { id: 3,  text: 'Buenos Aires' },
    { id: 4,  text: 'Cairo' },
    { id: 5,  text: 'Chicago' },
    { id: 6,  text: 'Lima' },
    { id: 7,  text: 'London' },
    { id: 8,  text: 'Miami' },
    { id: 9,  text: 'Moscow' },
    { id: 10, text: 'Mumbai' },
    { id: 11, text: 'Paris' },
    { id: 12, text: 'San Francisco' }
];

var TaskSource = {
    fetch: function () {
        // returning a Promise because that is what fetch does.
        return fetch('/web/api/tasks.json').then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
        }).catch(function() {
            console.log("Booo");
        });
    }
};

module.exports = TaskSource;