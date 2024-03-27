import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VistaPreviaEntrevistaDto } from '@shared/model/vista-previa-entrevista-dto';
import { IntegradorService } from '@shared/service/integrador.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})

export class LandingComponent implements OnInit {

  isLogged: boolean = false;
  username = "string";
  private router: Router;

  preguntas: VistaPreviaEntrevistaDto[];

  constructor(
    router: Router,
    private integradorService: IntegradorService
  ) {
    this.router = router;
  }

  ngOnInit() {
    if (!this.isLogged) {
      this.router.navigate(['/home']);
    } else {
      this.cargarVistaPreviaEntrevista();
    }
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
