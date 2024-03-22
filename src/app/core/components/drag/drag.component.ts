import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrl: './drag.component.scss'
})

export class DragComponent implements OnInit {

  selectedFiles: File[] = [];

  constructor( private http: HttpClient ) { }

  ngOnInit(): void { }

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

  uploadFile(): void {
    console.log('Subiendo archivos:', this.selectedFiles);
    // Aquí deberías implementar la lógica para subir los archivos al servidor
  }

}
