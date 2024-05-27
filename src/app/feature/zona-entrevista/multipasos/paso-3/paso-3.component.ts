import { Component, Input, OnInit } from '@angular/core';
import { PreguntaComentarioDto } from '@shared/model/pregunta-comentario-dto';
import { RespuestaComentarioDto, RespuestaDto } from '@shared/model/respuesta-dto';
import { FeedbackService } from '@shared/service/feedback.service';
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
  @Input() idEntrevista: string;
  preguntas: PreguntaComentarioDto[] = [];
  respuestas: RespuestaComentarioDto[] = [];
  currentIndex: number = 0;
  visible: boolean = false;

  constructor(
    private integradorService: FeedbackService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerPreguntas(this.idEntrevista);
  }

  get currentQuestion(): PreguntaComentarioDto {
    return this.preguntas[this.currentIndex];
  }

  get progressValue(): number {
    return (this.currentIndex + 1) / this.preguntas.length * 100;
  }

  previousQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextQuestion() {
    if (this.currentIndex < this.preguntas.length - 1) {
      this.currentIndex++;
    }
  }

  obtenerPreguntas(entrevistaId: string): void {
    this.integradorService.obtenerPreguntas(entrevistaId).subscribe({
      next: preguntas => {
        this.preguntas = preguntas;
        this.respuestas = preguntas.map(p => {
          const respuestaDto: RespuestaComentarioDto = {
            idPregunta: p.idPregunta,
            respuesta: ''
          };
          return respuestaDto;
        });
      },
      error: error => {
        console.error(error);
      }
    });
  }

  submitAnswers() {
    const hasEmptyAnswers = this.respuestas.some(respuesta => !respuesta.respuesta);
    if (hasEmptyAnswers) {
      this.visible = true;
      return;
    }

    this.integradorService.enviarRespuestas(this.idEntrevista, this.respuestas).subscribe({
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