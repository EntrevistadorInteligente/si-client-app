import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { HojaDeVidaDto } from "@shared/model/hoja-de-vida-dto";
import { TecnologiasPrincipales, ExperienciasLaborales, HabilidadesTecnicas, 
    Certificaciones, Proyectos, OtrasHabilidades} from '@shared/model/interfaces-perfil';

@Injectable()
export class InicializarHojaDeVida{
    run(hojaDeVidaDto: HojaDeVidaDto, perfilForm: FormGroup): any {
        perfilForm = new FormGroup({
          nombre: new FormControl<string | null>(hojaDeVidaDto.nombre),
          perfil: new FormControl<string | null>(hojaDeVidaDto.perfil),
          seniority: new FormControl<string | null>(hojaDeVidaDto.seniority),
          tecnologiaSelec: new FormControl<string | null>(''),
          tecnologiaAgregar: new FormControl<string | null>(''),
          tecnologiasPrincipales: new FormControl<TecnologiasPrincipales[] | null>(
            hojaDeVidaDto.tecnologiasPrincipales.map(value => {
              return {name: value};
            })),
          experienciaSelec: new FormControl<string | null>(''),
          experienciaLaboralAgregar: new FormControl<string | null>(''),
          experienciasLaborales: new FormControl<ExperienciasLaborales[] | null>(
            hojaDeVidaDto.experienciasLaborales.map(value => {
              return {name: value};
            })),
          habilidadSelec: new FormControl<string | null>(''),
          habilidadAgregar: new FormControl<string | null>(''),
          habilidadesTecnicas: new FormControl<HabilidadesTecnicas[] | null>(
            hojaDeVidaDto.habilidadesTecnicas.map(value => {
              return {name: value};
            })),
          certificacionSelec: new FormControl<string | null>(''),
          certificacionAgregar: new FormControl<string | null>(''),
          certificaciones: new FormControl<Certificaciones[] | null>(
            hojaDeVidaDto.certificaciones.map(value => {
              return {name: value};
            })),
          proyectoSelec: new FormControl<string | null>(''),
          proyectoAgregar: new FormControl<string | null>(''),
          proyectos: new FormControl<Proyectos[] | null>(
            hojaDeVidaDto.proyectos.map(value => {
              return {name: value};
            })),
          nivelIngles: new FormControl<string | null>(hojaDeVidaDto.nivelIngles),
          otraHabilidadSelec: new FormControl<string | null>(''),
          otraHabilidadAgregar: new FormControl<string | null>(''),
          otrasHabilidades: new FormControl<OtrasHabilidades[] | null>(
            hojaDeVidaDto.otrasHabilidades.map(value => {
              return {name: value};
            })),
        });
        return perfilForm;
      }
}