import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormularioDto } from '@shared/model/formulario-dto';
import { VistaPreviaEntrevistaDto } from '@shared/model/vista-previa-entrevista-dto';
import { FeedbackService } from '@shared/service/feedback.service';
import { IntegradorService } from '@shared/service/integrador.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { LoaderService } from '@shared/service/loader.service';

@Component({
  selector: 'app-paso-2',
  templateUrl: './paso-2.component.html',
  styleUrl: './paso-2.component.scss'
})

export class Paso2Component {

  @Output() formularioCompleto = new EventEmitter<boolean>();
  preguntas!: VistaPreviaEntrevistaDto[];
  form: FormGroup;
  public loading = true;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  isLoading: boolean;

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
    private feedbackService: FeedbackService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loaderService.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
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
    this.loaderService.show();   
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
          this.loaderService.hide();          
        },
        err => {
          this.loaderService.hide();
          switch (err.error.codigo) {
            case 'E001':
              this.alert('Error', 'No se pueden generar más entrevistas.', 'error');
              break;
            case 'E002':
              this.alert('Error', 'El usuario tiene una entrevista en proceso.', 'error');
              break;
            case 'E500':
              this.alert('Error', 'Por favor póngase en contacto con el administrador.', 'error');
              break;
            default:
      
              break;
          }
        }          
      );
      localStorage.removeItem('formData');
      this.formularioCompleto.emit(true);
    } else {
      this.formularioCompleto.emit(false);
     }
  }

  alert(title: string, text: string, icon: SweetAlertIcon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'Ok'
    })
  }

  ngOnDestroy() {
    if (this.form.valid) {
      const formData = JSON.stringify(this.form.value);
      localStorage.setItem('formData', formData);
    }
  }
}
