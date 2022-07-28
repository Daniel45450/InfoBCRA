import * as fs from 'fs';
import colors from 'colors';

import { argv } from './config/yarg_config.js';
import { obtenerReservas, procesar_reservas } from './funciones/funciones.js';
import { Reservas } from './clases/clases.js';

import { exit } from 'process';

let salida= "";
const reservas = new Reservas();

const controladorReservas = async() => {
    console.clear();
    await procesar_reservas(reservas, argv.f);
    const reservaActual = reservas.obtenerReservaActual();
    console.log(`Reservas medidas en ${colors.brightBlue("Millones de Dolares")}\n`);
    console.log(`Ultimo registro: ${colors.brightGreen.bold(`${reservaActual.fecha.getDate() + 1}/${reservaActual.fecha.getMonth() + 1}/${reservaActual.fecha.getFullYear()}`)} reservas ${colors.brightRed.bold(`${reservaActual.cantidad}`)} USD\n\n`);
    
    if(argv.min) {
        const reserva_minima = reservas.obtenerReservasMinimas();
        console.log(`El ${colors.brightGreen.bold(`${reserva_minima.fecha.getDate() + 1}/${reserva_minima.fecha.getMonth() + 1}/${reserva_minima.fecha.getFullYear()}`)} se registro la menor cantidad de reservas y fue de ${colors.brightRed.bold(`${reserva_minima.cantidad}`)} USD`);
    }
    if(argv.max) {
        const reserva_maxima = reservas.obtenerReservasMaximas();
        console.log(`El ${colors.brightGreen.bold(`${reserva_maxima.fecha.getDate() + 1}/${reserva_maxima.fecha.getMonth() + 1}/${reserva_maxima.fecha.getFullYear()}`)} se registro la mayor cantidad de reservas y fue de ${colors.brightRed.bold(`${reserva_maxima.cantidad}`)} USD`);
    }
    if(argv.f) {
        console.log("\nArchivo creado".green.bold);
    }
}

controladorReservas();