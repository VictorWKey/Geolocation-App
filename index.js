import { inquirerMenu, pause, readInput } from "./helpers/inquirer.js";
import { Searches } from "./models/searches.js";

const main = async() => {
    const searches = new Searches();
    let opt;

    do{
        opt = await inquirerMenu();
        console.log({opt});

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const place = await readInput(`City: `);
                await searches.city(place);

                //Buscar los lugares

                //Seleccionar el lugar

                //Clima

                //Mostrar resultados

                console.log(`\nInfo of the city\n`);
                console.log(`City: `, );
                console.log(`Lat: `, );
                console.log(`Lng: `, );
                console.log(`Temperature: `, );
                console.log(`Min: `, );
                console.log(`Max: `, );
            
            break;
        }

        if(opt !== 0) await pause();
    } while (opt !== 0)

};

main();