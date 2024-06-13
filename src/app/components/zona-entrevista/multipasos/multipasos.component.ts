import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-multipasos',
  templateUrl: './multipasos.component.html',
  styleUrls: ['./multipasos.component.scss']
})
export class MultipasosComponent implements OnInit {
  @Input() currentStep: number = 0;
  @Input() idEntrevista: string;

  steps: string[] = ["Formulario", "Preguntas", "Feedback"];

  ngOnInit() {
    // No es necesario inicializar steps aquí ya que se usa directamente en el HTML.
  }

  onStepCompleted() {
    // Lógica para manejar la finalización de un paso
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  getStepClass(stepIndex: number): string {
    if (stepIndex < this.currentStep) {
      return 'done';
    } else if (stepIndex === this.currentStep) {
      return 'current';
    } else {
      return 'disabled';
    }
  }
}