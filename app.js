import * as fs from 'fs';
import fetch from 'node-fetch';
import colors from 'colors';

import {getToken} from './config/token.js';


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

const datos = await obtenerReservas();

let salida= "";

let dias_importantes_reservas = {
    dia_min : datos[0].d,
    dia_max : datos[0].d,
    dia_actual: datos[datos.length-1].d,
    reservas_actual: datos[datos.length-1].v,
    cantidad_max: datos[0].v,
    cantidad_min: datos[0].v,
}

for(let x in datos) {
    let dia = datos[x].d;
    let cantidad = datos[x].v;
    if(dias_importantes_reservas.cantidad_max < cantidad) {
        dias_importantes_reservas.cantidad_max = cantidad;
        dias_importantes_reservas.dia_max = dia;
    }
    if(dias_importantes_reservas.cantidad_min > cantidad) {
        dias_importantes_reservas.cantidad_min = cantidad;
        dias_importantes_reservas.dia_min = dia;
    }
    //salida += `${datos[x].d}:${datos[x].v}\n`;
}


console.clear();
//let salida_dias_importantes = `${dias_importantes_reservas.dia_min}:${dias_importantes_reservas.cantidad_min}\n${dias_importantes_reservas.dia_max}:${dias_importantes_reservas.cantidad_max}\n`;

//salida_dias_importantes += salida;

//fs.writeFileSync('./salida/reservasBCRA.txt', salida_dias_importantes);

console.log(`Reservas medidas en ${colors.brightBlue("Millones de Dolares")}\n`);
console.log(`Ultimo registro: ${colors.brightGreen.bold(dias_importantes_reservas.dia_actual)} reservas ${colors.brightRed.bold(dias_importantes_reservas.reservas_actual)} USD\n\n`);
console.log(`El ${colors.brightGreen.bold(dias_importantes_reservas.dia_min)} se registro la menor cantidad de reservas y fue de ${colors.brightRed.bold(dias_importantes_reservas.cantidad_min)} USD`);
console.log(`El ${colors.brightGreen.bold(dias_importantes_reservas.dia_max)} se registro la mayor cantidad de reservas y fue de ${colors.brightRed.bold(dias_importantes_reservas.cantidad_max)} USD`);
