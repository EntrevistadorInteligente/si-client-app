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
    const { tipo, mensaje } = event;
    switch (tipo) {
      case 'PG':
        this.handlePreguntasEvent(mensaje);
        break;
      case 'FG':
        this.handleFeedbackEvent(mensaje);
        break;
      case 'ORQUESTADOR':
        this.handleOrquestadorEvent(mensaje);
        break;
      default:
        console.warn(`Tipo de evento desconocido: ${tipo}`);
    }
  }

  handlePreguntasEvent(mensaje: string) {
    this.zone.run(() => {
      this.notifications.push({
        id: this.badgeCount,
        message: 'Tu entrevista está lista!',
        url: 'PG',
        idEntrevista: mensaje
      });
      this.badgeCount = this.notifications.length;
    });
  }

  handleFeedbackEvent(mensaje: string) {
    this.zone.run(() => {
      this.notifications.push({
        id: this.badgeCount,
        message: 'Tu feedback está listo!',
        url: 'FG',
        idEntrevista: mensaje
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

  goToInterview(notification: { id: number; message: string; url: string; idEntrevista?: string }) {
    if (notification.url === 'PG' && notification.idEntrevista) {
      this.router.navigate(['/zona-entrevista/', notification.idEntrevista]);
    } else {
      this.visible = false;
      this.notifications = [];
    }
  }

  goToFeedback(notification: { id: number; message: string; url: string; idEntrevista?: string }) {
    if (notification.url === 'FG' && notification.idEntrevista) {
      this.router.navigate(['/zona-entrevista/', notification.idEntrevista]);
    } else {
      this.visible = false;
      this.notifications = [];
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