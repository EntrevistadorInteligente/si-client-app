import { Component, Input, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/shared/services/domain/feedback.service';
import Swal from 'sweetalert2';
import { IntegradorService } from 'src/app/shared/services/domain/integrador.service';
import { FeedbackComentarioDto } from 'src/app/shared/model/feedback-dto';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-paso-4',
  templateUrl: './paso-4.component.html',
  styleUrl: './paso-4.component.scss',
})
export class Paso4Component implements OnInit {
  public isCollapsed = true;

  @Input() idEntrevista: string;
  feedbackItems: FeedbackComentarioDto[] = [];

  optionsCustom: OwlOptions = {
    items: 1,
    loop: true,
    margin: 30,
    autoWidth: true,
    autoHeight: true,
    stagePadding: 50,
    nav: true,
    navText: [
      `<i class='icofont icofont-curved-left'></i>`,
      `<i class='icofont icofont-curved-right'></i>`,
    ],
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  constructor(
    private feedbackService: FeedbackService,
    private integradorService: IntegradorService
  ) {}

  ngOnInit(): void {
    this.obtenerFeedback(this.idEntrevista);
  }

  obtenerFeedback(entrevistaId: string): void {
    this.feedbackService.obtenerFeedback(entrevistaId).subscribe({
      next: (feedback: FeedbackComentarioDto[]) => {
        this.feedbackItems = feedback;
      },
      error: error => {
        console.error(error);
      },
    });
  }

  withFeedback() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
        input: 'placeholder-color',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Terminar entrevista',
        text: '¡Una vez terminada, no podrás ver el feedback tu entrevista en proceso nuevamente e iniciarás una nueva entrevista!. Por favor danos tu feedback sobre el proceso de preparación de la entrevista, esto nos ayudará a mejorar nuestra aplicación. Tu opinión es muy importante para nosotros',
        input: 'textarea',
        showCancelButton: true,
        confirmButtonText: 'Terminar entrevista',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          const feedback = result.value || '';
          this.integradorService
            .terminarEntrevistaEnCurso(this.idEntrevista, feedback)
            .subscribe({
              next: response => {
                if (response) {
                  swalWithBootstrapButtons
                    .fire(
                      'Entrevista terminada!',
                      'Gracias por tu feedback. Ahora puedes generar una nueva entrevista.',
                      'success'
                    )
                    .then(() => {
                      window.location.reload();
                    });
                }
              },
              error: error => {
                console.error(error);
                swalWithBootstrapButtons.fire(
                  'Error',
                  'Hubo un problema al terminar la entrevista.',
                  'error'
                );
              },
            });
        }
      });
  }
}
