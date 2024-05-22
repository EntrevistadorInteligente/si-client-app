import { Component, OnInit } from '@angular/core';
import { VistaPreviaEntrevistaDto } from '@shared/model/vista-previa-entrevista-dto';
import { IntegradorService } from '@shared/service/integrador.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  perfiles$!: Observable<any[]>;
  preguntas!: VistaPreviaEntrevistaDto[];
  selectedProduct!: any;
  selectedPerfil?: any;

  constructor(private integradorService: IntegradorService) {}

  ngOnInit() {
    this.cargarListaPerfiles();
  }

  cargarListaPerfiles(): void {
    this.perfiles$ = this.integradorService
      .listPerfiles()
      .pipe(map((perfil) => perfil));
  }
}
