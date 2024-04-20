import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioDto } from '@shared/model/formulario-dto';
import { VistaPreviaEntrevistaDto } from '@shared/model/vista-previa-entrevista-dto';
import { IntegradorService } from '@shared/service/integrador.service';
import { HttpClient } from '@angular/common/http';
import { DarkModeService } from '@shared/service/dark-mode.service';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrl: './home-login.component.scss'
})

export class HomeLoginComponent implements OnInit {

  preguntas!: VistaPreviaEntrevistaDto[];
  selectedProduct!: any;
  form: FormGroup;
  selectedFiles: File[] = [];

  paises: any[] = [
    { "nombre": "Argentina" },
    { "nombre": "Bolivia" },
    { "nombre": "Brasil" },
    { "nombre": "Chile" },
    { "nombre": "Colombia" },
    { "nombre": "Costa Rica" },
    { "nombre": "Cuba" },
    { "nombre": "Ecuador" },
    { "nombre": "El Salvador" },
    { "nombre": "Guatemala" },
    { "nombre": "Honduras" },
    { "nombre": "México" },
    { "nombre": "Nicaragua" },
    { "nombre": "Panamá" },
    { "nombre": "Paraguay" },
    { "nombre": "Perú" },
    { "nombre": "República Dominicana" },
    { "nombre": "Uruguay" },
    { "nombre": "Venezuela" }
  ];

  constructor(
    private http: HttpClient,
    private integradorService: IntegradorService,
    private fb: FormBuilder,
    public darkModeService: DarkModeService) { }

  ngOnInit() {
    this.form = this.fb.group({
      empresa: ['', Validators.required],
      perfil: ['', Validators.required],
      seniority: ['', Validators.required],
      pais: ['', Validators.required],
      descripcionVacante: ['', Validators.required]
    });
  }

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

  submit(): void {
    if (this.form.valid) {
      const formulario: FormularioDto = {
        empresa: this.form.value.empresa,
        perfil: this.form.value.perfil,
        seniority: this.form.value.seniority,
        pais: this.form.value.pais,
        descripcionVacante: this.form.value.descripcionVacante
      };
      this.integradorService.crearSolicitudEntrevista(formulario).subscribe(
          data => {
            this.preguntas = data;
          },
          err => console.log(err)
        );
    } else {
      console.log("MAL")
      console.log(this.form)
    }
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
