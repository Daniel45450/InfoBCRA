import inquirer from "inquirer";


const preguntas = [{
    type: "list",
    name: "opcion",
    message: "Que datos desea ver?",
    choices: [
        {
            value: 1,
            name: `${" 1.".green} Reservas`
        },
        {
            value: 2,
            name: `${" 2.".green} Eventos`
        },
        {
            value: 0,
            name: `${" 0.".green} Salir`
        }
    ]
}];

const opcionesReservas = async() => {

    const choices = [
        {
            value: 1,
            name: `${" 1.".green} Reservas actuales`
        },
        {
            value: 2,
            name: `${" 2.".green} Reservas minimas`
        },
        {
            value: 3,
            name: `${" 3.".green} Reservas maximas`
        },
        {
            value: 4,
            name: `${" 4.".green} Crear archivo con las reservas`
        },
        {
            value: 0,
            name: `${" 0.".green} Cancelar`
        }
    ]

    const preguntas = [
        {
            name: "opciones",
            type: "checkbox",
            message: `Que informacion quiere solicitar?`,
            choices
        }
    ]

    const {opciones} = await inquirer.prompt(preguntas);

    return opciones;
}

const opcionesEventos = async() => {

    const choices = [
        {
            value: 1,
            name: `${" 1.".green} Cantidad de ministros de economia`
        },
        {
            value: 2,
            name: `${" 2.".green} Ministro actual`
        },
        {
            value: 3,
            name: `${" 3.".green} Listar ministros`
        },
        {
            value: 4,
            name: `${" 4.".green} Crear archivo de ministros`
        },
        {
            value: 5,
            name: `${" 5.".green} Cantidad de presidentes de la Nacion`
        },
        {
            value: 6,
            name: `${" 6.".green} Presidente actual`
        },
        {
            value: 7,
            name: `${" 7.".green} Listar Presidentes`
        },
        {
            value: 8,
            name: `${" 8.".green} Crear archivo de Presidentes`
        },
        {
            value: 0,
            name: `${" 0.".green} Cancelar`
        }
    ]
    const preguntas = [
        {
            name: "opciones",
            type: "checkbox",
            message: `Que informacion quiere solicitar?`,
            choices
        }
    ]    

    const {opciones} = await inquirer.prompt(preguntas);

    return opciones;
}

export const inquiererMainMenu = async() => {
    console.clear();
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

export const inquiererEventosMenu = async() => {
    console.log(`===================================`);
    console.log(`             Eventos              `);
    console.log(`===================================\n`); 
    const opciones = await opcionesEventos();
    return opciones;
}


export const pausa = async () => {

    const question = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${"ENTER".green} para continuar`
        }
    ]

    console.log("\n\n");

    await inquirer.prompt(question);
}

export const leerInput = async(message="") => {
    const pregunta = [
        {
            type: "input",
            message,
            validate(value) {
                if(value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            } 
        }
    ]

    const {input} = await inquirer.prompt(pregunta);

    return input;
} 
