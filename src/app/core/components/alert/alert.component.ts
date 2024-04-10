import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreguntasDto } from '@shared/model/preguntas-dto';
import { AlertService } from '@shared/service/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  private eventsSubscription: Subscription;
  private eventsFeedbackSubscription: Subscription;
  notifications: Array<{ id: number; message: string; url: string }> = [];
  badgeCount = 0;
  visible: boolean = false;

  constructor(private sseService: AlertService, private zone: NgZone,
    private router: Router
  ) { }

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

    this.eventsFeedbackSubscription = this.sseService.getFeedbackServerSentEvent().subscribe({
      next: event => {
        this.zone.run(() => {
          this.notifications.push({
            id: this.badgeCount,
            message: event.data,
            url: "PREGUNTAS"
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
  goToInterview(notification: { id: number; message: string; url: string }) {
    try {
      const data = JSON.parse(notification.message); 
      if (data && data.feedback) {
        const preguntasDtos: PreguntasDto[] = data.feedback.map((pregunta: string) => {
          return { pregunta: pregunta };
        });
        this.sseService.changeQuestions(preguntasDtos);
        this.visible = false;
    this.notifications = [];
        this.router.navigate(['/zona-entrevista']);
      }
    } catch (e) {
      console.error('Error al parsear las preguntas', e);
    }
  }

  onNotification() {
    this.visible = false;
    this.notifications = [];
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
    this.eventsFeedbackSubscription.unsubscribe();
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
