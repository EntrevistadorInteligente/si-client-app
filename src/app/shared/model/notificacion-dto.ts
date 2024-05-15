import { TipoNotificacionEnum } from "./tipo-notificacion.enum";

export class NotifiacionDto {
    tipo: TipoNotificacionEnum;
    mensaje: string;
    constructor(
        mensaje: string = '',
        tipo: TipoNotificacionEnum) {
        this.tipo = tipo;
        this.mensaje = mensaje;
    }
}
