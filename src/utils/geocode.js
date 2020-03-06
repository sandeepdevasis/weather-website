const request = require('request')

//Define a function to Get the GeoCode for the location
const geoCode = (address, callback) => {
        
        const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' ;
        const queryParams = '.json?access_token=pk.eyJ1Ijoic2FuZGVlcGRldmFzaXMiLCJhIjoiY2s2MGMzdGplMDZqdTNrcDQ0aGt2bTNnMyJ9.9KiTXTrPNOYyAefbkoL2Bw&limit=1';
        const geoCodeURL = baseUrl + encodeURIComponent(address)+queryParams;

        request({url: geoCodeURL,json: true},(error,{body}) => {
   
                if(error){
                        //console.log('Check your internet connection')
                        callback('Check your internet connection',undefined)
                }else if(body.features.length === 0){
                       // console.log('Unable to find location')
                        callback('Unable to find location. Try Another search !!', undefined)
                }else {
                        const lattitude = body.features[0].center[1] 
                        const longitude =  body.features[0].center[0]
                        //console.log('Name of the place is  : '+response.body.features[0].place_name)
                        //console.log('Lattitude --> '+ lattitude + ' and longitude --> '+longitude)
                        const data = {
                                
                        }
                        callback(undefined,{
                            'lattitude': lattitude,
                            'longitude': longitude,
                            'location': body.features[0].place_name
                        })
                }
            })


}

module.exports = geoCode 