import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntegradorService } from '@shared/service/integrador.service';

@Component({
  selector: 'app-multipasos',
  templateUrl: './multipasos.component.html',
  styleUrls: ['./multipasos.component.scss']
})
export class MultipasosComponent implements OnInit {
  @Input() currentStep: number = 2;
  steps = [
    { title: 'Formulario', component: 'app-paso-2' },
    { title: 'Preguntas', component: 'app-paso-3' },
    { title: 'Feedback', component: 'app-paso-4' }
  ];

  ngOnInit() {}

  onStepCompleted() {
    // Lógica para manejar la finalización de un paso
  }

}