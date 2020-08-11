const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6a4b16c1d04afd215e9e2ce41d101d25&query='+ lat + ',' + long +'&unit=f';

    request({ url, json: true }, (error, { body: { current : respBody }})=> {
        if(error) {
            callback('Unable to connect to Web Service!', undefined);
        } else if (respBody == undefined) {
            callback('Unable to fetch the location!', undefined);
        } else {
            
           callback(undefined, ''+ respBody.weather_descriptions[0] +'. It is currently ' + respBody.temperature + ' degree out. It feels like ' + respBody.feelslike + ' degree out.');
        }
    })
}

module.exports = { forecast } ;