import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VistaPreviaEntrevistaDto } from 'src/app/shared/model/vista-previa-entrevista-dto';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent  implements OnInit, OnDestroy {
  private subscription: Subscription;
  
  isLogged: boolean;
  loader: boolean = false;
  username = "string";
  private router: Router;

  preguntas: VistaPreviaEntrevistaDto[];
  loaderVisible: boolean;

  constructor(
    router: Router,
    private authService: AuthService
  ) {
    this.router = router;
  }

  ngOnInit() {
    this.subscription = this.authService.isLogged$.subscribe(isLogged => {
      this.isLogged = isLogged;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }
}
