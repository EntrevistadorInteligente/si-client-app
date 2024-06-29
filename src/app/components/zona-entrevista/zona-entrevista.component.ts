import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { InterviewState } from 'src/app/shared/model/interview-state';
import { IntegradorService } from 'src/app/shared/services/domain/integrador.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-zona-entrevista',
  templateUrl: './zona-entrevista.component.html',
  styleUrl: './zona-entrevista.component.scss'
})
export class ZonaEntrevistaComponent implements OnInit {

  currentStep: number = 0;
  idEntrevista: string;
  isLoading: boolean;
  isIntermediate: boolean = false;
  loadingMessage: string = '';

  constructor(private route: ActivatedRoute, 
              private entrevistaService: IntegradorService, 
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: { [x: string]: string; }) => {
      this.idEntrevista = params['idEntrevista'];
      if (this.idEntrevista) {
        this.obtenerEstadoEntrevistaPorId(this.idEntrevista);
      } else {
        this.validarEstadoUsuario();
      }
    });
  }

  obtenerEstadoEntrevistaPorId(idEntrevista: string) {
    this.entrevistaService.obtenerEstadoEntrevista(idEntrevista).subscribe({
      next: (response) => {
        const estado = this.getStepFromEstado(response.estadoEntrevista);
        this.currentStep = estado.step;
        this.isIntermediate = estado.isIntermediate;
        this.loadingMessage = estado.loadingMessage;
      },
      error: (error) => console.error(error)
    });
  }

  validarEstadoUsuario() {
    forkJoin({
      hojaDeVida: this.entrevistaService.obtenerHojaDeVida().pipe(catchError(error => of(null))),
      estadoEntrevista: this.entrevistaService.obtenerEstadoEntrevistaPorUsuario().pipe(catchError(error => of(null)))
    }).subscribe(({ hojaDeVida, estadoEntrevista }) => {
      if (hojaDeVida?.uuid) {
        if (estadoEntrevista) {
          const estado = this.getStepFromEstado(estadoEntrevista.estadoEntrevista);
          this.currentStep = estado.step;
          this.isIntermediate = estado.isIntermediate;
          this.loadingMessage = estado.loadingMessage;
          this.idEntrevista = estadoEntrevista.idEntrevista;
        }
      } else {
        this.alertConfirm('Alto', 'Debes cargar una hoja de vida para continuar', 'warning');
      }
      this.isLoading = false;
    }, (error) => this.handleError(error));
  }

  handleError(error: any) {
    console.error(error);
    // Aquí puedes manejar los errores de manera global, mostrar notificaciones, etc.
  }

  obtenerEstadoEntrevistaPorUsuario() {    
    this.entrevistaService.obtenerEstadoEntrevistaPorUsuario().subscribe({
      next: (response) => {          
        if(response){
          const estado = this.getStepFromEstado(response.estadoEntrevista);
          this.currentStep = estado.step;
          this.isIntermediate = estado.isIntermediate;
          this.loadingMessage = estado.loadingMessage;
          this.idEntrevista = response.idEntrevista;
        }
      },
      error: (error) => console.error(error)
    });
  }


  getStepFromEstado(estado: string): InterviewState {
    switch (estado) {
      case 'PG':
        return new InterviewState(1, false, '');
      case 'FG':
        return new InterviewState(2, false, '');
      case 'GP':
        return new InterviewState(1, true, 'Estamos generando tu entrevista... por favor esta a tento a las notificaciones');
      case 'GF':
        return new InterviewState(2, true, 'Estamos generando el feedback... por favor esta a tento a las notificaciones');
      default:
        return new InterviewState(0, false, '');
    }
  }
  alertConfirm(title: string, text: string, icon: SweetAlertIcon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      allowOutsideClick: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cargar hoja de vida"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/es/entrevistas/perfil']);
      }
    });
  }

}
