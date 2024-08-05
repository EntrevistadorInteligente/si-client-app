import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { RespuestaComentarioDto } from 'src/app/shared/model/respuesta-dto';
import { EntrevistaService } from 'src/app/shared/services/domain/entrevista.service';
import { FeedbackService } from 'src/app/shared/services/domain/feedback.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';


@Component({
  selector: 'app-paso-3',
  templateUrl: './paso-3.component.html',
  styleUrl: './paso-3.component.scss'
})

export class Paso3Component implements OnInit, OnDestroy {
  @Output() entravistaCompleta = new EventEmitter<boolean>();
  @Input() idEntrevista: string;
  private subscription: Subscription;

  currentIndex: number = 0;
  visible: boolean = false;
  errorMessage: string = '';
 
  constructor(
    private integradorService: FeedbackService,
    private entrevistaStateService: EntrevistaService
  ) { }

  ngOnInit(): void {
    this.subscription = this.entrevistaStateService.respuestas$.subscribe(
      respuestas => {
        this.submitAnswers(respuestas)}
    );
  }

  submitAnswers(respuestas: RespuestaComentarioDto[]) {
    const hasEmptyAnswers = respuestas.some(respuesta => !respuesta.respuesta);
    if (hasEmptyAnswers) {
      this.alert('Campo vacío', 'Debe responder para poder enviar las respuestas', 'warning');
      return;
    }

    this.integradorService.enviarRespuestas(this.idEntrevista, respuestas).subscribe({
      next: (res:any) => {
        this.entravistaCompleta.emit(true);
        this.alert('Éxito', 'Entrevista enviada con éxito, se está generando el feedback', 'success');
      },
      error: (err: any) => {
        console.error('error: ', err);
        
        this.alert('Error', 'Ocurrió un error al enviar la entrevista. Por favor, inténtelo de nuevo más tarde.', 'error');
      },
    });
  }

  alert(title: string, text: string, icon: SweetAlertIcon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'OK'
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}