import { Component, HostListener, Input, OnInit } from '@angular/core';
import { VistaPreviaEntrevistaDto } from '@shared/model/vista-previa-entrevista-dto';
import { DarkModeService } from '@shared/service/dark-mode.service';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrl: './home-login.component.scss'
})

export class HomeLoginComponent implements OnInit {

  preguntas!: VistaPreviaEntrevistaDto[];
  selectedProduct!: any;
  selectedFiles: File[] = [];
  isCardVisible = false;

  cards = [
    { image: 'assets/img/robot-1.jpg', text: 'En tu perfil sube tu CV, este será análizado por la IA, y nos dara la información necesaria.' },
    { image: 'assets/img/robot-2.jpg', text: 'Completa los campos del formulario con la información correspondiente de la vacante.' },
    { image: 'assets/img/robot-3.jpg', text: 'Una vez hayas completado el formulario serás redirigido a una simulación de entrevista.' },
    { image: 'assets/img/robot-4.jpg', text: 'Cuando hayas completado la entrevista te vamos a hacer un Feedback.' }
  ];

  constructor(public darkModeService: DarkModeService) { }

  ngOnInit() { }

  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    this.handleFiles(files);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files: FileList = event.dataTransfer.files;
    this.handleFiles(files);
  }

  handleFiles(files: FileList): void {
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkIfVisible(event: any) {
    const windowHeight = window.innerHeight;
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      const positionFromTop = card.getBoundingClientRect().top;
      if (positionFromTop - windowHeight <= 0) {
        this.isCardVisible = true;
      }
    });
  }
}
