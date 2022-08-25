import { argv } from './config/yarg_config.js';
import { controladorReservas } from './funciones/funciones_reservas.js';
import {Eventos} from "./models/Eventos.js";
import {Reservas} from "./models/Reservas.js"
import {inquiererMainMenu, inquiererReservasMenu} from "./views/inquirer.js"
import { controladorEventos } from './funciones/funciones_eventos.js';

const main = async() => {
    let ejecutadoReservas = false;
    const reservas = new Reservas();
    const eventos = new Eventos();

    let opt = 0;
    do {
        opt = await inquiererMainMenu(); 
        switch (opt) {
            case 1:
                const opciones = await inquiererReservasMenu();  
                await controladorReservas(reservas, opciones, ejecutadoReservas);
                if(!ejecutadoReservas) {
                    ejecutadoReservas = true;
                }
            break;
            case 2:
            //
            break;
        }
    } while(opt !== 0);

    //await controladorReservas(reservas);
    //await controladorEventos(eventos);
}

main();