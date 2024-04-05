import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '@shared/service/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  standalone: false,
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit, OnDestroy {
  private eventsSubscription: Subscription;
  notifications: Array<{ id: number; message: string; url: string }> = [];
  badgeCount = 0;
  visible: boolean = false;

  constructor(private sseService: AlertService, private zone: NgZone) { }

  ngOnInit() {
    this.eventsSubscription = this.sseService.getServerSentEvent().subscribe({
      next: event => {
        this.zone.run(() => { // Ejecuta esta función dentro de la zona de Angular
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
  }

  showDialog() {
    this.visible = true;
    this.badgeCount = 0;
  }

  onNotificationClick(notificationId: string) {
    // Encuentra la notificación específica por id
    const notification = ""//= this.notifications.find(n => n.id === notificationId);
    if (notification) {
      // Aquí manejas la redirección o navegación al componente deseado
      // Puede ser una redirección a una URL o un llamado a tu router de Angular
      // Por ejemplo: this.router.navigate([notification.url]);
    }
  }

  onNotification() {
    this.visible = false;
    this.notifications = [];
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
