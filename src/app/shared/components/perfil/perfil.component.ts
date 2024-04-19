import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HojaDeVidaDto } from '@shared/model/hoja-de-vida-dto';
import { IntegradorService } from '@shared/service/integrador.service';
import { TecnologiasPrincipales, ExperienciasLaborales, HabilidadesTecnicas, 
  Certificaciones, Proyectos, OtrasHabilidades} from '@shared/model/interfaces-perfil';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})

export class PerfilComponent implements OnInit {
  
  constructor(private integradorService: IntegradorService) { }

  file: File;
  hojaDeVidaDto: HojaDeVidaDto = new HojaDeVidaDto("","", "", "", [], [], [], [], [], "", []);
  perfilForm: FormGroup | undefined;
  isHojaDeVidaVacio: boolean = false;
  isTamanoExcedido: boolean = false;
  bandera = false;

  ngOnInit() {    
        this.obtenerPerfil();
  }

  obtenerPerfil(): void {
    this.integradorService.obtenerHojaDeVida().subscribe({
      next: responseData=>{
        if(responseData != null){
          this.hojaDeVidaDto.uuid = responseData.uuid == undefined ? "" : responseData.uuid;
          this.hojaDeVidaDto.nombre = responseData.nombre == undefined ? "" : responseData.nombre;
          this.hojaDeVidaDto.perfil = responseData.perfil == undefined ? "" : responseData.perfil;
          this.hojaDeVidaDto.seniority = responseData.seniority == undefined ? "" : responseData.seniority;
          this.hojaDeVidaDto.tecnologiasPrincipales = responseData.tecnologiasPrincipales == undefined ? 
            [] : responseData.tecnologiasPrincipales;
          this.hojaDeVidaDto.experienciasLaborales = responseData.experienciasLaborales == undefined ? 
            [] : responseData.experienciasLaborales;
          this.hojaDeVidaDto.habilidadesTecnicas = responseData.habilidadesTecnicas == undefined ? 
            [] : responseData.habilidadesTecnicas;
          this.hojaDeVidaDto.certificaciones = responseData.certificaciones == undefined ? 
            [] : responseData.certificaciones;
          this.hojaDeVidaDto.proyectos = responseData.proyectos == undefined ? 
            [] : responseData.proyectos;
          this.hojaDeVidaDto.nivelIngles = responseData.nivelIngles == undefined ? "" : responseData.nivelIngles;
          this.hojaDeVidaDto.otrasHabilidades = responseData.otrasHabilidades == undefined ? 
            [] : responseData.otrasHabilidades;
        }
        this.InicializarHojaDeVida();
      },
      error: error => this.InicializarHojaDeVida(),  //TODO: console.error(error),
    });
  }

  private InicializarHojaDeVida() {
    this.perfilForm = new FormGroup({
      nombre: new FormControl<string | null>(this.hojaDeVidaDto.nombre),
      perfil: new FormControl<string | null>(this.hojaDeVidaDto.perfil),
      seniority: new FormControl<string | null>(this.hojaDeVidaDto.seniority),
      tecnologiaSelec: new FormControl<string | null>(''),
      tecnologiaAgregar: new FormControl<string | null>(''),
      tecnologiasPrincipales: new FormControl<TecnologiasPrincipales[] | null>(
        this.hojaDeVidaDto.tecnologiasPrincipales.map(value => {
          return {name: value};
        })),
      experienciaSelec: new FormControl<string | null>(''),
      experienciaLaboralAgregar: new FormControl<string | null>(''),
      experienciasLaborales: new FormControl<ExperienciasLaborales[] | null>(
        this.hojaDeVidaDto.experienciasLaborales.map(value => {
          return {name: value};
        })),
      habilidadSelec: new FormControl<string | null>(''),
      habilidadAgregar: new FormControl<string | null>(''),
      habilidadesTecnicas: new FormControl<HabilidadesTecnicas[] | null>(
        this.hojaDeVidaDto.habilidadesTecnicas.map(value => {
          return {name: value};
        })),
      certificacionSelec: new FormControl<string | null>(''),
      certificacionAgregar: new FormControl<string | null>(''),
      certificaciones: new FormControl<Certificaciones[] | null>(
        this.hojaDeVidaDto.certificaciones.map(value => {
          return {name: value};
        })),
      proyectoSelec: new FormControl<string | null>(''),
      proyectoAgregar: new FormControl<string | null>(''),
      proyectos: new FormControl<Proyectos[] | null>(
        this.hojaDeVidaDto.proyectos.map(value => {
          return {name: value};
        })),
      nivelIngles: new FormControl<string | null>(this.hojaDeVidaDto.nivelIngles),
      otraHabilidadSelec: new FormControl<string | null>(''),
      otraHabilidadAgregar: new FormControl<string | null>(''),
      otrasHabilidades: new FormControl<OtrasHabilidades[] | null>(
        this.hojaDeVidaDto.otrasHabilidades.map(value => {
          return {name: value};
        })),
    });
    this.bandera = true;
  }

  handleClickCorregir(): void {
    this.hojaDeVidaDto.nombre = this.perfilForm.get('nombre').value;
    this.hojaDeVidaDto.perfil = this.perfilForm.get('perfil').value;
    this.hojaDeVidaDto.seniority = this.perfilForm.get('seniority').value;
    this.hojaDeVidaDto.tecnologiasPrincipales = this.perfilForm.get('tecnologiasPrincipales').value.map(
      value => value.name
    );
    this.hojaDeVidaDto.experienciasLaborales = this.perfilForm.get('experienciasLaborales').value.map(
      value => value.name
    );
    this.hojaDeVidaDto.habilidadesTecnicas = this.perfilForm.get('habilidadesTecnicas').value.map(
      value => value.name
    );
    this.hojaDeVidaDto.certificaciones = this.perfilForm.get('certificaciones').value.map(
      value => value.name
    );
    this.hojaDeVidaDto.proyectos = this.perfilForm.get('proyectos').value.map(
      value => value.name
    );
    this.hojaDeVidaDto.nivelIngles = this.perfilForm.get('nivelIngles').value;
    this.hojaDeVidaDto.otrasHabilidades = this.perfilForm.get('otrasHabilidades').value.map(
      value => value.name
    );
    this.integradorService.corregirHojaDeVida(this.hojaDeVidaDto).subscribe({
      next: event => {
        console.log(event)
      },
      error: error => console.error(error)
    });
  }

