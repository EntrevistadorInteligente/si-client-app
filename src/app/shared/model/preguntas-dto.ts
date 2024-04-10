export class PreguntasDto {
    respuesta: string;
    pregunta: string;
    constructor(
        respuesta: string = '',
        pregunta: string = '') {
        this.respuesta = respuesta;
        this.pregunta = pregunta;
    }
}
