import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedbackComentarioDto, FeedbackDto } from '@shared/model/feedback-dto';
import { PreguntaComentarioDto } from '@shared/model/pregunta-comentario-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { RespuestaComentarioDto, RespuestaDto } from '@shared/model/respuesta-dto';

@Injectable()
export class FeedbackService {

  feedbackURL = environment.feedbackURL;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }


  public crearSolicitudFeedback(feedbackDto: FeedbackDto): Observable<any> {
    return this.httpClient.post(`${this.feedbackURL}/feedback/solicitudes/entrevistas/${feedbackDto.idEntrevista}`, feedbackDto.procesoEntrevista, {
      headers: this.getHeaders()
    });
  }

  public obtenerPreguntas(entrevistaId: string): Observable<PreguntaComentarioDto[]> {
    return this.httpClient.get<PreguntaComentarioDto[]>(`${this.feedbackURL}/preguntas/entrevistas/${entrevistaId}`, {
      headers: this.getHeaders()
    });
  }

  public enviarRespuestas(entrevistaId: string, respuestas: RespuestaComentarioDto[]): Observable<any> {
    return this.httpClient.post(`${this.feedbackURL}/respuestas/solicitudes-feedback/entrevistas/${entrevistaId}`, respuestas, {
      headers: this.getHeaders()
    });
  }

  public obtenerFeedback(entrevistaId: string): Observable<any> {
    return this.httpClient.get<FeedbackComentarioDto[]>(`${this.feedbackURL}/feedback/entrevistas/${entrevistaId}`, {
      headers: this.getHeaders()
    });
  }


  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const token = this.authService.getToken();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }
}
