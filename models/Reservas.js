import * as fs from 'fs';

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

    createFileInfo(path = "") {
        if(this.reservas.length === 0) {
            console.log('No hay informacion para cargar');
            return;
        }
        let salida = "";
        this.reservas.forEach(r => {
            salida += `${r.fecha.getDate() + 1}/${r.fecha.getMonth() + 1}/${r.fecha.getFullYear()}:${r.cantidad}\n`;
        });

        fs.writeFileSync(path, salida);

        console.log("\nArchivo creado".green.bold);
    }
}