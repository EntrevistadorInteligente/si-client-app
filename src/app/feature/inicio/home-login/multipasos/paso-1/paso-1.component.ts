import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HojaDeVidaDto } from '@shared/model/hoja-de-vida-dto';
import { IntegradorService } from '@shared/service/integrador.service';

@Component({
  selector: 'app-paso-1',
  templateUrl: './paso-1.component.html',
  styleUrl: './paso-1.component.scss'
})

export class Paso1Component implements OnInit {

  archivoCargado: boolean;
  puedeContinuar: boolean;
  file: File;
  fileError: boolean = false;
  load: boolean = false;

  @Output() puedeContinuarChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private integradorService: IntegradorService) { }

  ngOnInit() {
    this.verificarHojaDeVida();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const file: File = event.dataTransfer.files[0];

    this.handleFiles(file);
  }

  verificarHojaDeVida() {
    this.load = true;

    setTimeout(() => {
      this.integradorService.obtenerHojaDeVida().subscribe(
        (hojaDeVida: HojaDeVidaDto) => {
          if (hojaDeVida && hojaDeVida.archivo) {
            this.archivoCargado = true;
            this.verificarPuedeContinuar();
          } else {
            this.archivoCargado = false;
            this.puedeContinuar = false;
          }
          this.load = false;
        },
        error => {
          console.error('Error al obtener la hoja de vida:', error);
          this.load = false;
        }
      );
    }, 3000);
  }

  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    this.handleFiles(file);
  }

  handleFiles(file: File): void {
    this.file = file;
  }

  handleClickCargar(): void {
    if (this.file) {
      this.load = true;
      this.integradorService.cargarHojaDeVida(this.file).subscribe({
        next: event => {
          console.log(event);
          this.archivoCargado = true;
          this.puedeContinuar = true;
          this.load = false;
          this.verificarPuedeContinuar();
        },
        error: error => {
          console.error(error);
          this.fileError = true;
          this.load = false;
        }
      });
    }
  }

  verificarPuedeContinuar(): void {
    if (this.archivoCargado) {
      this.puedeContinuar = true;
    } else {
      this.puedeContinuar = false;
    }
    this.puedeContinuarChanged.emit(this.puedeContinuar);
  }
}
