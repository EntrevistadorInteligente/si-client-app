import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoNotificacion } from '@core/modelo/dto-notificacion';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';

export interface Options {
  headers?: HttpHeaders;
  params?: HttpParams;
}

const TRES_SEGUNDOS = 3000;
const REDESPACHO = 'hubSignalR';
@Injectable()
export class SignalRService {

  private endPoint = `https://gateway.pruebas-entrevistador-inteligente.site/api/websocket`;

  private hubConnection: signalR.HubConnection;
  constructor(protected httpClient: HttpClient) {
    // Empty constructor
  }

  public obtenerPermisoDeConexion(): Observable<DtoNotificacion> {
    return this.httpClient.get<DtoNotificacion>(`${this.endPoint}/signalr/negotiate`,
    this.optsSkipInterceptor('X-Skip-Interceptor'));
  }

  public optsSkipInterceptor(skipInterceptor: string): Options {
    return this.setHeader('X-Skip-Interceptor', skipInterceptor);
  }

  private setHeader(name: string, value: string) {
    const newopts = this.createDefaultOptions();
    newopts.headers = newopts.headers.set(name, value);
    return newopts;
  }

  public createDefaultOptions(): Options {
    return {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    };
  }
  establecerConexion() {
    this.obtenerPermisoDeConexion().subscribe((resp) => {
      const options = {
        accessTokenFactory: () => resp.token
      };

      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(resp.url, options)
        .configureLogging(signalR.LogLevel.Error)
        .withAutomaticReconnect()
        .build();

      this.iniciarConexion();

      this.hubConnection.on(REDESPACHO, (data: any) => {
        console.log(data)
      });
    });
  }

  async iniciarConexion() {
    try {
      await this.hubConnection.start();
    } catch(err) {
      setTimeout(() => { console.log(err);}, TRES_SEGUNDOS);
    }
  }

  cerrarConexion() {
    this.hubConnection.stop();
  }
}