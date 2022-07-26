import fetch from 'node-fetch';
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

export const iniciarReservas = (dia_min, dia_max, dia_actual, reservas_actual, cantidad_max, cantidad_min) => {
    return {
        dia_min,
        dia_max,
        dia_actual,
        reservas_actual, 
        cantidad_max,
        cantidad_min,
    }    
}