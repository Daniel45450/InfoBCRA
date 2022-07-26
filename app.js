import * as fs from 'fs';
import colors from 'colors';

import { argv } from './config/yarg_config.js';
import { obtenerReservas, iniciarReservas } from './funciones/funciones.js';


let dias_importantes_reservas = {};
let salida= "";

const procesar_reservas = async() => {
    const datos = await obtenerReservas();
    dias_importantes_reservas = iniciarReservas(datos[0].d, datos[0].d, datos[datos.length-1].d, datos[datos.length-1].v, datos[0].v,datos[0].v);
    
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

        salida += `${datos[x].d}:${datos[x].v}\n`;
    }
    
    if(argv.f) {
        let salida_dias_importantes = `${dias_importantes_reservas.dia_min}:${dias_importantes_reservas.cantidad_min}\n${dias_importantes_reservas.dia_max}:${dias_importantes_reservas.cantidad_max}\n`;
        salida_dias_importantes += salida;
        fs.writeFileSync('./salida/reservasBCRA.txt', salida_dias_importantes);    
    }

}

const main = async() => {
    console.clear();
    await procesar_reservas();
    console.log(`Reservas medidas en ${colors.brightBlue("Millones de Dolares")}\n`);
    console.log(`Ultimo registro: ${colors.brightGreen.bold(dias_importantes_reservas.dia_actual)} reservas ${colors.brightRed.bold(dias_importantes_reservas.reservas_actual)} USD\n\n`);
    if(argv.min) {
        console.log(`El ${colors.brightGreen.bold(dias_importantes_reservas.dia_min)} se registro la menor cantidad de reservas y fue de ${colors.brightRed.bold(dias_importantes_reservas.cantidad_min)} USD`);
    }
    if(argv.max) {
        console.log(`El ${colors.brightGreen.bold(dias_importantes_reservas.dia_max)} se registro la mayor cantidad de reservas y fue de ${colors.brightRed.bold(dias_importantes_reservas.cantidad_max)} USD`);
    }
    if(argv.f) {
        console.log("\nArchivo creado".green.bold);
    }
}

main();