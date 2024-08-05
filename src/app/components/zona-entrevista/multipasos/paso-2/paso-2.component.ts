import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { VistaPreviaEntrevistaDto } from 'src/app/shared/model/vista-previa-entrevista-dto';
import { IntegradorService } from 'src/app/shared/services/domain/integrador.service';
import { PaisService } from 'src/app/shared/services/domain/pais.service';
import { FormularioDto } from 'src/app/shared/model/formulario-dto';
import { NotificationCommunicationService } from 'src/app/shared/services/domain/notification-communication.service';

@Component({
  selector: 'app-paso-2',
  templateUrl: './paso-2.component.html',
  styleUrls: ['./paso-2.component.scss']
})
export class Paso2Component implements OnInit {

  @Output() formularioCompleto = new EventEmitter<boolean>();
  preguntas!: VistaPreviaEntrevistaDto[];
  form: FormGroup;
  public loading = true;
  isLoading: boolean;
  remainingCharacters: number = 5000;

  paises: any[] = [];
  selectedCountry: any = null;
  showDropdown: boolean = false;

  constructor(private fb: FormBuilder,
    private integradorService: IntegradorService,
    private paisService: PaisService,
    private notificationCommService: NotificationCommunicationService) { }

  ngOnInit() {
    this.form = this.fb.group({
      empresa: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9\\s]+$')]],
      perfil: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9\\s]+$')]],
      seniority: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9\\s]+$')]],
      pais: ['', Validators.required],
      descripcionVacante: ['', [Validators.required, Validators.maxLength(5000)]],
      terminosYCondiciones: [false, Validators.requiredTrue]
    });

    this.loadCountries();
  }

  loadCountries() {
    this.paisService.getCountries().subscribe(data => {
      this.paises = data.map(country => ({
        nombre: country.translations.spa.common
      })).sort((a, b) => a.nombre.localeCompare(b.nombre));
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectCountry(pais: { nombre: any; }) {
    this.selectedCountry = pais;
    this.form.value.pais.setValue(pais.nombre);
    this.showDropdown = false;
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
      this.integradorService.crearSolicitudEntrevista(formulario).subscribe({
        next: data => {
          this.preguntas = data;
          this.notificationCommService.triggerNotification();
          this.alert('Éxito', 'Solicitud entrevista enviada con éxito, se está generando tu entrevista', 'success');       
        },
        error: err => {
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
      });
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
    });
  }

  updateCharacterCount() {
    this.remainingCharacters = 5000 - this.form.get('descripcionVacante')?.value.length;
  }

}
