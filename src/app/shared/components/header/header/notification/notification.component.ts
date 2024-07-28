import { Component, OnInit, OnDestroy, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { SseService } from "src/app/shared/services/domain/sse.service";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent implements OnInit, OnDestroy {
  private eventsSubscription: Subscription;
  notifications: any[] = [];
  badgeCount = 0;
  private audio: HTMLAudioElement;
  private localStorageKey = "notifications";

  constructor(
    private sseService: SseService,
    private router: Router,
    private zone: NgZone
  ) {
    this.audio = new Audio("assets/sounds/notification.wav");
    this.audio.load();
  }

  ngOnInit() {
    this.loadNotificationsFromLocalStorage();

    this.eventsSubscription = this.sseService.getServerSentEvent().subscribe({
      next: (event) => this.handleEvent(event),
      error: (error) => console.error(error),
    });
  }

  handleEvent(event: any) {
    const { tipo, mensaje } = event;

    let idEntrevista = "";
    try {
      const parsedMensaje = JSON.parse(mensaje);
      idEntrevista = parsedMensaje.idEntrevista || mensaje;
    } catch (e) {
      idEntrevista = mensaje;
    }

    if (typeof idEntrevista === "string") {
      idEntrevista = idEntrevista.replace(/^"|"$/g, "");
    }

    this.zone.run(() => {
      this.notifications.unshift({
        id: this.badgeCount,
        message: this.getMessage(tipo),
        url: tipo,
        idEntrevista: idEntrevista,
        sender: "Kori Thomas",
        time: new Date().toLocaleTimeString(),
      });
      this.badgeCount = this.notifications.length;
      this.playNotificationSound();
      this.saveNotificationsToLocalStorage();
    });
  }

  playNotificationSound() {
    this.audio.currentTime = 0;
    this.audio
      .play()
      .catch((error) => console.error("Error playing sound:", error));
  }

  getMessage(tipo: string): string {
    switch (tipo) {
      case "PG":
        return "Tu entrevista está lista!";
      case "FG":
        return "Tu feedback está listo!";
      case "HG":
        return "Tu hoja de vida esta listo!";
      default:
        return "Nuevo mensaje!";
    }
  }

  getNotificationLink(notification: any) {
    if (notification.url === "PG" || notification.url === "FG") {
      return ["/zona-entrevista", notification.idEntrevista];
    } else if (notification.url === "HG") {
      return ["/perfil"];
    } else {
      return ["#"];
    }
  }

  navigateToNotification(notification: any) {
    const link = this.getNotificationLink(notification);
    const currentUrl = this.router.url;

    if (currentUrl === this.router.createUrlTree(link).toString()) {
      window.location.reload();
    } else {
      this.router.navigate(link).then(() => {
        this.removeNotification(notification);
      });
    }
  }

  removeNotification(notification: any) {
    this.notifications = this.notifications.filter((n) => n !== notification);
    this.badgeCount = this.notifications.length;
    this.saveNotificationsToLocalStorage();
  }

  markAllAsRead() {
    this.notifications = [];
    this.badgeCount = 0;
    this.saveNotificationsToLocalStorage();
  }

  loadNotificationsFromLocalStorage() {
    const storedNotifications = localStorage.getItem(this.localStorageKey);
    if (storedNotifications) {
      this.notifications = JSON.parse(storedNotifications);
      this.badgeCount = this.notifications.length;
    }
  }

  saveNotificationsToLocalStorage() {
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.notifications)
    );
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
