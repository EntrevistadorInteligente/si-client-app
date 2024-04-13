import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VistaPreviaEntrevistaDto } from '../model/vista-previa-entrevista-dto';
import { OAuthService } from 'angular-oauth2-oidc';
import { FormularioDto } from '@shared/model/formulario-dto';
import { EntrevistaFeedbackDto } from '@shared/model/entrevista-feedback-dto';

@Injectable()

export class IntegradorService {
  orquestadorURL = 'http://localhost:8765/api/orquestador/v1/entrevistadores';
  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})};

  constructor(
    private httpClient: HttpClient,
    private oauthService: OAuthService
  ) {}


  public list(): Observable<VistaPreviaEntrevistaDto[]> {
    return this.httpClient.get<VistaPreviaEntrevistaDto[]>(`${this.orquestadorURL}/public/preguntas`);
  }

  public listAut(): Observable<VistaPreviaEntrevistaDto[]> {
    return this.httpClient.get<VistaPreviaEntrevistaDto[]>(`${this.orquestadorURL}/preguntas`, {
      headers: this.getHeaders()
    });
  }

  public crearSolicitudEntrevista(formulario: FormularioDto): Observable<any> {

    return this.httpClient.post(`${this.orquestadorURL}/solicitudes-entrevistas?username=test`, formulario, {
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
