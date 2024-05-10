import { Component } from '@angular/core';

@Component({
  selector: 'app-multipasos',
  templateUrl: './multipasos.component.html',
  styleUrls: ['./multipasos.component.scss']
})

export class MultipasosComponent {

  currentStep: number = 1;
  formValido: boolean = false;
  archivoCargado: boolean = false;
  puedeContinuarPaso2: boolean = false;
  puedeContinuarPaso3: boolean = false;
  puedeContinuarPaso4: boolean = false;

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

  puedeContinuar(event: boolean): void {
    this.puedeContinuarPaso2 = event;
  }

  suArchivoCargado(estado: boolean): void {
    this.archivoCargado = estado;
  }

  formularioCompleto(completo: boolean): void {
    this.puedeContinuarPaso3 = completo;
  }

  entrevistaCompletada(): boolean {
    return this.puedeContinuarPaso3;
  }
}
