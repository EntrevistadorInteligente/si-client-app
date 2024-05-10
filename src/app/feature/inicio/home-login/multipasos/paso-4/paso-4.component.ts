import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedbackDto } from '@shared/model/feedback-dto';
import { FeedbackService } from '@shared/service/feedback.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-paso-4',
  templateUrl: './paso-4.component.html',
  styleUrl: './paso-4.component.scss'
})

export class Paso4Component implements OnInit {

  @ViewChild('myModal') myModal: any;
  modalMessage: string = '';
  feedback: FeedbackDto = new FeedbackDto('', []);

  constructor(
    private feedbackService: FeedbackService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void { }

  verificarFeedback(): void {
    let esValido = this.feedback.procesoEntrevista.every(pregunta => pregunta.respuesta !== null && pregunta.respuesta !== '');
    if (esValido) {
      this.feedbackService.crearSolicitudFeedback(this.feedback).subscribe(
        () => {
          this.modalMessage = 'Feedback enviado con éxito.';
          this.myModal.show();
        },
        (error) => {
          console.error('Error al enviar el feedback:', error);
          this.modalMessage = 'Error al enviar el feedback.';
          this.myModal.show();
        }
      );
    } else {
      this.modalMessage = 'Por favor, complete todas las respuestas.';
      this.myModal.show();
    }
  }

  cerrarModal(): void {
    this.myModal.hide();
  }
}
