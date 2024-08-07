import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { InterviewState } from 'src/app/shared/model/interview-state';

const WAITING_ZONE = 3;

@Component({
  selector: 'app-multipasos',
  templateUrl: './multipasos.component.html',
  styleUrls: ['./multipasos.component.scss']
})
export class MultipasosComponent implements OnInit {
  @Input() currentStep: number = 0;
  @Input() idEntrevista: string;
  @Input() isIntermediate: boolean = false;
  @Input() loadingMessage: string = '';

  steps: string[] = ["Formulario", "Preguntas", "Feedback"];

  ngOnInit() {
  }

  onStepCompleted() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  onFormCompleted() {
    this.isIntermediate = true;
    this.loadingMessage = 'Estamos generando tu entrevista... por favor, mantente atento a las notificaciones.';
  }

  onInterviewCompleted() {
    this.isIntermediate = true;
    this.loadingMessage = 'Estamos generando tu feedback... por favor, mantente atento a las notificaciones.';
  }


  

  getStepClass(stepIndex: number): string {
    if (stepIndex < this.currentStep) {
      return 'done';
    } else if (stepIndex === this.currentStep && !this.isIntermediate) {
      return 'current';
    } else {
      return 'disabled';
    }
  }
}