import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VistaPreviaEntrevistaDto } from '../model/vista-previa-entrevista-dto';
import { OAuthService } from 'angular-oauth2-oidc';
import { FormularioDto } from '@shared/model/formulario-dto';
import { HojaDeVidaDto } from '@shared/model/hoja-de-vida-dto';

@Injectable()

export class IntegradorService {
  orquestadorURL = 'http://localhost:8765/api/orquestador';
  entrevista = '/v1/entrevistadores';
  hojaDeVida = '/v1/hojas-de-vidas';
  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})};
  username: any;

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

    return this.httpClient.post(`${this.orquestadorURL}${this.entrevista}/solicitudes-entrevistas?username=${this.oauthService.getIdentityClaims()[`preferred_username`]}`, formulario, {
      headers: this.getHeaders()
    });
  }

  public obtenerHojaDeVida(): Observable<HojaDeVidaDto>{
    try{
      this.username = this.oauthService.getIdentityClaims()[`preferred_username`];
    }catch(err){
      console.log(err);
    }
    return this.httpClient.get<HojaDeVidaDto>(`${this.orquestadorURL}${this.hojaDeVida}/${this.username}`, {
      headers: this.getHeaders()
    });
  }

  public corregirHojaDeVida(formulario: HojaDeVidaDto): Observable<any>{
    return this.httpClient.put(`${this.orquestadorURL}${this.hojaDeVida}/${formulario.uuid}`, formulario, {
      headers: this.getHeaders()
    });
  }


  public cargarHojaDeVida(file: File): Observable<any>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', new Blob([JSON.stringify(this.oauthService.getIdentityClaims()[`preferred_username`])], {
        type: 'application/json'
    }));

    return this.httpClient.post(`${this.orquestadorURL}${this.hojaDeVida}/cargas`, formData, {
      headers: this.getHeadersSinContent()
    });
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

      const token = this.oauthService.getAccessToken();
      headers = headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }

  private getHeadersSinContent(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.oauthService.getAccessToken();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
}


}
