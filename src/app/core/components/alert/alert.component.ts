import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '@shared/service/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
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
  }

  showDialog() {
    this.visible = true;
    this.badgeCount = 0;
  }

  onNotificationClick(notificationId: string) {
    const notification = this.notifications.find(n => n.id === parseInt(notificationId));

    if (notification) {
      // Aquí puedes manejar la redirección o navegación al componente deseado
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

  trackById(index: number, item: any): number {
    return item.id;
  }
}
