import { Component, OnInit } from '@angular/core';
import { EntrevistaFeedbackDto } from '@shared/model/entrevista-feedback-dto';
import { FeedbackDto } from '@shared/model/feedback-dto';
import { FeedbackService } from '@shared/service/feedback.service';
import { IntegradorService } from '@shared/service/integrador.service';
import { SseService } from '@shared/service/sse.service';
import { MessageService } from 'primeng/api';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-paso-3',
  templateUrl: './paso-3.component.html',
  styleUrl: './paso-3.component.scss'
})

export class Paso3Component implements OnInit {

  feedback: FeedbackDto;
  currentIndex: number = 0;
  first: number = 0;
  rows: number = 10;
  visible: boolean = false;

  constructor(private integradorService: IntegradorService,
    private alertService: SseService,
    private messageService: MessageService,
    private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.alertService.currentQuestions.subscribe(feedback => {
      this.feedback = feedback;
    });
  }

  get currentQuestion(): EntrevistaFeedbackDto {
    return this.feedback.procesoEntrevista[this.currentIndex];
  }
  
  get progressValue(): number {
    return (this.currentIndex + 1) / this.feedback.procesoEntrevista.length * 100;
  }

  onPageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
  }

  previousQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextQuestion() {
    if (this.currentIndex < this.feedback.procesoEntrevista.length - 1) {
      this.currentIndex++;
    }
  }

  submitAnswers() {
    const hasEmptyAnswers = this.feedback.procesoEntrevista.some(element => !element.respuesta);
    if (hasEmptyAnswers) {
      this.visible = true;
      return;
    }
    this.feedbackService.crearSolicitudFeedback(this.feedback).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Entrevista enviada con éxito, estaremos generando su feedback en un momento' });
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al enviar la entrevista. Por favor, inténtelo de nuevo más tarde.' });
        console.error(err);
      },
    });
  }
}
