import { Component, OnInit } from '@angular/core';
import { IntegradorService } from '@shared/service/integrador.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { LoaderService } from '@shared/service/loader.service';
import { catchError, forkJoin, of } from 'rxjs';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-zona-entrevista',
  templateUrl: './zona-entrevista.component.html',
  styleUrl: './zona-entrevista.component.scss'
})

export class ZonaEntrevistaComponent implements OnInit {

  currentStep: number = 0;
  idEntrevista: string;
  isLoading: boolean;

  constructor(private route: ActivatedRoute, 
              private entrevistaService: IntegradorService, 
              private router: Router,
              private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
    this.route.params.subscribe(params => {
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
      next: (response) => this.currentStep = this.getStepFromEstado(response.estadoEntrevista),
      error: (error) => console.error(error)
    });
  }

  validarEstadoUsuario() {
    forkJoin({
      hojaDeVida: this.entrevistaService.obtenerHojaDeVida().pipe(catchError(error => of(null))),
      estadoEntrevista: this.entrevistaService.obtenerEstadoEntrevistaPorUsuario().pipe(catchError(error => of(null)))
    }).subscribe(({ hojaDeVida, estadoEntrevista }) => {
      if (hojaDeVida && hojaDeVida.uuid) {
        if (estadoEntrevista) {
          this.currentStep = this.getStepFromEstado(estadoEntrevista.estadoEntrevista);
          this.idEntrevista = estadoEntrevista.idEntrevista;
        } else {
          this.loaderService.hide();
          // Manejar aquí un modal para aceptar que ya tienen una entrevista en proceso
        }
      } else {
        this.alertConfirm('Alto', 'Debes cargar una hoja de vida para continuar', 'warning');
      }
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
          this.currentStep = this.getStepFromEstado(response.estadoEntrevista);
          this.idEntrevista = response.idEntrevista;
        }
        else {
          this.loaderService.hide();
          //manjear aqui un modal para aceptar que ya tienen una entrevista en proceso   
        } 
      },
      error: (error) => console.error(error)
    });
  }

  getStepFromEstado(estado: string): number {
    switch (estado) {
      case 'PG': return 1;
      case 'FG': return 2;
      default: return 0;
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
        this.router.navigate(['perfil']);
      }
    });
  }

}
