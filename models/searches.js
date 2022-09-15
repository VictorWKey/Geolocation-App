import axios from 'axios';

class Searches{
    constructor(){
        this.history = [`Guanajuato`, `Arkansas`, `Quebec`];

        //Read DB If exist 
    }

    get paramsMapbox(){
        return {
            "access_token": "pk.eyJ1IjoidmljdG9yd2tleSIsImEiOiJjbDgyaHp3dGEwcHp5M3ZvMzYxM3JqMjd1In0.MWJiyM4OMYjXucxnDXZkEg",
            "limit": 8,
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

            console.log(res.data);
        } catch (err){
            return [];

        }
    }
}

export {Searches};