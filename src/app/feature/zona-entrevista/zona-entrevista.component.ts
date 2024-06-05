import { Component, OnInit } from '@angular/core';
import { IntegradorService } from '@shared/service/integrador.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { LoaderService } from '@shared/service/loader.service';

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

  currentStep: number = 2;
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
        this.obtenerEstadoEntrevistaPorUsuario();
      }
    });
  }

  obtenerEstadoEntrevistaPorId(idEntrevista: string) {
    this.entrevistaService.obtenerEstadoEntrevista(idEntrevista).subscribe({
      next: (response) => this.currentStep = this.getStepFromEstado(response.estadoEntrevista),
      error: (error) => console.error(error)
    });
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
          this.alertConfirm('Alto', 'Debes cargar una hoja de vida para continuar', 'warning');
        } 
      },
      error: (error) => console.error(error)
    });
  }

  getStepFromEstado(estado: string): number {
    switch (estado) {
      case 'PG': return 3;
      case 'FG': return 4;
      default: return 2;
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
