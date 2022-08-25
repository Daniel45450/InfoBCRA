import * as fs from 'fs';

export class Eventos {
    eventos = [];
    PRESIDENCIA = "pres";
    MINISTRO = "econ";
    MISCALENOS = "misc";

    agregarEvento(evento) {
        this.eventos.push(evento);
    }

    eliminarEvento(fecha) {
        eventos = this.eventos.filter(e => e.fecha !== fecha);
    }

    obtenerEventos_presidencia() {
        return this.eventos.filter(e => e.tipo === this.PRESIDENCIA);
    }

    obtenerEventos_ministros() {
        return this.eventos.filter(e => e.tipo === this.MINISTRO);
    }

    obtenerEventos_misc() {
        return this.eventos.filter(e => e.tipo === this.MISCALENOS);
    }

    createFilePresidencias(path = "") {
        if(path.length === 0) {
            return `Path no valido`
        }
        let salida = "";
        const presidencias = this.obtenerEventos_presidencia();
        presidencias.forEach(p => {
            salida += `${p.info}:${p.fecha.getDate() + 1}/${p.fecha.getMonth() +1}/${p.fecha.getFullYear()}\n`;
        })
        fs.writeFileSync(path, salida);
        console.log("\nArchivo creado".green.bold);
    }

    createFileMinistros(path = "") {
        if(path.length === 0) {
            return `Path no valido`
        }
        let salida = "";
        const ministros = this.obtenerEventos_ministros();
        ministros.forEach(m => {
            salida += `${m.info}:${m.fecha.getDate() + 1}/${m.fecha.getMonth() +1}/${m.fecha.getFullYear()}\n`;            
        })

        fs.writeFileSync(path, salida);
        console.log("\nArchivo creado".green.bold);
    }
}