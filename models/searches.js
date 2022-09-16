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
                lat: place.center[0],
                lng: place.center[1]
            }));
        } catch (err){
            return [];

        }
    }
}

export {Searches};