export class Evento {
    fecha = new Date();
    tipo = "";
    info= "";
    constructor(fecha, tipo, info) {
        this.fecha = fecha;
        this.tipo = tipo;
        this.info = info;
    }

    get fecha() {
        return this.fecha;
    }

    get info() {
        return this.info;
    }

    get tipo() {
        return this.tipo
    }

    set fecha(fecha) {
        this.fecha = fecha;
    }

    set tipo(tipo) {
        this.tipo = tipo;
    }

    set info(info) {
        this.info = info;
    }
}