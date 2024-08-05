import { Component, OnInit, OnDestroy, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { filter, Subscription, switchMap, tap } from "rxjs";
import { TipoNotificacionEnum } from "src/app/shared/model/tipo-notificacion.enum";
import { EntrevistaService } from "src/app/shared/services/domain/entrevista.service";
import { NotificationCommunicationService } from "src/app/shared/services/domain/notification-communication.service";
import { SseService } from "src/app/shared/services/domain/sse.service";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent implements OnInit, OnDestroy {
  private sseSubscription: Subscription;
  private notificationSubscription: Subscription;
  notifications: any[] = [];
  badgeCount = 0;
  private audio: HTMLAudioElement;
  private localStorageKey = "notifications";

  constructor(
    private sseService: SseService,
    private router: Router,
    private zone: NgZone,
    private notificationCommService: NotificationCommunicationService
  ) {
    this.audio = new Audio("assets/sounds/notification.wav");
    this.audio.load();
  }

  ngOnInit() {
    this.loadNotificationsFromLocalStorage();
    this.listenForNotifications();
  }

  private listenForNotifications() {
    this.notificationSubscription = this.notificationCommService.notification$.subscribe(
      () => {
        this.startSSE();
      }
    );
  }

  private startSSE() {
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
    }
    this.sseSubscription = this.sseService.startServerSentEvent().subscribe({
      next: (event) => {
        this.handleEvent(event);
        if (event.tipo === TipoNotificacionEnum.PREGUNTAS_GENERADAS || event.tipo === TipoNotificacionEnum.FEEDBACK_GENERADAS) {
          this.sseSubscription.unsubscribe();
          this.sseService.stopServerSentEvent();
        }
      },
      error: (error) => console.error('Error in SSE connection:', error),
      complete: () => console.log('SSE connection closed')
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
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
    }
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
    this.sseService.stopServerSentEvent();
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
