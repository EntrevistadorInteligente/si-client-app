import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VistaPreviaEntrevistaDto } from '../model/vista-previa-entrevista-dto';
import { OAuthService } from 'angular-oauth2-oidc';
import { FormularioDto } from '@shared/model/formulario-dto';
import { PreguntasDto } from '@shared/model/preguntas-dto';
import { EstadoEntrevistaDto } from '@shared/model/estado-entrevista-dto';
import { HojaDeVidaDto } from '@shared/model/hoja-de-vida-dto';

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

  public obtenerHojaDeVida(username:String): Observable<HojaDeVidaDto>{
    return this.httpClient.get<HojaDeVidaDto>(`${this.fooURL}/hojas-de-vidas/${username}`);
  }

  public corregirHojaDeVida(formulario: HojaDeVidaDto): Observable<any>{
    return this.httpClient.put(`${this.fooURL}/hojas-de-vidas/corregir-datos`, formulario);
  }

  public cargarHojaDeVida(file: File): Observable<any>{
    return this.httpClient.post(`${this.fooURL}/hojas-de-vidas/cargar`, file);
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

      const token = this.oauthService.getAccessToken();
      headers = headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }


}
