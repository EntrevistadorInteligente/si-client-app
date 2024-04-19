export class EstadoEntrevistaDto{
    fecha: Date;
    estado: string;
    fuente: string;
    error: string;
    constructor(
        fecha: Date = null,
        estado: string = '',
        fuente: string = '',
        error: string = '') {
        this.fecha = fecha;
        this.estado = estado;
        this.fuente = fuente;
        this.error = error;
    }
}