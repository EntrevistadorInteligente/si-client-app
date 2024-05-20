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
      next: event => this.handleEvent(event),
      error: error => console.error(error)
    });
  }

    handleEvent(event: any) {
      const { tipo, mensaje } = event;

      let idEntrevista;
      try {
          // Intenta parsear mensaje como JSON
          const parsedMensaje = JSON.parse(mensaje);
          idEntrevista = parsedMensaje.idEntrevista || mensaje; // Asigna el idEntrevista si está en el JSON
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
              idEntrevista: idEntrevista 
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

  goToNotification(notification: { id: number; message: string; url: string; idEntrevista?: string }) {
    if (notification.idEntrevista) {
      this.router.navigate(['/zona-entrevista', notification.idEntrevista]);
    }
    this.visible = false;
    this.notifications = [];
  }

  showDialog() {
    this.visible = true;
    this.badgeCount = 0;
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