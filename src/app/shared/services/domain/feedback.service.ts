import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { switchMap, tap, shareReplay } from 'rxjs/operators';
import { LocaldataService } from './localdata.service';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { FeedbackComentarioDto, FeedbackDto } from '../../model/feedback-dto';
import { PreguntaComentarioDto } from '../../model/pregunta-comentario-dto';
import { RespuestaComentarioDto } from '../../model/respuesta-dto';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  feedbackURL = environment.feedbackURL;

  constructor(
    private httpClient: HttpClient,
    private localdata: LocaldataService,
    private authService: AuthService
  ) {}

  public crearSolicitudFeedback(feedbackDto: FeedbackDto): Observable<any> {
    return from(this.getHeaders()).pipe(
      switchMap((headers) =>
        this.httpClient.post(
          `${this.feedbackURL}/feedback/solicitudes/entrevistas/${feedbackDto.idEntrevista}`,
          feedbackDto.procesoEntrevista,
          { headers }
        )
      )
    );
  }

  public obtenerPreguntas(entrevistaId: string): Observable<PreguntaComentarioDto[]> {
    return from(this.getHeaders()).pipe(
      switchMap((headers) =>
        this.httpClient.get<PreguntaComentarioDto[]>(
          `${this.feedbackURL}/preguntas/entrevistas/${entrevistaId}`,
          { headers }
        )
      )
    );
  }

  public obtenerMuestraPreguntas(perfil: string): Observable<FeedbackComentarioDto[]> {
    const cache = this.localdata.getCacheFromLocalStorage();
    const cachedData = cache[perfil];

    if (cachedData && !this.localdata.isCacheExpired(cachedData.timestamp)) {
      return of(cachedData.data);
    } else {
      return from(this.getHeaders()).pipe(
        switchMap((headers) =>
          this.httpClient.get<FeedbackComentarioDto[]>(
            `${this.feedbackURL}/muestra/preguntas?perfil=${perfil}`,
            { headers }
          ).pipe(
            tap((response) => this.localdata.saveToLocalStorage(perfil, response)),
            shareReplay(1)
          )
        )
      );
    }
  }

  public enviarRespuestas(entrevistaId: string, respuestas: RespuestaComentarioDto[]): Observable<any> {
    return from(this.getHeaders()).pipe(
      switchMap((headers) =>
        this.httpClient.post(
          `${this.feedbackURL}/respuestas/solicitudes-feedback/entrevistas/${entrevistaId}`,
          respuestas,
          { headers }
        )
      )
    );
  }

  public obtenerFeedback(entrevistaId: string): Observable<any> {
    return from(this.getHeaders()).pipe(
      switchMap((headers) =>
        this.httpClient.get<FeedbackComentarioDto[]>(
          `${this.feedbackURL}/feedback/entrevistas/${entrevistaId}`,
          { headers }
        )
      )
    );
  }

  private async getHeaders(): Promise<HttpHeaders> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    try {
      const token = await this.authService.getToken();
      headers = headers.set('Authorization', `Bearer ${token}`);
    } catch (error) {
      console.error('Error obteniendo el token', error);
      throw error;
    }

    return headers;
  }
}
