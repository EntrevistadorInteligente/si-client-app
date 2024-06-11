import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SseService } from 'src/app/shared/services/domain/sse.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  private eventsSubscription: Subscription;
  notifications: any[] = [];
  badgeCount = 0;

  constructor(private sseService: SseService, private router: Router, private zone: NgZone) { }

  ngOnInit() {
    this.eventsSubscription = this.sseService.getServerSentEvent().subscribe({
      next: event => this.handleEvent(event),
      error: error => console.error(error)
    });
  }

  handleEvent(event: any) {
    const { tipo, mensaje } = event;

    let idEntrevista = "";
    try {
      // Intenta parsear mensaje como JSON
      const parsedMensaje = JSON.parse(mensaje);
      idEntrevista = parsedMensaje.idEntrevista || mensaje; 
    } catch (e) {
      // Si hay un error al parsear, mensaje es un string
      idEntrevista = mensaje;
    }

    // Elimina comillas adicionales si idEntrevista es un string con comillas
    if (typeof idEntrevista === 'string') {
      idEntrevista = idEntrevista.replace(/^"|"$/g, '');
    }

    this.zone.run(() => {
      this.notifications.push({
        id: this.badgeCount,
        message: this.getMessage(tipo),
        url: tipo,
        idEntrevista: idEntrevista,
        sender: 'Teri Dactyl',
        time: new Date().toLocaleTimeString()
      });
      this.badgeCount = this.notifications.length;
    });
  }

  getMessage(tipo: string): string {
    switch (tipo) {
      case 'PG': return 'Tu entrevista está lista!';
      case 'FG': return 'Tu feedback está listo!';
      default: return 'Nuevo mensaje!';
    }
  }

  getNotificationLink(notification: any) {
    if (notification.url === 'PG' || notification.url === 'FG') {
      return ['/zona-entrevista', notification.idEntrevista];
    } else {
      return ['#'];
    }
  }

  removeNotification(notification: any) {
    this.notifications = this.notifications.filter(n => n !== notification);
    this.badgeCount = this.notifications.length;
  }

  markAllAsRead() {
    this.notifications = [];
    this.badgeCount = 0;
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
