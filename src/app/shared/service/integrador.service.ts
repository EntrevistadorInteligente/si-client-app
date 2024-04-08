import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VistaPreviaEntrevistaDto } from '../model/vista-previa-entrevista-dto';
import { OAuthService } from 'angular-oauth2-oidc';
import { FormularioDto } from '@shared/model/formulario-dto';
import { PreguntasDto } from '@shared/model/preguntas-dto';

@Injectable()

export class IntegradorService {
  fooURL = 'http://localhost:8765/api/orquestador/v1/entrevistador/';
  fooURL2 = 'http://localhost:8765/api/ms2/';
  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})};

  constructor(
    private httpClient: HttpClient,
    private oauthService: OAuthService
  ) {}


  public list(): Observable<VistaPreviaEntrevistaDto[]> {
    return this.httpClient.get<VistaPreviaEntrevistaDto[]>(`${this.fooURL}public/preguntas`);
  }

  public listAut(): Observable<VistaPreviaEntrevistaDto[]> {
    return this.httpClient.get<VistaPreviaEntrevistaDto[]>(`${this.fooURL}preguntas`, {
      headers: this.getHeaders()
    });
  }

  public crearSolicitudEntrevista(file: File, formulario: FormularioDto): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('formulario', new Blob([JSON.stringify(formulario)], {
        type: 'application/json'
    }));
  
    return this.httpClient.post(`${this.fooURL}cv`, formData);
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

      const token = this.oauthService.getAccessToken();
      headers = headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }

  getQuestions(): PreguntasDto[] {
    return [
      { text: 'Tell us about yourself.' },
      { text: 'Why are you interested in this position?' },
      { text: 'What is your greatest strength?' },
      { text: 'Where do you see yourself in 5 years?' },
      { text: 'Describe a challenge you faced and how you dealt with it.' },
      { text: 'How do you handle stress and pressure?' },
      { text: 'What are your salary expectations?' },
      { text: 'Why should we hire you?' },
      { text: 'Do you have any questions for us?' },
      { text: 'How do you keep up-to-date with industry trends?' }
    ].map((q, index) => ({
      ...q,
      userAnswer: '', // Initialize the answer property
    }));
  }

}
