import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationCommunicationService {
  private notificationSubject = new Subject<void>();
  notification$ = this.notificationSubject.asObservable();

  private messageSubject = new BehaviorSubject<string>('');
  message$ = this.messageSubject.asObservable();

  triggerNotification() {
    this.notificationSubject.next();
  }

  sendMessage(message: string) {
    this.messageSubject.next(message);
  }
}