import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PreguntaComentarioDto } from 'src/app/shared/model/pregunta-comentario-dto';
import { RespuestaComentarioDto } from 'src/app/shared/model/respuesta-dto';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private preguntas: PreguntaComentarioDto[] = [
    { idPregunta: "1", pregunta: "¿Cuál es tu experiencia liderando el diseño, desarrollo y despliegue de aplicaciones web utilizando Angular y .NET?" },
    // Añade más preguntas aquí
  ];

  private respuestas: RespuestaComentarioDto[] = [];

  constructor() {
    this.respuestas = this.preguntas.map(p => ({
      idPregunta: p.idPregunta,
      respuesta: ''
    }));
  }

  obtenerPreguntas(): Observable<PreguntaComentarioDto[]> {
    return of(this.preguntas);
  }

  enviarRespuestas(respuestas: RespuestaComentarioDto[]): Observable<any> {
    // Aquí enviarías las respuestas a tu backend
    console.log('Respuestas enviadas', respuestas);
    return of({ success: true });
  }
}
