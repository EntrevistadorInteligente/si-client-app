import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '@core/service/loader/loader.service';
import { VistaPreviaEntrevistaDto } from '@shared/model/vista-previa-entrevista-dto';
import { IntegradorService } from '@shared/service/integrador.service';
import { LoginService } from '@shared/service/login.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})

export class LandingComponent implements OnInit {

  isLogged: boolean;
  loader: boolean = false;
  username = "string";
  private router: Router;

  preguntas: VistaPreviaEntrevistaDto[];
  loaderVisible: boolean;

  constructor(
    router: Router,
    private integradorService: IntegradorService,
    private loaderService: LoaderService,
    private loginService: LoginService
  ) {
    this.router = router;
  }

  ngOnInit() {
    this.loginService.authenticationChanged.subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    });
    if (this.isLogged) {
      this.cargarVistaPreviaEntrevista();
    }
  }

  cargarVistaPreviaEntrevista(): void {
    this.showLoader();
    this.integradorService.list().subscribe(
      data => {
        this.preguntas = data;
        this.hideLoader();
      },
      err => {
        console.log(err);
        this.hideLoader();
      }
    );
  }

  showLoader(): void {
    this.loaderService.showLoader();
  }

  hideLoader(): void {
    this.loaderService.hideLoader();
  }
}
