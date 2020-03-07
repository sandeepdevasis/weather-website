const request = require('request')
const geoCode = require('./geocode')

const getWeather = (lattitude,longitude,callback) => {
    
        if(lattitude !== undefined || longitude !== undefined){
            console.log('Received lattitude as '+lattitude);
            console.log('Received longitude as '+longitude);
            const baseurl = 'https://api.darksky.net/forecast/36a4dcbf5de7b1095747ba7170f61560/'
            const queryParams = '?units=si'
            const weatherUrl = baseurl+lattitude+','+longitude+queryParams
            request({url:weatherUrl,json: true },(error,{body}) => {
            if(error){
                //console.log("Check you internet connection. Unable to connect to weather services")
                callback('Check your internet connection. Unable to connect to weather services', undefined)
    
            }else if(body.error){
                //console.log('Unable to find location')
                callback('Unable to find location',undefined)
            }else{
                // console.log(response.body.daily.data[0].summary+' its currently '+
                // response.body.currently.temperature+ ' degrees out. There is a '+
                // response.body.currently.precipProbability+'% chance of rain')

                console.log(body.daily.data[0]);
                callback (undefined,{
                    'summary':body.daily.data[0].summary ,
                    'temperature':body.currently.temperature,
                    'precipProbability':body.currently.precipProbability,
                    'forecast' : body.daily.data[0].summary+'it\'s currently '+
                                                     body.currently.temperature+' degrees with '+ 
                                                     body.daily.data[0].precipProbability+'% chance of rain !! Today\'s High is '+
                                                     body.daily.data[0].temperatureHigh + ' degrees  and Low is at' +
                                                     body.daily.data[0].temperatureLow+' degrees'

                })
            }
            
    
            })
        }else{
            callback('Unable to find location.. Enter a valid location',undefined)
        }
}

module.exports = getWeather 