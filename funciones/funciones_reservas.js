import fetch from 'node-fetch';
import { Reserva, Reservas } from '../clases/clases.js';
import {getToken} from "../config/token.js"
import { argv } from '../config/yarg_config.js';
import colors from 'colors';
import * as fs from 'fs';

const url_reservas = `https://api.estadisticasbcra.com/reservas`;


const obtenerReservas = async() => {
    try {
        
        const datos = await fetch(url_reservas, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {               
                'Authorization' : getToken()
            }
        }); 

        return await datos.json();
    } catch (error) {
        console.log(error);
    }
}

const procesar_reservas = async(reservas, crear) => {
    const datos = await obtenerReservas();
    let salida = "";
    for(let x in datos) {
        let fecha = new Date(datos[x].d);
        let cantidad = datos[x].v;
        let reserva = new Reserva(fecha, cantidad);

        reservas.agregarReserva(reserva);

        salida += `${datos[x].d}:${datos[x].v}\n`;
    }
    if(crear) {
        //let salida_dias_importantes = `${dias_importantes_reservas.dia_min}:${dias_importantes_reservas.cantidad_min}\n${dias_importantes_reservas.dia_max}:${dias_importantes_reservas.cantidad_max}\n`;
        //salida_dias_importantes += salida;
        fs.writeFileSync('./salida/reservasBCRA.txt', salida);    
    }
}

export const controladorReservas = async(reservas) => {
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