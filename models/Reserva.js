export class Reserva {
    fecha;
    cantidad;
    constructor(fecha, cantidad) {
        this.cantidad = cantidad;
        this.fecha = fecha;
    }

    get fecha() {
        return this.fecha;
    }

    get cantidad() {
        this.cantidad = this.cantidad;
    }

    set fecha(fecha) {
        this.fecha = fecha;
    }

    set cantidad(cantidad) {
        this.cantidad = cantidad;
    }
}