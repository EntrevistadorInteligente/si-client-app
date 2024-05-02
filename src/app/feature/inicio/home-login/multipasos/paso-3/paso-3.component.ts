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
    console.log(this.feedback.procesoEntrevista)
    let esValido = false;

    this.feedback.procesoEntrevista.forEach(element => {

      if (!element.respuesta) {

        this.feedback.procesoEntrevista.forEach(element => {

          if (!element.respuesta) {

            this.visible = true;

          } else {
            esValido = true
          }

        });
        if (esValido) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Entrevista enviada con exito, estaremos generando su feedbak en un momento' });
          this.feedbackService.crearSolicitudFeedback(this.feedback).subscribe({
            next: () => {
            },
            error: (err: any) => {
              console.log(err);
            },
          });
        }
      }
    });
  }
}
