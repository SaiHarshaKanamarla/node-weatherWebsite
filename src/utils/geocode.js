const request = require('request');

const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic2FpaGFyc2hhMDE4IiwiYSI6ImNrZGJ6cmQzMDB3MTYzNXQxcWx0bHR1emoifQ.OX3DbaXjZDPqClrJKyD-fw&limit=1";

    request({url:url,json:true},(error,response) => {
        if(error){
            //console.log("Unable to fetch response");
            callback("Unable to fetch response",undefined);
        }else if(response.body.features.length == 0){
            callback("Please enter valid location co-ordinates",undefined);
        }else{
            var latitude = response.body.features[0].center[0];
            var longitude = response.body.features[0].center[1];
            var place = response.body.features[0].place_name;
            callback(undefined,{
                latitude : latitude,
                longitude: longitude,
                place : place
            });
        }
    });
}

module.exports = geocode;