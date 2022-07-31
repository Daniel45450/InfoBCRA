import fetch from 'node-fetch';
import { getToken } from "../config/token.js";
import { argv } from '../config/yarg_config.js';
import colors from 'colors';
import {Evento, Eventos} from "../clases/clases.js";

const eventosURL = "https://api.estadisticasbcra.com/milestones";

export const controladorEventos = async (eventos) => {
    await procesarEventos(eventos);

    const ministros_economia = eventos.obtenerEventos_ministros();
    
    console.log(`\nMinistros de economia: ${colors.brightRed.bold(`${ministros_economia.length}`)}`);
    console.log(`Ministro actual: ${colors.brightGreen.bold(`${ministros_economia[ministros_economia.length -1].info}`) } Asumio el ${colors.brightRed.bold(`${ministros_economia[ministros_economia.length - 1].fecha.getDate()+1 }/${ministros_economia[ministros_economia.length - 1].fecha.getMonth()+1}/${ministros_economia[ministros_economia.length - 1].fecha.getFullYear()}`)}`);

    const presidencias = eventos.obtenerEventos_presidencia();

    console.log(`\nPresidentes de la Nacion: ${colors.brightRed.bold(`${presidencias.length}`)}`);
    console.log(`Presidente actual: ${colors.brightGreen.bold(`${presidencias[presidencias.length -1].info}`) } Asumio el ${colors.brightRed.bold(`${presidencias[presidencias.length - 1].fecha.getDate()+1}/${presidencias[presidencias.length - 1].fecha.getMonth()+1}/${presidencias[presidencias.length - 1].fecha.getFullYear()}`)}`);

}


const obtenerEventos = async () => {
    const datos = await fetch(eventosURL, {
        method: 'get',
        headers: {
            'Authorization' : getToken()
        }
    })

    return await datos.json();
}

const procesarEventos = async(eventos) => {
    const datos = await obtenerEventos();
    for(let x in datos) {
        let evento = new Evento();
        evento.fecha = new Date(datos[x].d);
        evento.tipo = datos[x].t;
        evento.info = datos[x].e;
        eventos.agregarEvento(evento);
    }
}
