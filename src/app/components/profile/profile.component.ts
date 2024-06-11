import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorMessage } from 'src/app/shared/model/errorMessage-enums';
import { HojaDeVidaDto } from 'src/app/shared/model/hoja-de-vida-dto';
import { Certificaciones, ExperienciasLaborales, HabilidadesTecnicas, OtrasHabilidades, Proyectos, TecnologiasPrincipales } from 'src/app/shared/model/interfaces-perfil';
import { IntegradorService } from 'src/app/shared/services/domain/integrador.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  constructor(private integradorService: IntegradorService) {}

  file: File;
  hojaDeVidaDto = new HojaDeVidaDto();
  perfilForm: FormGroup = new FormGroup({});
  bandera = false;
  currentError: ErrorMessage | null = null;
  currentInfo: boolean = false;

  ngOnInit() {
    this.obtenerPerfil();
  }

  obtenerPerfil(): void {
    this.integradorService.obtenerHojaDeVida().subscribe({
      next: (responseData) => {
        if (responseData != null) {
          this.hojaDeVidaDto.uuid = responseData.uuid ?? '';
          this.hojaDeVidaDto.nombre = responseData.nombre ?? '';
          this.hojaDeVidaDto.perfil = responseData.perfil ?? '';
          this.hojaDeVidaDto.seniority = responseData.seniority ?? '';
          this.hojaDeVidaDto.tecnologiasPrincipales = responseData.tecnologiasPrincipales ?? [];
          this.hojaDeVidaDto.experienciasLaborales = responseData.experienciasLaborales ?? [];
          this.hojaDeVidaDto.habilidadesTecnicas = responseData.habilidadesTecnicas ?? [];
          this.hojaDeVidaDto.certificaciones = responseData.certificaciones ?? [];
          this.hojaDeVidaDto.proyectos = responseData.proyectos ?? [];
          this.hojaDeVidaDto.nivelIngles = responseData.nivelIngles ?? '';
          this.hojaDeVidaDto.otrasHabilidades = responseData.otrasHabilidades ?? [];
          this.inicializarHojaDeVida();
        }
      },
      error: (error) => console.log(error),
    });
  }
  
  private getOrDefault(value: any, defaultValue: any): any {
    return value === undefined ? defaultValue : value;
  }

  private inicializarHojaDeVida() {
    this.perfilForm = new FormGroup({
      nombre: new FormControl<string | null>(this.hojaDeVidaDto.nombre),
      perfil: new FormControl<string | null>(this.hojaDeVidaDto.perfil),
      seniority: new FormControl<string | null>(this.hojaDeVidaDto.seniority),
      tecnologiaAgregar: new FormControl<string | null>(''),
      tecnologiasPrincipales: new FormControl<TecnologiasPrincipales[] | null>(
        this.hojaDeVidaDto.tecnologiasPrincipales.map((value) => {
          return { name: value };
        }),
      ),
      experienciaLaboralAgregar: new FormControl<string | null>(''),
      experienciasLaborales: new FormControl<ExperienciasLaborales[] | null>(
        this.hojaDeVidaDto.experienciasLaborales.map((value) => {
          return { name: value };
        }),
      ),
      habilidadAgregar: new FormControl<string | null>(''),
      habilidadesTecnicas: new FormControl<HabilidadesTecnicas[] | null>(
        this.hojaDeVidaDto.habilidadesTecnicas.map((value) => {
          return { name: value };
        }),
      ),
      certificacionAgregar: new FormControl<string | null>(''),
      certificaciones: new FormControl<Certificaciones[] | null>(
        this.hojaDeVidaDto.certificaciones.map((value) => {
          return { name: value };
        }),
      ),
      proyectoAgregar: new FormControl<string | null>(''),
      proyectos: new FormControl<Proyectos[] | null>(
        this.hojaDeVidaDto.proyectos.map((value) => {
          return { name: value };
        }),
      ),
      nivelIngles: new FormControl<string | null>(
        this.hojaDeVidaDto.nivelIngles,
      ),
      otraHabilidadAgregar: new FormControl<string | null>(''),
      otrasHabilidades: new FormControl<OtrasHabilidades[] | null>(
        this.hojaDeVidaDto.otrasHabilidades.map((value) => {
          return { name: value };
        }),
      ),
    });
    this.bandera = true;
  }
  handleClickCorregir(): void {
    this.hojaDeVidaDto.nombre = this.perfilForm?.get('nombre')?.value || '';
    this.hojaDeVidaDto.perfil = this.perfilForm?.get('perfil')?.value || '';
    this.hojaDeVidaDto.seniority = this.perfilForm?.get('seniority')?.value || '';
    this.hojaDeVidaDto.tecnologiasPrincipales = this.perfilForm?.get('tecnologiasPrincipales')?.value.map((value: any) => value.name) || [];
    this.hojaDeVidaDto.experienciasLaborales = this.perfilForm?.get('experienciasLaborales')?.value.map((value: any) => value.name) || [];
    this.hojaDeVidaDto.habilidadesTecnicas = this.perfilForm?.get('habilidadesTecnicas')?.value.map((value: any) => value.name) || [];
    this.hojaDeVidaDto.certificaciones = this.perfilForm?.get('certificaciones')?.value.map((value: any) => value.name) || [];
    this.hojaDeVidaDto.proyectos = this.perfilForm?.get('proyectos')?.value.map((value: any) => value.name) || [];
    this.hojaDeVidaDto.nivelIngles = this.perfilForm?.get('nivelIngles')?.value || '';
    this.hojaDeVidaDto.otrasHabilidades = this.perfilForm?.get('otrasHabilidades')?.value.map((value: any) => value.name) || [];
    this.integradorService.corregirHojaDeVida(this.hojaDeVidaDto).subscribe({
      next: (event) => {
        console.log(event);
      },
      error: (error) => console.error(error),
    });
  }

  agregarItem(input: string, listToAgree: string): void {
    const inputControl = this.perfilForm?.get(input);
    const listControl = this.perfilForm?.get(listToAgree);
    if (inputControl && listControl && inputControl.value.trim() !== '') {
      listControl.setValue([...listControl.value, { name: inputControl.value }]);
      inputControl.setValue('');
    }
  }

  eliminarItem(listToDelete: string, item: string): void {
    const listControl = this.perfilForm?.get(listToDelete);
    if (listControl) {
      listControl.setValue(listControl.value.filter((s: any) => s.name !== item));
    }
  }
  onFileChange(event: any): void {
    const fileList: FileList = event.target.files;
    this.handleFiles(fileList);
  }

  handleFiles(files: FileList): void {
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        this.file = file;
        this.currentError = null;
        this.currentInfo = true;
      } else {
        console.error('El archivo seleccionado no es un PDF.');
        this.currentError = ErrorMessage.ArchivoNoPDF;
        this.currentInfo = false;
      }
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files: FileList | null = event.dataTransfer?.files || null;
    if (files) {
      this.handleFiles(files);
    }
  }

  handleClickCargar(): void {
    this.currentError = null;
    if (!this.file) {
      this.currentError = ErrorMessage.HojaDeVidaVacio;
    } else if (this.file.size > 3000000) {
      this.currentError = ErrorMessage.TamanoExcedido;
    } else {
      console.log(this.file);
      this.integradorService.cargarHojaDeVida(this.file).subscribe({
        next: (event) => {
          console.log(event);
        },
        error: (error) => console.error(error),
      });
    }
  }
}

