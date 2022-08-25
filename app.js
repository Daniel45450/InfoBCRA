import { argv } from './config/yarg_config.js';
import { controladorReservas } from './funciones/funciones_reservas.js';
import {Eventos} from "./models/Eventos.js";
import {Reservas} from "./models/Reservas.js"
import {inquiererEventosMenu, inquiererMainMenu, inquiererReservasMenu, pausa} from "./views/inquirer.js"
import { controladorEventos } from './funciones/funciones_eventos.js';

const main = async() => {
    let ejecutadoReservas = false;
    let ejecutadoEventos = false;
    const reservas = new Reservas();
    const eventos = new Eventos();

    let opt = 0;
    let opciones = [];
    do {
        opt = await inquiererMainMenu(); 
        switch (opt) {
            case 1:
                opciones = await inquiererReservasMenu();  
                if(!opciones.includes(0)) {
                    await controladorReservas(reservas, opciones, ejecutadoReservas);
                    if(!ejecutadoReservas) {
                        ejecutadoReservas = true;
                    }
                } 
            break;
            case 2:
                opciones = await inquiererEventosMenu();
                if(!opciones.includes(0)) {
                    await controladorEventos(eventos, opciones, ejecutadoEventos);
                    if(!ejecutadoEventos) {
                        ejecutadoEventos = true;
                    }
                }; 
            break;
        }

        await pausa();
    } while(opt !== 0);
}

main();