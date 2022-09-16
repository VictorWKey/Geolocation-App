import { inquirerMenu, pause, readInput, selectPlace } from "./helpers/inquirer.js";
import { Searches } from "./models/searches.js";

console.log(process.env);

const main = async() => {
    const searches = new Searches();
    let opt;

    do{
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                //Show message
                const place = await readInput(`City: `);

                //Search places
                const resultPlaces = await searches.city(place); 

                //Select place
                const id = await selectPlace(resultPlaces);
                if(id === `0`) continue;

                const placeSelected = resultPlaces.find(place => place.id === id); //.find() devuelve el primer elemento del array que cumpla con la condicion
                

                // searches.saveHistorial(placeSelected.namePlace);
                //Weather
                const weather = await searches.weather(placeSelected.lat, placeSelected.lng);

                //Show results

                console.log(`\nInfo of the city\n`);

                console.log(`City: `, placeSelected.namePlace);
                console.log(`Lat: `, placeSelected.lat);
                console.log(`Lng: `, placeSelected.lng);
                console.log(`Temperature: `, weather.temp);
                console.log(`Min: `, weather.min);
                console.log(`Max: `, weather.max);
                console.log(`Description: `, weather.desc);
            
            break;
            case 2:
                
            break; 
        }

        if(opt !== 0) await pause();
    } while (opt !== 0)

};

main();