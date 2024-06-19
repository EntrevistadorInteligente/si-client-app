import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, switchMap } from 'rxjs';
import { VistaPreviaEntrevistaDto } from '../../model/vista-previa-entrevista-dto';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Perfil } from '../../model/interfaces-perfil';
import { FormularioDto } from '../../model/formulario-dto';
import { HojaDeVidaDto } from '../../model/hoja-de-vida-dto';
import { EstadoEntrevistaDto } from '../../model/feedback-dto copy';

@Injectable({
  providedIn: 'root'
})
export class IntegradorService {
  orquestadorURL = environment.orquestadorURL;
  entrevista = '/entrevistadores';
  hojaDeVida = '/hojas-de-vidas';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public list(): Observable<VistaPreviaEntrevistaDto[]> {
    return this.httpClient.get<VistaPreviaEntrevistaDto[]>(
      `${this.orquestadorURL}/public/preguntas`
    );
  }

  public listPerfiles(): Observable<Perfil[]> {
    return this.httpClient.get<Perfil[]>(
      `${this.orquestadorURL}/entrevistador/public/perfiles`
    );
  }

  public listAut(): Observable<VistaPreviaEntrevistaDto[]> {
    return from(this.getHeaders()).pipe(
      switchMap((headers) =>
        this.httpClient.get<VistaPreviaEntrevistaDto[]>(
          `${this.orquestadorURL}/preguntas`,
          { headers }
        )
      )
    );
  }

  public crearSolicitudEntrevista(formulario: FormularioDto): Observable<any> {
    return from(this.getHeaders()).pipe(
      switchMap((headers) =>
        this.httpClient.post(
          `${this.orquestadorURL}${this.entrevista}/solicitudes-entrevistas?username=${this.authService.getUsername()}`,
          formulario,
          { headers }
        )
      )
    );
  }

  public obtenerHojaDeVida(): Observable<HojaDeVidaDto> {
    return from(this.getHeaders()).pipe(
      switchMap((headers) => {
        const username = this.authService.getUsername();
        return this.httpClient.get<HojaDeVidaDto>(
          `${this.orquestadorURL}${this.hojaDeVida}/${username}`,
          { headers }
        );
      })
    );
  }

  public corregirHojaDeVida(formulario: HojaDeVidaDto): Observable<any> {
    return from(this.getHeaders()).pipe(
      switchMap((headers) =>
        this.httpClient.put(
          `${this.orquestadorURL}${this.hojaDeVida}/${formulario.uuid}`,
          formulario,
          { headers }
        )
      )
    );
  }

  public cargarHojaDeVida(file: File): Observable<any> {
    return from(this.getHeadersSinContent()).pipe(
      switchMap((headers) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append(
          'username',
          new Blob([this.authService.getUsername()], {
            type: 'application/json',
          })
        );

        return this.httpClient.post(
          `${this.orquestadorURL}${this.hojaDeVida}/cargas`,
          formData,
          { headers }
        );
      })
    );
  }

  public obtenerEstadoEntrevistaPorUsuario(): Observable<EstadoEntrevistaDto> {
    return from(this.getHeaders()).pipe(
      switchMap((headers) => {
        const username = this.authService.getUsername();
        return this.httpClient.get<EstadoEntrevistaDto>(
          `${this.orquestadorURL}${this.entrevista}?username=${username}`,
          { headers }
        );
      })
    );
  }

  public obtenerEstadoEntrevista(idEntrevista: string): Observable<EstadoEntrevistaDto> {
    return from(this.getHeaders()).pipe(
      switchMap((headers) =>
        this.httpClient.get<EstadoEntrevistaDto>(
          `${this.orquestadorURL}${this.entrevista}/${idEntrevista}`,
          { headers }
        )
      )
    );
  }

  
  public terminarEntrevistaEnCurso(idEntrevista:string): Observable<any> {
    return from(this.getHeaders()).pipe(
      switchMap((headers) =>
        this.httpClient.put(
          `${this.orquestadorURL}${this.entrevista}/${idEntrevista}/terminar`,
          undefined,
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

  private async getHeadersSinContent(): Promise<HttpHeaders> {
    let headers = new HttpHeaders();
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
