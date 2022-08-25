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
}