import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntegradorService } from '@shared/service/integrador.service';

@Component({
  selector: 'app-multipasos',
  templateUrl: './multipasos.component.html',
  styleUrls: ['./multipasos.component.scss']
})
export class MultipasosComponent implements OnInit {

  currentStep: number = 2;
  steps = [
    { title: 'Formulario' },
    { title: 'Preguntas'},
    { title: 'Feedback'}
  ];

  constructor(private route: ActivatedRoute, private entrevistaService: IntegradorService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idEntrevista = params['idEntrevista'];
      if (idEntrevista) {

      }
  
    });

    this.entrevistaService.obtenerEstadoEntrevistaPorUsuario().subscribe(
      (estado) => {
        this.currentStep = this.getStepFromEstado(estado.estadoEntrevista);
      },
      error => {
        console.error(error);
      }
    );
  }

  getStepFromEstado(estado: string): number {
    switch (estado) {
      case 'PG':
        return 3;
      case 'FG':
        return 4;
      default:
        return 2;
    }
  }

}