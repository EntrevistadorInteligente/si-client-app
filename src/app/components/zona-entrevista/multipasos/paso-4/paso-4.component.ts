import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FeedbackService } from 'src/app/shared/services/domain/feedback.service';
import * as data from '../../../../shared/data/animation/ribbons';
import Swal from 'sweetalert2';
import { IntegradorService } from 'src/app/shared/services/domain/integrador.service';

@Component({
  selector: 'app-paso-4',
  templateUrl: './paso-4.component.html',
  styleUrl: './paso-4.component.scss'
})

export class Paso4Component implements OnInit {

  @ViewChild('divpregunta') divpregunta!: ElementRef;
  @ViewChild('pfeedback') pfeedback!: ElementRef;

  public ribbon = data.ribbons
  public ribbonColor = data.ribbonColor
  @Input() idEntrevista: string;
  feedbackItems: any[] = [];
  paginationSide = "center";
  currentIndex: number = 0;
  pageSize: number = 1;
  maxPagesToShow: number = 5;
  isVisibleAnswer: boolean = false;

  constructor(private feedbackService: FeedbackService,
    private integradorService: IntegradorService) { }

  ngOnInit(): void {
    this.obtenerFeedback(this.idEntrevista);
    this.adjustMargin();
  }

  get currentFeedback() {
    return this.feedbackItems.slice(this.currentIndex, this.currentIndex + this.pageSize);
  }

  obtenerFeedback(entrevistaId: string): void {
    this.feedbackService.obtenerFeedback(entrevistaId).subscribe({
      next: feedback => {
        this.feedbackItems = feedback;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  changePage(index: number): void {
    if (index >= 0 && index < this.totalPages) {
      this.currentIndex = index;
    }
    this.adjustMargin();
  }

  get totalPages(): number {
    return Math.ceil(this.feedbackItems.length / this.pageSize);
  }

  get pages(): number[] {
    const half = Math.floor(this.maxPagesToShow / 2);
    let start = Math.max(0, this.currentIndex - half);
    let end = Math.min(this.totalPages, start + this.maxPagesToShow);

    if (end - start < this.maxPagesToShow) {
      start = Math.max(0, end - this.maxPagesToShow);
    }

    return Array.from({ length: end - start }, (_, i) => start + i + 1);
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustMargin();
  }

  private adjustMargin() {
    setTimeout(() => {
      const containerHeight = this.divpregunta.nativeElement.offsetHeight;
      const screenWidth = window.innerWidth;

      this.pfeedback.nativeElement.style.marginTop = screenWidth <= 400 ? `${containerHeight / 2.7}%` : `${containerHeight / 2}px`;

    }, 400);
  }

  mostrarRespuestas() {
    this.isVisibleAnswer = !this.isVisibleAnswer;
  }

  withCancelled() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: "¡Una vez terminada, no podrás ver este feedback e iniciarás una nueva entrevista!",
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result: any) => {
      if (result.value) {
        // Llama al servicio y luego refresca la pantalla
        this.integradorService.terminarEntrevistaEnCurso(this.idEntrevista).subscribe({
          next: (response) => {
            if (response) {
              swalWithBootstrapButtons.fire(
                'Terminada!',
                'Ahora puedes generar una nueva entrevista.',
                'success'
              ).then(() => {
                window.location.reload();
              });
              }
          },
          error: (error) => {
            console.error(error)
            swalWithBootstrapButtons.fire(
              'Error',
              'Hubo un problema al terminar la entrevista.',
              'error'
            );
          
          } 
          
        });
        
      }
    });
  }
}