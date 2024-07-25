import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FeedbackService } from 'src/app/shared/services/domain/feedback.service';
import Swal from 'sweetalert2';
import { IntegradorService } from 'src/app/shared/services/domain/integrador.service';
import { FeedbackComentarioDto } from 'src/app/shared/model/feedback-dto';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselService } from 'ngx-owl-carousel-o/lib/services/carousel.service';

@Component({
  selector: 'app-paso-4',
  templateUrl: './paso-4.component.html',
  styleUrl: './paso-4.component.scss',
})
export class Paso4Component implements OnInit {
  public isCollapsed = true;
  // @ViewChildren('carousel')
  // public carousel: QueryList<CarouselComponent>;
  // @ViewChild('carouselContainer')
  // public carouselContainer: ElementRef;

  // private resizeObserver: ResizeObserver;

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
      "<i class='icofont icofont-curved-left'></i>",
      "<i class='icofont icofont-curved-right'></i>",
    ],
    responsive: {
      0: {
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
        //this.animateCarousel();
      },
      error: error => {
        console.error(error);
      },
    });
  }

  // ngAfterViewInit(): void {
  //   this.resizeObserver = new ResizeObserver(entries => {
  //     for (let entry of entries) {
  //       if (entry.target === this.carouselContainer.nativeElement) {
  //         this.refreshCarousel();
  //       }
  //     }
  //   });

  //   this.resizeObserver.observe(this.carouselContainer.nativeElement);
  // }

  // ngOnDestroy(): void {
  //   if (this.resizeObserver) {
  //     this.resizeObserver.disconnect();
  //   }
  // }

  // refreshCarousel(): void {
  //   setTimeout(() => {
  //     this.carousel.forEach(c => {
  //       const anyService = c as any;
  //       const carouselService = anyService.carouselService as CarouselService;
  //       console.log('resize owl');
  //       carouselService.refresh();
  //     });
  //   }, 200);
  //   console.log('resize');
  // }

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
