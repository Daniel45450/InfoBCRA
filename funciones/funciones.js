import fetch from 'node-fetch';
import { Reserva, Reservas } from '../clases/clases.js';
import {getToken} from "../config/token.js"

const url_reservas = `https://api.estadisticasbcra.com/reservas`;


export const obtenerReservas = async() => {
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

export const procesar_reservas = async(reservas, crear) => {
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