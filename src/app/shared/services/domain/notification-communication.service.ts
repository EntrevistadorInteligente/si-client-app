import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationCommunicationService {
  private notificationSubject = new Subject<void>();
  notification$ = this.notificationSubject.asObservable();

  triggerNotification() {
    this.notificationSubject.next();
  }
}