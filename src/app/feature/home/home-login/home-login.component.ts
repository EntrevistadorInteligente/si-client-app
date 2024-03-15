import { Component, OnInit } from '@angular/core';
import { VistaPreviaEntrevistaDto } from '@shared/model/vista-previa-entrevista-dto';
import { IntegradorService } from '@shared/service/integrador.service';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrl: './home-login.component.scss'
})

export class HomeLoginComponent  implements OnInit{

  preguntas!: VistaPreviaEntrevistaDto[];
  selectedProduct!: any;

  constructor(private integradorService: IntegradorService) { }

  ngOnInit() {
    this.cargarVistaPreviaEntrevista();
  }

  cargarVistaPreviaEntrevista(): void {

    this.integradorService.listAut().subscribe(
      data => {
        this.preguntas = data;
      },
      err => console.log(err)
    );
  }
}
