import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HojaDeVidaDto } from '@shared/model/hoja-de-vida-dto';
import { IntegradorService } from '@shared/service/integrador.service';

interface TecnologiasPrincipales {
  name: string
}
interface HabilidadesTecnicas {
  name: string
}
interface ExperienciasLaborales {
  name: string
}
interface Certificaciones {
  name: string
}
interface Proyectos {
  name: string
}
interface OtrasHabilidades {
  name: string
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})

export class PerfilComponent implements OnInit {
  
  constructor(private integradorService: IntegradorService) { }

  file:File;
  hojaDeVidaDto: HojaDeVidaDto;
  perfilForm: FormGroup | undefined;

  ngOnInit() {
        this.perfilForm = new FormGroup({
          nombre: new FormControl<string | null>(null),
          perfil: new FormControl<string | null>(null),
          seniority: new FormControl<string | null>(null),
          tecnologiaSelec: new FormControl<string | null>(''),
          tecnologiaAgregar: new FormControl<string | null>(''),
          tecnologiasPrincipales: new FormControl<TecnologiasPrincipales[] | null>([
            { name: 'Java' },
            { name: 'Spring Core' },
            { name: 'SQL' },
            { name: 'MySQL' },
            { name: 'Jenkins' }
          ]),
          experienciaSelec: new FormControl<string | null>(''),
          experienciaLaboralAgregar: new FormControl<string | null>(''),
          experienciasLaborales: new FormControl<ExperienciasLaborales[] | null>([]),
          habilidadSelec: new FormControl<string | null>(''),
          habilidadAgregar: new FormControl<string | null>(''),
          habilidadesTecnicas: new FormControl<HabilidadesTecnicas[] | null>([{ name: 'Depuracion de errores' }]),
          certificacionSelec: new FormControl<string | null>(''),
          certificacionAgregar: new FormControl<string | null>(''),
          certificaciones: new FormControl<Certificaciones[] | null>([]),
          proyectoSelec: new FormControl<string | null>(''),
          proyectoAgregar: new FormControl<string | null>(''),
          proyectos: new FormControl<Proyectos[] | null>([]),
          nivelIngles: new FormControl<string | null>('A1'),
          otraHabilidadSelec: new FormControl<string | null>(''),
          otraHabilidadAgregar: new FormControl<string | null>(''),
          otrasHabilidades: new FormControl<OtrasHabilidades[] | null>([]),
      });
  }

  obtenerPerfil(): void {
    this.integradorService.obtenerHojaDeVida('').forEach(s=>{
      this.hojaDeVidaDto.nombre = s.nombre;
      this.hojaDeVidaDto.perfil = s.perfil;
      this.hojaDeVidaDto.seniority = s.seniority;
      this.hojaDeVidaDto.tecnologiasPrincipales = s.tecnologiasPrincipales;
      this.hojaDeVidaDto.experienciasLaborales = s.experienciasLaborales;
      this.hojaDeVidaDto.habilidadesTecnicas = s.habilidadesTecnicas;
      this.hojaDeVidaDto.certificaciones = s.certificaciones;
      this.hojaDeVidaDto.proyectos = s.proyectos;
      this.hojaDeVidaDto.nivelIngles = s.nivelIngles;
      this.hojaDeVidaDto.otrasHabilidades = s.otrasHabilidades;
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

  eliminarItem(campo: string): void{
    switch(campo){
      case 'tecnologia': {
        if (this.perfilForm.controls['tecnologiaSelec'].value.name != ''){
          this.perfilForm.controls['tecnologiasPrincipales'].setValue(
            this.perfilForm.controls['tecnologiasPrincipales'].value.filter(s => s.name != this.perfilForm.get('tecnologiaSelec').value.name)
          );
        }
      }
        break;
      case 'habilidad': {
        if (this.perfilForm.controls['habilidadSelec'].value.name != ''){
          this.perfilForm.controls['habilidadesTecnicas'].setValue(
            this.perfilForm.controls['habilidadesTecnicas'].value.filter(s => s.name != this.perfilForm.get('habilidadSelec').value.name)
          );
        }
      }
        break;
      case 'experienciaLaboral': {
        if (this.perfilForm.controls['experienciaSelec'].value.name != ''){
          this.perfilForm.controls['experienciasLaborales'].setValue(
            this.perfilForm.controls['experienciasLaborales'].value.filter(s => s.name != this.perfilForm.get('experienciaSelec').value.name)
          );
        }
      }
        break;
      case 'certificacion': {
        if (this.perfilForm.controls['certificacionSelec'].value.name != ''){
          this.perfilForm.controls['certificaciones'].setValue(
            this.perfilForm.controls['certificaciones'].value.filter(s => s.name != this.perfilForm.get('certificacionSelec').value.name)
          );
        }
      }
        break;
      case 'proyecto': {
        if (this.perfilForm.controls['proyectoSelec'].value.name != ''){
          this.perfilForm.controls['proyectos'].setValue(
            this.perfilForm.controls['proyectos'].value.filter(s => s.name != this.perfilForm.get('proyectoSelec').value.name)
          );
        }
      }
        break;
      case 'otraHabilidad': {
        if (this.perfilForm.controls['otraHabilidadSelec'].value.name != ''){
          this.perfilForm.controls['otrasHabilidades'].setValue(
            this.perfilForm.controls['otrasHabilidades'].value.filter(s => s.name != this.perfilForm.get('otraHabilidadSelec').value.name)
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

  handleClick(): void{
    console.log(this.file);
    this.integradorService.cargarHojaDeVida(this.file[0]);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    //event.preventDefault();
    //event.stopPropagation();
    const file: File = event.dataTransfer.files[0];
    
    this.handleFiles(file);
  }
}
