import { argv } from './config/yarg_config.js';
import { controladorReservas } from './funciones/funciones_reservas.js';
import { Reservas } from './clases/clases.js';

const reservas = new Reservas();

controladorReservas(reservas);