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

export class Reservas {
    reservas = [];
    fechasImportantes = {
        dia_min: new Date(),
        dia_max: new Date(),
        dia_actual: new Date(),
        reservas_actual: 0, 
        cantidad_max: 0,
        cantidad_min: 0,
    }
    cantidad_reservas = 0;

    agregarReserva(reserva) {
        this.reservas.push(reserva);

        if(this.cantidad_reservas === 0) {
            this.cantidad_reservas++;
            this.fechasImportantes.dia_actual = reserva.fecha;
            this.fechasImportantes.reservas_actual = reserva.cantidad;
            this.fechasImportantes.cantidad_max = reserva.cantidad;
            this.fechasImportantes.dia_max = reserva.fecha;
            this.fechasImportantes.cantidad_min = reserva.cantidad;
            this.fechasImportantes.dia_min = reserva.dia;
        } else {

            if(this.fechasImportantes.cantidad_max < reserva.cantidad) {
                this.fechasImportantes.cantidad_max = reserva.cantidad;
                this.fechasImportantes.dia_max = reserva.fecha;
            }

            if(this.fechasImportantes.cantidad_min > reserva.cantidad) {
                this.fechasImportantes.cantidad_min = reserva.cantidad;
                this.fechasImportantes.dia_min = reserva.fecha;
            }

            if(this.fechasImportantes.dia_actual < reserva.fecha) {
                this.fechasImportantes.dia_actual = reserva.fecha;
                this.fechasImportantes.reservas_actual = reserva.cantidad;
            }
        }
    }

    obtenerReservasMinimas() {
        return {
            fecha: this.fechasImportantes.dia_min,
            cantidad: this.fechasImportantes.cantidad_min
        }
    }

    obtenerReservasMaximas() {
        return {
            fecha: this.fechasImportantes.dia_max,
            cantidad: this.fechasImportantes.cantidad_max
        }       
    }

    obtenerReservaActual() {
        return {
            fecha: this.fechasImportantes.dia_actual,
            cantidad: this.fechasImportantes.reservas_actual
        }
    }

    obtenerReserva(fecha) {
        return this.reservas.find(r => r.fecha === fecha);
    }

    eliminarReserva(fecha) {
        this.reservas = this.reservas.filter(r => r.fecha !== fecha);
    }
}

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