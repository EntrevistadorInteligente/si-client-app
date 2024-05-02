import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormularioDto } from '@shared/model/formulario-dto';
import { VistaPreviaEntrevistaDto } from '@shared/model/vista-previa-entrevista-dto';
import { IntegradorService } from '@shared/service/integrador.service';

@Component({
  selector: 'app-paso-2',
  templateUrl: './paso-2.component.html',
  styleUrl: './paso-2.component.scss'
})

export class Paso2Component {

  @Output() completed = new EventEmitter<void>();
  preguntas!: VistaPreviaEntrevistaDto[];
  form: FormGroup;

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

  constructor(private fb: FormBuilder,
    private integradorService: IntegradorService
  ) { }

  ngOnInit() {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      this.form = this.fb.group(formData);
    } else {
      this.form = this.fb.group({
        empresa: ['', Validators.required],
        perfil: ['', Validators.required],
        seniority: ['', Validators.required],
        pais: ['', Validators.required],
        descripcionVacante: ['', Validators.required]
      });
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
      localStorage.removeItem('formData');
      this.completed.emit();
    } else {
      console.log("MAL")
      console.log(this.form)
    }
  }

  ngOnDestroy() {
    if (this.form.valid) {
      const formData = JSON.stringify(this.form.value);
      localStorage.setItem('formData', formData);
    }
  }
}
