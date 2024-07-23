import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { FeedbackService } from 'src/app/shared/services/domain/feedback.service';
import * as data from '../../../../shared/data/animation/ribbons';
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
  @ViewChildren('divpregunta') ribbons: QueryList<ElementRef>;
  @ViewChildren('pfeedback') feedbacks: QueryList<ElementRef>;
  public ribbon = data.ribbons;
  public ribbonColor = data.ribbonColor;
  public isCollapsed = true;

  @Input() idEntrevista: string;
  feedbackItems: FeedbackComentarioDto[] = [];
  paginationSide = 'center';
  currentIndex: number = 0;
  pageSize: number = 1;
  maxPagesToShow: number = 5;
  isVisibleAnswer: boolean = false;

  optionsCustom: OwlOptions = {
    items: 1,
    loop: true,
    margin: 10,
    autoWidth: true,
    autoHeight: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  constructor(
    private feedbackService: FeedbackService,
    private integradorService: IntegradorService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.obtenerFeedback(this.idEntrevista);
  }

  animateCarousel(): void {
    setTimeout(() => {
      const owlStage = document.querySelector('.owl-stage');
      if (owlStage) {
        const parentElement = owlStage.parentElement;
        if (parentElement) {
          this.renderer.setStyle(
            parentElement,
            'transition',
            'transform 0.7s ease-in-out'
          );
          this.renderer.setStyle(
            parentElement,
            'transform',
            'translate3d(-100px, 0, 0)'
          );

          setTimeout(() => {
            this.renderer.setStyle(
              parentElement,
              'transform',
              'translate3d(0, 0, 0)'
            );
          }, 400);

          setTimeout(() => {
            this.renderer.removeStyle(parentElement, 'transform');
          }, 300); // Additional delay to remove the transform style
        } else {
          console.error('Parent of owl-stage not found');
        }
      } else {
        console.error('Owl stage not found');
      }
    }, 0); // Adjust this timeout if necessary
  }

  obtenerFeedback(entrevistaId: string): void {
    this.feedbackService.obtenerFeedback(entrevistaId).subscribe({
      next: (feedback: FeedbackComentarioDto[]) => {
        this.feedbackItems = feedback;
        console.log('feedback', this.feedbackItems);
        this.adjustMargin();
        this.animateCarousel();
      },
      error: error => {
        console.error(error);
      },
    });
  }

  ngAfterViewInit() {}

  @HostListener('window:resize')
  onResize() {
    this.adjustMargin();
  }

  private adjustMargin() {
    setTimeout(() => {
      const screenWidth = window.innerWidth;

      this.ribbons.forEach((divpregunta, index) => {
        const containerHeight = divpregunta.nativeElement.offsetHeight;
        const pfeedback = this.feedbacks.toArray()[index];

        if (pfeedback) {
          pfeedback.nativeElement.style.marginTop = `${containerHeight}px`;
        }
      });
    }, 400);
  }

  mostrarRespuestas() {
    this.isVisibleAnswer = !this.isVisibleAnswer;
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
        text: '¡Una vez terminada, no podrás ver el feedback tu entrevista en proceso nuevamente e iniciarás una nueva entrevista!',
        input: 'textarea',
        inputPlaceholder:
          'Por favor danos tu feedback sobre el proceso de preparación de la entrevista, esto nos ayudará a mejorar nuestra aplicación. Tu opinión es muy importante para nosotros (opcional)',
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
