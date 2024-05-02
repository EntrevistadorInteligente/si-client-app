import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-multipasos',
  templateUrl: './multipasos.component.html',
  styleUrls: ['./multipasos.component.scss']
})

export class MultipasosComponent {

  currentStep: number = 1;

  calculateProgress(): number {
    return (this.currentStep / 4) * 100;
  }

  onStepCompleted() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
