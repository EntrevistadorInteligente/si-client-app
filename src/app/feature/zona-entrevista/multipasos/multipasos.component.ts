import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntegradorService } from '@shared/service/integrador.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-multipasos',
  templateUrl: './multipasos.component.html',
  styleUrls: ['./multipasos.component.scss']
})
export class MultipasosComponent implements OnInit {
  @Input() currentStep: number = 0;
  @Input() idEntrevista: string;
  steps : MenuItem[];
  
  ngOnInit() {
    this.steps  = [ 
      { label: "Formulario" }, 
      { label: "Preguntas" }, 
      { label: "Feedback" }, 
    ];
  }

  onStepCompleted() {
    // Lógica para manejar la finalización de un paso
  }

}