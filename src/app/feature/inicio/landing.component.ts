import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '@core/service/loader/loader.service';
import { VistaPreviaEntrevistaDto } from '@shared/model/vista-previa-entrevista-dto';
import { LoginService } from '@shared/service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})

export class LandingComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  
  isLogged: boolean;
  loader: boolean = false;
  username = "string";
  private router: Router;

  preguntas: VistaPreviaEntrevistaDto[];
  loaderVisible: boolean;

  constructor(
    router: Router,
    private loaderService: LoaderService,
    private loginService: LoginService
  ) {
    this.router = router;
  }

  ngOnInit() {
    this.subscription = this.loginService.isLogged$.subscribe(isLogged => {
      this.isLogged = isLogged;
    });
  }

  showLoader(): void {
    this.loaderService.showLoader();
  }

  hideLoader(): void {
    this.loaderService.hideLoader();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }
}
