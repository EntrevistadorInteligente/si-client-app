import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedbackComentarioDto, FeedbackDto } from '@shared/model/feedback-dto';
import { PreguntaComentarioDto } from '@shared/model/pregunta-comentario-dto';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { RespuestaComentarioDto } from '@shared/model/respuesta-dto';
import { LocaldataService } from './localdata.service';

@Injectable()
export class FeedbackService {
  feedbackURL = environment.feedbackURL;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private httpClient: HttpClient,
    private localdata: LocaldataService,
    private authService: AuthService
  ) {}

  public crearSolicitudFeedback(feedbackDto: FeedbackDto): Observable<any> {
    return this.httpClient.post(
      `${this.feedbackURL}/feedback/solicitudes/entrevistas/${feedbackDto.idEntrevista}`,
      feedbackDto.procesoEntrevista,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public obtenerPreguntas(
    entrevistaId: string
  ): Observable<PreguntaComentarioDto[]> {
    return this.httpClient.get<PreguntaComentarioDto[]>(
      `${this.feedbackURL}/preguntas/entrevistas/${entrevistaId}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public obtenerMuestraPreguntas(
    perfil: string
  ): Observable<FeedbackComentarioDto[]> {
    const cache = this.localdata.getCacheFromLocalStorage();
    const cachedData = cache[perfil];

    if (cachedData && !this.localdata.isCacheExpired(cachedData.timestamp)) {
      return of(cachedData.data);
    } else {
      return this.httpClient
        .get<FeedbackComentarioDto[]>(
          `${this.feedbackURL}/muestra/preguntas?perfil=${perfil}`
        )
        .pipe(
          tap((response) =>
            this.localdata.saveToLocalStorage(perfil, response)
          ),
          shareReplay(1)
        );
    }
  }

  public enviarRespuestas(
    respuestas: RespuestaComentarioDto[]
  ): Observable<any> {
    return this.httpClient.post(
      `${this.feedbackURL}/respuestas/solicitudes-feedback/entrevistas/66481e493e360c336023dfec`,
      respuestas,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public obtenerFeedback(entrevistaId: string): Observable<any> {
    return this.httpClient.get<FeedbackComentarioDto[]>(
      `${this.feedbackURL}/feedback/entrevistas/${entrevistaId}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const token = this.authService.getToken();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }
}
