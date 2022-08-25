import fetch from 'node-fetch';
import { getToken } from "../config/token.js";
import { argv } from '../config/yarg_config.js';
import colors from 'colors';
import {Evento} from "../models/Evento.js";
import {Eventos} from "../models/Eventos.js";

export const controladorEventos = async (eventos, opciones= [], ejecutado = false) => {
    if(!ejecutado) {
        await procesarEventos(eventos);
    }

    const ministros_economia = eventos.obtenerEventos_ministros();
    const presidencias = eventos.obtenerEventos_presidencia();
    const pathEconomistas = "./salida/Economistas.txt";
    const pathPresidentes = "./salida/Presidentes.txt"
    opciones.forEach(e => {
        switch (e) {
            case 1:
                console.log(`\nMinistros de economia: ${colors.brightRed.bold(`${ministros_economia.length}`)}`);
            break;
        
            case 2:
                console.log(`Ministro actual: ${colors.brightGreen.bold(`${ministros_economia[ministros_economia.length -1].info}`) } Asumio el ${colors.brightRed.bold(`${ministros_economia[ministros_economia.length - 1].fecha.getDate()+1 }/${ministros_economia[ministros_economia.length - 1].fecha.getMonth()+1}/${ministros_economia[ministros_economia.length - 1].fecha.getFullYear()}`)}`);
            break;
            case 3:
                ministros_economia.forEach((m, index) => {
                    const idx = `${index + 1}.`.green
                    console.log(`${idx} ${m.info} ${`${m.fecha.getDate() + 1}/${m.fecha.getMonth()+1}/${m.fecha.getFullYear()}`.blue}\n`);
                })
            break;
            case 4:              
                eventos.createFileMinistros(pathEconomistas);
            break;
            case 5:
                console.log(`\nPresidentes de la Nacion: ${colors.brightRed.bold(`${presidencias.length}`)}`);
            break;
            case 6:
                console.log(`Presidente actual: ${colors.brightGreen.bold(`${presidencias[presidencias.length -1].info}`) } Asumio el ${colors.brightRed.bold(`${presidencias[presidencias.length - 1].fecha.getDate()+1}/${presidencias[presidencias.length - 1].fecha.getMonth()+1}/${presidencias[presidencias.length - 1].fecha.getFullYear()}`)}`);
            break;
            case 7:
                presidencias.forEach((p, index) => {
                    const idx = `${index + 1}.`.green
                    console.log(`${idx} ${p.info} ${`${p.fecha.getDate() + 1}/${p.fecha.getMonth()+1}/${p.fecha.getFullYear()}`.blue}\n`);
                })
            break;
            case 8:              
                eventos.createFileMinistros(pathPresidentes);                
            break;
        }       
    })
}


const obtenerEventos = async () => {
    const eventosURL = "https://api.estadisticasbcra.com/milestones";
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
