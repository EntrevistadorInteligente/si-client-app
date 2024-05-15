import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SseService } from '@shared/service/sse.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  private eventsSubscription: Subscription;
  notifications: any[] = [];
  badgeCount = 0;
  visible = false;

  constructor(private sseService: SseService, private router: Router, private zone: NgZone) { }

  ngOnInit() {
    this.eventsSubscription = this.sseService.getServerSentEvent().subscribe({
      next: event => {
        this.handleEvent(event);
      },
      error: error => console.error(error)
    });
  }

  handleEvent(event: any) {
    const { tipoEvento, mensaje } = event;
    switch (tipoEvento) {
      case 'FEEDBACK':
        this.handleFeedbackEvent(mensaje);
        break;
      case 'ORQUESTADOR':
        this.handleOrquestadorEvent(mensaje);
        break;
      // Agrega más casos según los tipos de evento
      default:
        console.warn(`Tipo de evento desconocido: ${tipoEvento}`);
    }
  }

  handleFeedbackEvent(mensaje: string) {
    const data = JSON.parse(mensaje);
    let url = "PREGUNTAS";
    let notificacion = mensaje;
    if (data.procesoEntrevista[0].feedback !== null) {
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
  }

  handleOrquestadorEvent(mensaje: string) {
    this.zone.run(() => {
      this.notifications.push({
        id: this.badgeCount,
        message: mensaje,
        url: "data.url"
      });
      this.badgeCount = this.notifications.length;
    });
  }

  showDialog() {
    this.visible = true;
    this.badgeCount = 0;
  }

  goToInterview(notification: { id: number; message: string; url: string }) {
    try {
      const data = JSON.parse(notification.message);
    } catch (e) {
      console.error('Error al parsear las preguntas', e);
    }
  }

  onNotification() {
    this.visible = false;
    this.notifications = [];
  }

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}