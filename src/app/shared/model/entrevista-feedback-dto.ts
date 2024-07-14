export class EntrevistaFeedbackDto {
    respuesta: string;
    pregunta: string;
    feedback: string;
    constructor(
        respuesta: string = '',
        pregunta: string = '',
        feedback: string = '') {
        this.respuesta = respuesta;
        this.pregunta = pregunta;
        this.feedback=feedback;
    }
}
