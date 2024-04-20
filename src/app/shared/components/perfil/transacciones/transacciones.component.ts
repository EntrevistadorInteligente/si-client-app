import { FormGroup } from "@angular/forms"
import { HojaDeVidaDto } from "@shared/model/hoja-de-vida-dto"
import { IntegradorService } from '@shared/service/integrador.service';
import { Injectable } from "@angular/core";


@Injectable()
export class Transacciones{
  constructor(private integradorService: IntegradorService){}

  corregir(hojaDeVidaDto: HojaDeVidaDto, perfilForm: FormGroup): any {
    hojaDeVidaDto.nombre = perfilForm.get('nombre').value;
    hojaDeVidaDto.perfil = perfilForm.get('perfil').value;
    hojaDeVidaDto.seniority = perfilForm.get('seniority').value;
    hojaDeVidaDto.tecnologiasPrincipales = perfilForm.get('tecnologiasPrincipales').value.map(
      value => value.name
    );
    hojaDeVidaDto.experienciasLaborales = perfilForm.get('experienciasLaborales').value.map(
      value => value.name
    );
    hojaDeVidaDto.habilidadesTecnicas = perfilForm.get('habilidadesTecnicas').value.map(
      value => value.name
    );
    hojaDeVidaDto.certificaciones = perfilForm.get('certificaciones').value.map(
      value => value.name
    );
    hojaDeVidaDto.proyectos = perfilForm.get('proyectos').value.map(
      value => value.name
    );
    hojaDeVidaDto.nivelIngles = perfilForm.get('nivelIngles').value;
    hojaDeVidaDto.otrasHabilidades = perfilForm.get('otrasHabilidades').value.map(
      value => value.name
    );
    this.integradorService.corregirHojaDeVida(hojaDeVidaDto).subscribe({
      next: event => {
        console.log(event)
      },
      error: error => console.error(error)
    });
  }

  obtenerPerfil(hojaDeVidaDto: HojaDeVidaDto, bandera: boolean): any {
    this.integradorService.obtenerHojaDeVida().subscribe({
      next: responseData=>{
        if(responseData != null){
          hojaDeVidaDto.uuid = responseData.uuid == undefined ? "" : responseData.uuid;
          hojaDeVidaDto.nombre = responseData.nombre == undefined ? "" : responseData.nombre;
          hojaDeVidaDto.perfil = responseData.perfil == undefined ? "" : responseData.perfil;
          hojaDeVidaDto.seniority = responseData.seniority == undefined ? "" : responseData.seniority;
          hojaDeVidaDto.tecnologiasPrincipales = responseData.tecnologiasPrincipales == undefined ? 
            [] : responseData.tecnologiasPrincipales;
          hojaDeVidaDto.experienciasLaborales = responseData.experienciasLaborales == undefined ? 
            [] : responseData.experienciasLaborales;
          hojaDeVidaDto.habilidadesTecnicas = responseData.habilidadesTecnicas == undefined ? 
            [] : responseData.habilidadesTecnicas;
          hojaDeVidaDto.certificaciones = responseData.certificaciones == undefined ? 
            [] : responseData.certificaciones;
          hojaDeVidaDto.proyectos = responseData.proyectos == undefined ? 
            [] : responseData.proyectos;
          hojaDeVidaDto.nivelIngles = responseData.nivelIngles == undefined ? "" : responseData.nivelIngles;
          hojaDeVidaDto.otrasHabilidades = responseData.otrasHabilidades == undefined ? 
            [] : responseData.otrasHabilidades;
        }
        bandera = true;
      },
      error: error => console.error(error),
    });
    return {"hojaDeVidaDto": hojaDeVidaDto, "bandera": bandera};
  }

  cargar(isHojaDeVidaVacio: boolean, isTamanoExcedido: boolean, file: File): any{
    isHojaDeVidaVacio = false;
    isTamanoExcedido = false;
    if(file == undefined){
      isHojaDeVidaVacio = true;
    }
    else if(file[0].size > 3000000){
      isTamanoExcedido = true;
    }
    else{
      isHojaDeVidaVacio = false;
      isTamanoExcedido = false;
      this.integradorService.cargarHojaDeVida(file[0]).subscribe({
        next: event => {
          console.log(event)
        },
        error: error => console.error(error)
      });
    }
    return {isHojaDeVidaVacio: isHojaDeVidaVacio, isTamanoExcedido:isTamanoExcedido}
  }
}
