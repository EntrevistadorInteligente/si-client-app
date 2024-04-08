import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioDto } from '@shared/model/formulario-dto';
import { VistaPreviaEntrevistaDto } from '@shared/model/vista-previa-entrevista-dto';
import { IntegradorService } from '@shared/service/integrador.service';

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
  message: string = 'Bienvenid@ al Entrevistador Inteligente';

  constructor(private integradorService: IntegradorService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      empresa: ['', Validators.required],
      perfil: ['', Validators.required],
      seniority: ['', Validators.required],
      pais: ['', Validators.required]
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
    if (this.form.valid && this.selectedFiles.length > 0) {
      const formulario: FormularioDto = {
        empresa: this.form.value.empresa,
        perfil: this.form.value.perfil,
        seniority: this.form.value.seniority,
        pais: this.form.value.pais
      };
      this.integradorService.crearSolicitudEntrevista(this.selectedFiles[0],
        formulario).subscribe(
          data => {
            this.preguntas = data;
          },
          err => console.log(err)
        );
    } else {
      console.log("MAL")
      console.log(this.form)
      console.log(this.selectedFiles)
    }
  }
}
