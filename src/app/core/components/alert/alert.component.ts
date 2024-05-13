import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignalRService } from '@core/service/signal-r/signal-r.service';
import { SseService } from '@shared/service/sse.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  private eventsSubscription: Subscription;
  private eventsFeedbackSubscription: Subscription;
  notifications: Array<{ id: number; message: string; url: string }> = [];
  badgeCount = 0;
  visible: boolean = false;

  constructor(private sseService: SseService, private zone: NgZone,
    private router: Router,
    private signalRService:SignalRService
  ) { }

  ngOnInit() {
    this.signalRService.establecerConexion();
    /*this.eventsSubscription = this.sseService.getServerSentEvent().subscribe({
      next: event => {
        this.zone.run(() => {
          this.notifications.push({
            id: this.badgeCount,
            message: event.data,
            url: "data.url"
          });
          this.badgeCount = this.notifications.length;
        });
      },
      error: error => console.error(error)
    });

    this.eventsFeedbackSubscription = this.sseService.getFeedbackServerSentEvent().subscribe({
      next: event => {

        let url ="PREGUNTAS";
        let notificacion = event.data;
        const data = JSON.parse(event.data); 
        if(data.procesoEntrevista[0].feedback !== null){
          url = "Otra";
          notificacion = data.procesoEntrevista.map(item => 
            `"pregunta":"${item.pregunta}",\n"respuesta":"${item.respuesta}",\n"feedback":"${item.feedback}"`
          ).join('\n\n');
        }
        

        this.zone.run(() => {
          this.notifications.push({
            id: this.badgeCount,
            message: notificacion,
            url: url
          });
          this.badgeCount = this.notifications.length;
        });
      },
      error: error => console.error(error)
    });*/
  }

  showDialog() {
    this.visible = true;
    this.badgeCount = 0;
  }
  goToInterview(notification: { id: number; message: string; url: string }) {
    try {
      const data = JSON.parse(notification.message); 
      if (data && data.procesoEntrevista) {
        this.sseService.changeQuestions(data);
        this.visible = false;
    this.notifications = [];
        this.router.navigate(['/zona-entrevista']);
      }
    } catch (e) {
      console.error('Error al parsear las preguntas', e);
    }
  }

  onNotification() {
    this.visible = false;
    this.notifications = [];
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
    this.eventsFeedbackSubscription.unsubscribe();
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
