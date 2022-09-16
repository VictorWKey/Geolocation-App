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
                //Mostrar mensaje
                const place = await readInput(`City: `);

                //Buscar los lugares
                const resultPlaces = await searches.city(place); 

                //Seleccionar el lugar
                const id = await selectPlace(resultPlaces);

                const placeSelected = resultPlaces.find(place => place.id === id); //.find() devuelve el primer elemento del array que cumpla con la condicion
                
                //Clima

                //Mostrar resultados

                console.log(`\nInfo of the city\n`);

                console.log(`City: `, placeSelected.namePlace);
                console.log(`Lat: `, placeSelected.lat);
                console.log(`Lng: `, placeSelected.lng);
                console.log(`Temperature: `, );
                console.log(`Min: `, );
                console.log(`Max: `, );
            
            break;
        }

        if(opt !== 0) await pause();
    } while (opt !== 0)

};

main();