import { Component, OnInit } from '@angular/core';
import { IntegradorService } from '@shared/service/integrador.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private entrevistaService: IntegradorService) { }

  ngOnInit() {
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
}
