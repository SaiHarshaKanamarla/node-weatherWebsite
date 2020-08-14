var request = require('request');

const forecast = (lat,long,callback) => {

    const url = "http://api.weatherstack.com/current?access_key=d7b7c7d8739e221e14b62f27bb9f6093&query="+lat+","+long+"&units=f";
    request({url: url, json:true},(error,response) =>{
    if(error){
        callback("Unable to connect to weather");
    }else if(response.body.error){
        callback("Provide a valid location");
    }else{
    callback(undefined,"The Current temperature is "+response.body.current.temperature+". The weather is currently "+response.body.current.weather_descriptions[0]);
    }
})

}

module.exports = forecast;