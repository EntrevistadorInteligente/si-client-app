import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedbackDto } from '@shared/model/feedback-dto';
import { FormularioDto } from '@shared/model/formulario-dto';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

@Injectable()
export class FeedbackService {
  fooURL = 'http://localhost:8765/api/feedback/v1/';
  fooURL2 = 'http://localhost:8765/api/ms2/';
  feedbackURL = 'http://localhost:8765/api/administrador-entrevista/v1';
  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})};

  constructor(
    private httpClient: HttpClient,
    private oauthService: OAuthService
  ) {}

  public crearSolicitudFeedback(file: File, formulario: FormularioDto): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('formulario', new Blob([JSON.stringify(formulario)], {
        type: 'application/json'
    }));

    return this.httpClient.post(`${this.fooURL}cv`, formData);

  public crearSolicitudFeedback(feedbackDto:FeedbackDto): Observable<any> {

    return this.httpClient.post(`${this.feedbackURL}/feedback/solicitudes/entrevistas/${feedbackDto.idEntrevista}`, feedbackDto.procesoEntrevista, {
      headers: this.getHeaders()
    });
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

      const token = this.oauthService.getAccessToken();
      headers = headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }
}
