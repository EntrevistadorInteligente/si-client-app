import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormularioDto } from '@shared/model/formulario-dto';
import { VistaPreviaEntrevistaDto } from '@shared/model/vista-previa-entrevista-dto';
import { FeedbackService } from '@shared/service/feedback.service';
import { IntegradorService } from '@shared/service/integrador.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-paso-2',
  templateUrl: './paso-2.component.html',
  styleUrl: './paso-2.component.scss'
})

export class Paso2Component {

  @Output() formularioCompleto = new EventEmitter<boolean>();
  preguntas!: VistaPreviaEntrevistaDto[];
  form: FormGroup;
  public loading = false;

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
    private integradorService: IntegradorService,
    private feedbackService: FeedbackService
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
    this.loading = true;
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
          this.loading = false;
          Swal.fire({
            title: 'OK',
            text: 'Continue al siguiente paso',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.preguntas = data;
        },
        err => console.log(err)
      );
      localStorage.removeItem('formData');
      this.formularioCompleto.emit(true);
    } else {
      console.log("MAL");
      console.log(this.form);
      this.formularioCompleto.emit(false);
     }
  }

  ngOnDestroy() {
    if (this.form.valid) {
      const formData = JSON.stringify(this.form.value);
      localStorage.setItem('formData', formData);
    }
  }
}
