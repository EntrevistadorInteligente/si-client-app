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

  private sseUrlOrquestador = 'http://localhost:8765/api/orquestador/v1/eventos/subscribe';
  private sseUrlFeedback = 'http://localhost:8765/api/administrador-entrevista/v1/eventos/subscribe';
  constructor() { 
  
  }

  getServerSentEvent(): Observable<any> {
    return new Observable(observer => {
      const eventSource = this.connect(observer, this.sseUrlOrquestador);
      return () => eventSource.close();
    });
  }

  private connect(observer: any, url: string): EventSource {
    const eventSource = new EventSource(url);

    eventSource.onmessage = event => {
      console.log('Received event:', event);
      observer.next(event);
    };

    eventSource.onerror = error => {
      eventSource.close(); 
      setTimeout(() => {
        this.connect(observer, url);
      }, 100);
    };

    return eventSource;
  }

  getFeedbackServerSentEvent(): Observable<any> {
    return new Observable(observer => {
      const eventSource = this.connect(observer, this.sseUrlFeedback);
      return () => eventSource.close();
    });
  }

  changeQuestions(questions: FeedbackDto) {
    this.questionsSource.next(questions);
  }
}
