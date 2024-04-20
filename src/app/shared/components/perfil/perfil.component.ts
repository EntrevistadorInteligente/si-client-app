import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HojaDeVidaDto } from '@shared/model/hoja-de-vida-dto';
import { Transacciones } from './transacciones/transacciones.component';
import { InicializarHojaDeVida } from './inicializar-formulario/inicializar-formulario.component';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})

export class PerfilComponent implements OnInit {
  
  constructor(private transacciones: Transacciones, private inicializarHojaDeVida: InicializarHojaDeVida) { }

  file: File;
  hojaDeVidaDto: HojaDeVidaDto = new HojaDeVidaDto("","", "", "", [], [], [], [], [], "", []);
  perfilForm: FormGroup | undefined;
  aux: any;
  isHojaDeVidaVacio: boolean = false;
  isTamanoExcedido: boolean = false;
  bandera = false;

  ngOnInit() {
        this.aux = this.transacciones.obtenerPerfil(this.hojaDeVidaDto, this.bandera);
        this.bandera = this.aux.bandera;
        this.hojaDeVidaDto = this.aux.hojaDeVidaDto;
        this.perfilForm = this.inicializarHojaDeVida.run(this.hojaDeVidaDto, this.perfilForm);
  }

  handleClickCorregir(): void{
    this.transacciones.corregir(this.hojaDeVidaDto, this.perfilForm);
  }

  agregarItem(input: string, listToAgree: string): void {
      if (this.perfilForm.get(input).value.trim() !== '') {
        this.perfilForm.controls[listToAgree].value.push({name: this.perfilForm.get(input).value});
        this.perfilForm.controls[input].setValue('');
      }
      
  }

  eliminarItem(listToDelete: string ,item: string): void{
      this.perfilForm.controls[listToDelete].setValue(
        this.perfilForm.controls[listToDelete].value.filter(s => s.name != item)
      );
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
    this.aux = this.transacciones.cargar(this.isHojaDeVidaVacio, this.isTamanoExcedido, this.file);
    this.isHojaDeVidaVacio = this.aux.isHojaDeVidaVacio;
    this.isTamanoExcedido = this.aux.isTamanoExcedido;
  }

}
