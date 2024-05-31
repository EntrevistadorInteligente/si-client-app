import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HojaDeVidaDto } from '@shared/model/hoja-de-vida-dto';
import { IntegradorService } from '@shared/service/integrador.service';
import {
  TecnologiasPrincipales,
  ExperienciasLaborales,
  HabilidadesTecnicas,
  Certificaciones,
  Proyectos,
  OtrasHabilidades,
} from '@shared/model/interfaces-perfil';
import { ErrorMessage } from '@shared/model/errorMessage-enums';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit {
  constructor(private integradorService: IntegradorService) {}

  file: File;
  hojaDeVidaDto = new HojaDeVidaDto();
  perfilForm: FormGroup | undefined;
  bandera = false;
  currentError: ErrorMessage | null = null;

  ngOnInit() {
    this.obtenerPerfil();
  }

  obtenerPerfil(): void {
    this.integradorService.obtenerHojaDeVida().subscribe({
      next: (responseData) => {
        if (responseData != null) {
          this.hojaDeVidaDto.uuid =
            responseData.uuid == undefined ? '' : responseData.uuid;
          this.hojaDeVidaDto.nombre =
            responseData.nombre == undefined ? '' : responseData.nombre;
          this.hojaDeVidaDto.perfil =
            responseData.perfil == undefined ? '' : responseData.perfil;
          this.hojaDeVidaDto.seniority =
            responseData.seniority == undefined ? '' : responseData.seniority;
          this.hojaDeVidaDto.tecnologiasPrincipales =
            responseData.tecnologiasPrincipales == undefined
              ? []
              : responseData.tecnologiasPrincipales;
          this.hojaDeVidaDto.experienciasLaborales =
            responseData.experienciasLaborales == undefined
              ? []
              : responseData.experienciasLaborales;
          this.hojaDeVidaDto.habilidadesTecnicas =
            responseData.habilidadesTecnicas == undefined
              ? []
              : responseData.habilidadesTecnicas;
          this.hojaDeVidaDto.certificaciones =
            responseData.certificaciones == undefined
              ? []
              : responseData.certificaciones;
          this.hojaDeVidaDto.proyectos =
            responseData.proyectos == undefined ? [] : responseData.proyectos;
          this.hojaDeVidaDto.nivelIngles =
            responseData.nivelIngles == undefined
              ? ''
              : responseData.nivelIngles;
          this.hojaDeVidaDto.otrasHabilidades =
            responseData.otrasHabilidades == undefined
              ? []
              : responseData.otrasHabilidades;
          this.InicializarHojaDeVida();
        }
      },
      error: (error) => console.log(error),
    });
  }

  private InicializarHojaDeVida() {
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
    this.hojaDeVidaDto.nombre = this.perfilForm.get('nombre').value;
    this.hojaDeVidaDto.perfil = this.perfilForm.get('perfil').value;
    this.hojaDeVidaDto.seniority = this.perfilForm.get('seniority').value;
    this.hojaDeVidaDto.tecnologiasPrincipales = this.perfilForm
      .get('tecnologiasPrincipales')
      .value.map((value) => value.name);
    this.hojaDeVidaDto.experienciasLaborales = this.perfilForm
      .get('experienciasLaborales')
      .value.map((value) => value.name);
    this.hojaDeVidaDto.habilidadesTecnicas = this.perfilForm
      .get('habilidadesTecnicas')
      .value.map((value) => value.name);
    this.hojaDeVidaDto.certificaciones = this.perfilForm
      .get('certificaciones')
      .value.map((value) => value.name);
    this.hojaDeVidaDto.proyectos = this.perfilForm
      .get('proyectos')
      .value.map((value) => value.name);
    this.hojaDeVidaDto.nivelIngles = this.perfilForm.get('nivelIngles').value;
    this.hojaDeVidaDto.otrasHabilidades = this.perfilForm
      .get('otrasHabilidades')
      .value.map((value) => value.name);
    this.integradorService.corregirHojaDeVida(this.hojaDeVidaDto).subscribe({
      next: (event) => {
        console.log(event);
      },
      error: (error) => console.error(error),
    });
  }

  agregarItem(input: string, listToAgree: string): void {
    console.log(this.perfilForm.get(input).value);

    if (this.perfilForm.get(input).value.trim() !== '') {
      this.perfilForm.controls[listToAgree].value.push({
        name: this.perfilForm.get(input).value,
      });
      this.perfilForm.controls[input].setValue('');
    }
  }

  eliminarItem(listToDelete: string, item: string): void {
    this.perfilForm.controls[listToDelete].setValue(
      this.perfilForm.controls[listToDelete].value.filter(
        (s) => s.name != item,
      ),
    );
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
      } else {
        console.error('El archivo seleccionado no es un PDF.');
        this.currentError = ErrorMessage.ArchivoNoPDF;
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
    const files: FileList = event.dataTransfer.files;
    this.handleFiles(files);
  }

  handleClickCargar(): void {
    this.currentError = null;
    if (this.file == undefined) {
      this.currentError = ErrorMessage.HojaDeVidaVacio;
    } else if (this.file[0].size > 3000000) {
      this.currentError = ErrorMessage.TamanoExcedido;
    } else {
      this.integradorService.cargarHojaDeVida(this.file[0]).subscribe({
        next: (event) => {
          console.log(event);
        },
        error: (error) => console.error(error),
      });
    }
  }
}
