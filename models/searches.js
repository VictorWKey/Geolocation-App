import fs from 'fs';

import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

class Searches{
    history = [];
    dbpath = "./db/database.json";

    constructor(){ 
        this.readDB();    //Read DB If exist 
    }

    get historyCapitalized(){
        return this.history.map(place => {
            let words = place.split(" ");

            words = words.map(word => word[0].toUpperCase() + word.substring(1));
            return words.join(" ");
        })
         
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

    saveHistory(place){

        if(this.history.includes(place.toLocaleLowerCase())){
            return;
        }

        this.history.unshift(place.toLocaleLowerCase());

        this.history = this.history.slice(0,5); //The history forever will be of 5 places

        this.saveDB();
    }

    saveDB(){
        const payload = {
            history: this.history
        }

        fs.writeFileSync(this.dbpath, JSON.stringify(payload));
    }

    readDB(){
        if(!fs.existsSync(this.dbpath)){
            return null;
        }

        const info = fs.readFileSync(this.dbpath, {encoding: "utf-8"});

        const data = JSON.parse(info);

        this.history = data.history;
        // data.history.forEach(log => {
        //     this.history.push(log);           
        // });
        
    }
}

export {Searches};