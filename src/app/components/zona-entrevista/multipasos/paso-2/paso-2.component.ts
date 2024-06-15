import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { VistaPreviaEntrevistaDto } from 'src/app/shared/model/vista-previa-entrevista-dto';
import { IntegradorService } from 'src/app/shared/services/domain/integrador.service';
import { LoaderService } from 'src/app/shared/services/domain/loader.service';
import { PaisService } from 'src/app/shared/services/domain/pais.service';
import { FormularioDto } from 'src/app/shared/model/formulario-dto';

@Component({
  selector: 'app-paso-2',
  templateUrl: './paso-2.component.html',
  styleUrls: ['./paso-2.component.scss']
})
export class Paso2Component {

  @Output() formularioCompleto = new EventEmitter<boolean>();
  preguntas!: VistaPreviaEntrevistaDto[];
  form: FormGroup;
  public loading = true;
  isLoading: boolean;

  paises: any[] = [
    { nombre: "Argentina" },
    { nombre: "Bolivia" },
    { nombre: "Brasil" },
    { nombre: "Chile" },
    { nombre: "Colombia" },
    { nombre: "Costa Rica" },
    { nombre: "Cuba" },
    { nombre: "Ecuador" },
    { nombre: "El Salvador" },
    { nombre: "Guatemala" },
    { nombre: "Honduras" },
    { nombre: "México" },
    { nombre: "Nicaragua" },
    { nombre: "Panamá" },
    { nombre: "Paraguay" },
    { nombre: "Perú" },
    { nombre: "República Dominicana" },
    { nombre: "Uruguay" },
    { nombre: "Venezuela" }
  ];

  constructor(private fb: FormBuilder,
              private integradorService: IntegradorService,
              private loaderService: LoaderService,
              private paisService: PaisService) { }

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
          this.alert('Éxito', 'Solicitud entrevista enviada con éxito, se está generando tu entrevista', 'success');   
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

  loadCountries() {
    this.paisService.getCountries().subscribe(data => {
      this.paises = data.map(country => ({
        name: country.name.common,
        code: country.cca2
      }));
    });
  }

  alert(title: string, text: string, icon: SweetAlertIcon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'Ok'
    });
  }

  ngOnDestroy() {
    if (this.form.valid) {
      const formData = JSON.stringify(this.form.value);
      localStorage.setItem('formData', formData);
    }
  }
}
