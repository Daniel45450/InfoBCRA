import inquirer from "inquirer";


const preguntas = [{
    type: "list",
    name: "opcion",
    message: "Que datos desea ver?",
    choices: [
        {
            value: 1,
            name: `${"1".green} Reservas`
        },
        {
            value: 2,
            name: `${"2".green} Eventos`
        }
    ]
}];

const opcionesReservas = async() => {

    const choices = [
        {
            value: 1,
            name: `${"1".green} Reservas actuales`
        },
        {
            value: 2,
            name: `${"2".green} Reservas minimas`
        },
        {
            value: 3,
            name: `${"3".green} Reservas maximas`
        },
        {
            value: 4,
            name: `${"4".green} Crear archivo con las reservas`
        }
    ]

    const preguntas = [
        {
            name: "opciones",
            type: "checkbox",
            message: `Que informacion quiere solicitar? ::Seleccion una o varias`,
            choices
        }
    ]

    const {opciones} = await inquirer.prompt(preguntas);

    return opciones;
}


export const inquiererMainMenu = async() => {
    //console.clear();
    console.log(`===================================`);
    console.log(`          Datos del BCRA           `);
    console.log(`===================================\n`);
    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

export const inquiererReservasMenu = async() => {
    console.clear();
    console.log(`===================================`);
    console.log(`             Reservas              `);
    console.log(`===================================\n`);  
    const opciones = await opcionesReservas();

    return opciones;
}


