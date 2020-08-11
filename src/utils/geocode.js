const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2hyYWRkaGEtbXVraGVka2FyIiwiYSI6ImNrZDdpMG9vaDA5eWYyenM4aDlxb2ViN2UifQ.RH5aQxa219Gcnhial9seog';

    request({ url, json: true }, (error, { body: { features }}) => {

        if (error) {
            //callback(error, data)
            callback('Unable to connect to Web Service!', undefined);
        } else if (features.length === 0) {
            callback('Unable to fetch the location!', undefined);
        } else {
            callback(undefined, {
                latitude: features[0].geometry.coordinates[1],
                longitude: features[0].geometry.coordinates[0],
                location: features[0].place_name
            })
        }
    });
}

module.exports = { geocode } ;