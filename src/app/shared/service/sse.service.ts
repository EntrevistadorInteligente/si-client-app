import { Injectable } from '@angular/core';
import { FeedbackDto } from '@shared/model/feedback-dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SseService {
  private questionsSource = new BehaviorSubject<FeedbackDto>(undefined);
  currentQuestions = this.questionsSource.asObservable();

  private sseUrlOrquestador = 'https://gateway.pruebas-entrevistador-inteligente.site/api/orquestador/v1/eventos/subscribe';
  private sseUrlFeedback = 'https://gateway.pruebas-entrevistador-inteligente.site/api/administrador-entrevista/v1/eventos/subscribe';
  constructor() { 
  
  }

  getServerSentEvent(): Observable<any> {
    return new Observable(observer => {
      const eventSource = new EventSource(this.sseUrlOrquestador);

      eventSource.onmessage = event => {
        console.log('Received event: ', event);
        observer.next(event);
      };

      eventSource.onerror = error => {
        console.log('EventSource failed:', error);
        observer.error(error);
      };

      return () => {
        eventSource.close();
      };
    });
  }

  getFeedbackServerSentEvent(): Observable<any> {
    return new Observable(observer => {
      const eventSource = new EventSource(this.sseUrlFeedback);

      eventSource.onmessage = event => {
        console.log('Received event: ', event);
        observer.next(event);
      };

      eventSource.onerror = error => {
        console.log('EventSource failed:', error);
        observer.error(error);
      };

      return () => {
        eventSource.close();
      };
    });
  }

  changeQuestions(questions: FeedbackDto) {
    this.questionsSource.next(questions);
  }
}
