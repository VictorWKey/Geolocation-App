import inquirer from 'inquirer';
import colors from 'colors';

const questions = [
    {
        type: `list`,
        name: `option`,
        message: `¿What do you wish to do?`,
        choices: [
            {
                value: 1,
                name: `1.-Search country`
            },
            {
                value: 2,
                name: `2.-History`
            },
            {
                value: 0,
                name: `0.-Exit`
            }
        ] 
    }
];



const inquirerMenu = async()=>{
    console.clear();
    console.log("======================".green);
    console.log("   Option Selection   ".green);
    console.log("======================\n".green);

    const {option} = await inquirer.prompt(questions); //.prompt(questions) obtendra una respuesta y esa respuesta esta en una promesa, por lo tanto el await obtiene la respuesta. Prompt necesita afuerzas del array options

    return option; //opt va a ser igual a lo que demos enter en la opcion de respuestas (choices);
}


//En este caso la funcion no necesariamente tiene que ser asincrona. Hay muchas maneras de enviar correctamente esta funcion pero esta es a la que mas logica le encuentro, las demas no les encuentro tanto sentido
const pause = () =>{
    const inputQuestions = [
        {
            type: `input`,
            name: `pause`,
            message: `Enter para continuar`
        }
    ];

    console.log(`\n`)
    return inquirer.prompt(inputQuestions); //Si usaramos la funcion async, el return no siempre funciona como un resolve(), es raro esto, si quieres ignora este comentario
};

const readInput = async message => {
    const question = {
        type: `input`,
        name: `desc`,
        message,
        validate(value){
            if(value.length === 0){
                return `Por favor ingrese un valor`;
            }
            return true;
        }
    }

    const {desc} = await inquirer.prompt(question);
    return desc;

};

const selectPlace = async (places = []) => {
    const choices = places.map((place, i) => {
        return {
            value: place.id,
            name: `${(i + 1 + `.`).toString().green} ${place.namePlace}`
        }
    });

    choices.unshift({
        value: `0`,
        name: `${`0.`.green} Cancel`
    });

    const questions = [
        {
            type: `list`,
            name: `id`,
            message: `Select one place`,
            choices
        }
    ];

    const {id} = await inquirer.prompt(questions);

    return id;
};

const confirmAction = async (message) =>{
    const question = [
        {
            type: `confirm`,
            name: `ok`,
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);

    return ok;
};

const completeMenu = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        return {
            value: task.id,
            name: `${(i + 1 + `.`).toString().green} ${task.desc}`, 
            checked: (task.completedOn) ? true : false
        }
    });

    const questions = [
        {
            type: `checkbox`,
            name: `ids`,
            message: `Selections`,
            choices
        }
    ];

    const {ids} = await inquirer.prompt(questions); //Como en este caso es de tipo checkbox, el resultado va a ser un array con los "value" de las "choices" que esten marcadas, osea las que tengan un "checked": true

    return ids;
};

export {inquirerMenu, pause, readInput, selectPlace, confirmAction, completeMenu};

