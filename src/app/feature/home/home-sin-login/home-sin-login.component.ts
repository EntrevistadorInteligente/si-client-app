import { Component, OnInit } from '@angular/core';
import { VistaPreviaEntrevistaDto } from '@shared/model/vista-previa-entrevista-dto';
import { IntegradorService } from '@shared/service/integrador.service';

@Component({
  selector: 'app-home-sin-login',
  templateUrl: './home-sin-login.component.html',
  styleUrl: './home-sin-login.component.scss'
})

export class HomeSinLoginComponent implements OnInit {
  preguntas!: VistaPreviaEntrevistaDto[];
  selectedProduct!: any;

  constructor(private integradorService: IntegradorService) { }

  ngOnInit() {
    this.cargarVistaPreviaEntrevista();
  }

  cargarVistaPreviaEntrevista(): void {
    this.integradorService.list().subscribe(
      data => {
        this.preguntas = data;
      },
      err => console.log(err)
    );
  }
}

