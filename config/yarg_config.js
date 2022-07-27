import yargs from "yargs";
import { hideBin } from 'yargs/helpers';

export const argv = yargs(hideBin(process.argv))
    .option('min', {
        alias: "reservas_minimas",
        type: "boolean",
        describe: "Devuelve la fecha y reservas minimas historicas",
        default: true,
    })
    .option('max', {
        alias: "reservas_maximas",
        type: "boolean",
        describe: "Devuelve la fecha y reservas maximas historicas",
        default: true
    })
    .option('f', {
        alias: "file_reservas",
        type: "boolean",
        describe: "Crea un archivo con las fechas y reservas correspondientes a cada una",
        default: false
    })
    .argv;