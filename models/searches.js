import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

class Searches{
    constructor(){
        this.history = [`Guanajuato`, `Arkansas`, `Quebec`];

        //Read DB If exist 
    }

    get paramsMapbox(){
        return {
            "access_token": process.env.MAPBOX_KEY,
            "limit": 5,
            "language": "es" 
        }
    }

    get paramsOpenWeather(){
        return {
            "appid": process.env.OPENWEATHER_KEY,
            "units": "metric",
            "lang": "es",
        }
        
    }

    async city( place = ``){
        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            });

            const res = await instance.get();

            return res.data.features.map( place => ({
                id: place.id,
                namePlace: place.place_name,
                lat: place.center[1],
                lng: place.center[0]
            }));
        } catch (err){
            return [];
        }
    }

    async weather(lat, lon){
        try{
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather` ,
                params: {...this.paramsOpenWeather, lat, lon}
            })

            const data = {};

            const res = await instance.get();

            const {weather, main} = res.data; //Debido a que vamos a repetir muchas veces el res.data, utilizamos la destructuracion para no repetirlo muchas veces

            return {
                desc: weather[0].description,
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max
            }

        } catch (err){
            console.log(err);
        }
    }

    saveHistorial(place){
        this.history.unshift(place);
    }
}

export {Searches};