  agregarItem(campo: string): void {
    switch(campo){
      case 'tecnologiaAgregar': {
        if (this.perfilForm.get('tecnologiaAgregar').value.trim() !== '') {
          this.perfilForm.controls['tecnologiasPrincipales'].value.push({name: this.perfilForm.get('tecnologiaAgregar').value});
          this.perfilForm.controls['tecnologiaAgregar'].setValue('');
        }
      }
        break;
      case 'habilidadAgregar': {
        if (this.perfilForm.get('habilidadAgregar').value.trim() !== '') {
          this.perfilForm.controls['habilidadesTecnicas'].value.push({name: this.perfilForm.get('habilidadAgregar').value});
          this.perfilForm.controls['habilidadAgregar'].setValue('');
        }
      }
        break;
      case 'experienciaLaboralAgregar': {
        if (this.perfilForm.get('experienciaLaboralAgregar').value.trim() !== '') {
          this.perfilForm.controls['experienciasLaborales'].value.push({name: this.perfilForm.get('experienciaLaboralAgregar').value});
          this.perfilForm.controls['experienciaLaboralAgregar'].setValue('');
        }
      }
        break;
      case 'certificacionAgregar': {
        if (this.perfilForm.get('certificacionAgregar').value.trim() !== '') {
          this.perfilForm.controls['certificaciones'].value.push({name: this.perfilForm.get('certificacionAgregar').value});
          this.perfilForm.controls['certificacionAgregar'].setValue('');
        }
      }
        break;
      case 'proyectoAgregar': {
        if (this.perfilForm.get('proyectoAgregar').value.trim() !== '') {
          this.perfilForm.controls['proyectos'].value.push({name: this.perfilForm.get('proyectoAgregar').value});
          this.perfilForm.controls['proyectoAgregar'].setValue('');
        }
      }
        break;
      case 'otraHabilidadAgregar': {
        if (this.perfilForm.get('otraHabilidadAgregar').value.trim() !== '') {
          this.perfilForm.controls['otrasHabilidades'].value.push({name: this.perfilForm.get('otraHabilidadAgregar').value});
          this.perfilForm.controls['otraHabilidadAgregar'].setValue('');
        }
      }
        break;
      default: console.log("Ocurrio un error");
      
    }
  }

  eliminarItem(campo: string, item: string): void{
    switch(campo){
      case 'tecnologia': {
        if (this.perfilForm.controls['tecnologiaSelec'].value.name != ''){
          this.perfilForm.controls['tecnologiasPrincipales'].setValue(
            this.perfilForm.controls['tecnologiasPrincipales'].value.filter(s => s.name != item)
          );
          this.perfilForm.controls['tecnologiaAgregar'].setValue("");
        }
      }
        break;
      case 'habilidad': {
        if (this.perfilForm.controls['habilidadSelec'].value.name != ''){
          this.perfilForm.controls['habilidadesTecnicas'].setValue(
            this.perfilForm.controls['habilidadesTecnicas'].value.filter(s => s.name != item)
          );
        }
      }
        break;
      case 'experienciaLaboral': {
        if (this.perfilForm.controls['experienciaSelec'].value.name != ''){
          this.perfilForm.controls['experienciasLaborales'].setValue(
            this.perfilForm.controls['experienciasLaborales'].value.filter(s => s.name != item)
          );
        }
      }
        break;
      case 'certificacion': {
        if (this.perfilForm.controls['certificacionSelec'].value.name != ''){
          this.perfilForm.controls['certificaciones'].setValue(
            this.perfilForm.controls['certificaciones'].value.filter(s => s.name != item)
          );
        }
      }
        break;
      case 'proyecto': {
        if (this.perfilForm.controls['proyectoSelec'].value.name != ''){
          this.perfilForm.controls['proyectos'].setValue(
            this.perfilForm.controls['proyectos'].value.filter(s => s.name != item)
          );
        }
      }
        break;
      case 'otraHabilidad': {
        if (this.perfilForm.controls['otraHabilidadSelec'].value.name != ''){
          this.perfilForm.controls['otrasHabilidades'].setValue(
            this.perfilForm.controls['otrasHabilidades'].value.filter(s => s.name != item)
          );
        }
      }
        break;
      default: console.log("Ocurrio un error");
      
    }

  }

  onFileChange(event: any): void {
    const file: File = event.target.files;
    this.handleFiles(file);
  }

  handleFiles(file: File): void {
    this.file = file;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const file: File = event.dataTransfer.files[0];
    
    this.handleFiles(file);
  }
  
  handleClickCargar(): void{
    this.isHojaDeVidaVacio = false;
    this.isTamanoExcedido = false;
    if(this.file == undefined){
      this.isHojaDeVidaVacio = true;
    }
    else if(this.file[0].size > 3000000){
      this.isTamanoExcedido = true;
    }
    else{
      this.integradorService.cargarHojaDeVida(this.file[0]).subscribe({
        next: event => {
          console.log(event)
        },
        error: error => console.error(error)
      });
    }
  }
}
