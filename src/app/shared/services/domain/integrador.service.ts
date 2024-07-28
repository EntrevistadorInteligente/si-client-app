import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Perfil } from '../../model/interfaces-perfil';
import { FormularioDto } from '../../model/formulario-dto';
import { HojaDeVidaDto } from '../../model/hoja-de-vida-dto';
import { EstadoEntrevistaDto } from '../../model/estado-entreviosta-dto';
import { EntrevistaUsuarioDto } from '../../model/entrevista-usuario-dto';

@Injectable({
  providedIn: 'root',
})
export class IntegradorService {
  orquestadorURL = environment.orquestadorURL;
  entrevista = '/entrevistadores';
  hojaDeVida = '/hojas-de-vidas';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}


  public listPerfiles(): Observable<Perfil[]> {
    return this.httpClient.get<Perfil[]>(
      `${this.orquestadorURL}/entrevistador/public/perfiles`
    );
  }

  public crearSolicitudEntrevista(formulario: FormularioDto): Observable<any> {
    localStorage.removeItem(`${this.authService.getUsername()}_chatHistory`);
    return from(this.getHeaders()).pipe(
      switchMap(headers =>
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
      switchMap(headers => {
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
      switchMap(headers =>
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
      switchMap(headers => {
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
      switchMap(headers => {
        const username = this.authService.getUsername();
        return this.httpClient.get<EstadoEntrevistaDto>(
          `${this.orquestadorURL}${this.entrevista}?username=${username}`,
          { headers }
        );
      })
    );
  }

  public obtenerEstadoEntrevista(
    idEntrevista: string
  ): Observable<EstadoEntrevistaDto> {
    return from(this.getHeaders()).pipe(
      switchMap(headers =>
        this.httpClient.get<EstadoEntrevistaDto>(
          `${this.orquestadorURL}${this.entrevista}/${idEntrevista}/estado`,
          { headers }
        )
      )
    );
  }

  public terminarEntrevistaEnCurso(
    idEntrevista: string,
    mensaje: string
  ): Observable<any> {
    return from(this.getHeaders()).pipe(
      switchMap(headers =>
        this.httpClient.put(
          `${this.orquestadorURL}${this.entrevista}/${idEntrevista}/terminar`,
          { mensaje },
          { headers }
        )
      )
    );
  }

  public obtenerEntrevistaEnProceso(
    idEntrevista: string
  ): Observable<EntrevistaUsuarioDto> {
    return from(this.getHeaders()).pipe(
      switchMap(headers =>
        this.httpClient.get<EntrevistaUsuarioDto>(
          `${this.orquestadorURL}${this.entrevista}/${idEntrevista}`,
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
