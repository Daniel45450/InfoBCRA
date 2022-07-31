import { argv } from './config/yarg_config.js';
import { controladorReservas } from './funciones/funciones_reservas.js';
import { Reservas, Eventos } from './clases/clases.js';
import { controladorEventos } from './funciones/funciones_eventos.js';

const reservas = new Reservas();
const eventos = new Eventos();

const main = async() => {
    console.clear();
    await controladorReservas(reservas);
    await controladorEventos(eventos);
}

main();