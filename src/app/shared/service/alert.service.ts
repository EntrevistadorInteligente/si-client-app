import { Injectable } from '@angular/core';
import { PreguntasDto } from '@shared/model/preguntas-dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private questionsSource = new BehaviorSubject<PreguntasDto[]>([]);
  currentQuestions = this.questionsSource.asObservable();

  private sseUrlOrquestador = 'http://localhost:8765/api/orquestador/v1/eventos/subscribe';
  private sseUrlFeedback = 'http://localhost:8765/api/feedback/v1/eventos/subscribe';
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

  changeQuestions(questions: PreguntasDto[]) {
    this.questionsSource.next(questions);
  }

}