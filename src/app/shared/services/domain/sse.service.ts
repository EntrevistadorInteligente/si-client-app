import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, mergeMap, Observable, retryWhen, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { NotifiacionDto } from '../../model/notificacion-dto';
import { TipoNotificacionEnum } from '../../model/tipo-notificacion.enum';

@Injectable({
  providedIn: 'root'
})

export class SseService {
  private eventoSource = new BehaviorSubject<NotifiacionDto | undefined>(undefined);
  currentEvento = this.eventoSource.asObservable();

  private eventSource: EventSource | null = null;

  notifcacionesURL = environment.notifcacionesURL;
  private maxRetries = 5;
  private initialRetryDelay = 3000;
  
  constructor(private authService: AuthService, private zone: NgZone) { }

  startServerSentEvent(): Observable<any> {
    const user = this.authService.getEmail();
    return new Observable(observer => {
      const connect = () => {
        this.eventSource = new EventSource(`${this.notifcacionesURL}/eventos/subscribe/${user}`);

        this.eventSource.onmessage = event => {
          this.zone.run(() => {
            const data = JSON.parse(event.data) as NotifiacionDto;
            if (data.tipo === TipoNotificacionEnum.NOTIFICACION_FRONT) {
              return;
            }
            
            observer.next(data);
            this.eventoSource.next(data);

            if (data.tipo === TipoNotificacionEnum.PREGUNTAS_GENERADAS || data.tipo === TipoNotificacionEnum.FEEDBACK_GENERADAS) {
              this.stopServerSentEvent();
              observer.complete();
            }
          });
        };

        this.eventSource.onerror = error => {
          console.error('SSE connection error:', error);
          this.stopServerSentEvent();
          observer.error(error);
        };
      };

      connect();

      return () => this.stopServerSentEvent();
    }).pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error, index) => {
            const retryAttempt = index + 1;
            if (retryAttempt > this.maxRetries) {
              return throwError(() => new Error('Max retries reached'));
            }
            console.log(`Retry attempt ${retryAttempt}: retrying in ${this.initialRetryDelay * Math.pow(2, index)} ms`);
            return new Observable(observer => {
              setTimeout(() => {
                observer.next();
                observer.complete();
              }, this.initialRetryDelay * Math.pow(2, index));
            });
          }),
          tap(() => console.log('Retrying SSE connection'))
        )
      )
    );
  }

  stopServerSentEvent() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}
