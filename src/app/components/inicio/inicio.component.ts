import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VistaPreviaEntrevistaDto } from 'src/app/shared/model/vista-previa-entrevista-dto';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  
  isLogged: boolean;
  loader: boolean = false;
  username = "string";

  preguntas: VistaPreviaEntrevistaDto[];
  loaderVisible: boolean;
  showModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.isLogged$.subscribe(isLogged => {
      this.isLogged = isLogged;
    });
    this.route.queryParams.subscribe(params => {
      if (params['redirected'] === 'true') {
        this.showModal = true;
        this.submitAnswers();
        // Limpiar el parámetro 'redirected' de la URL
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {},
          replaceUrl: true
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitAnswers(): void {
    if (this.showModal) {
      Swal.fire({
        title: "¡Prueba el Servicio Gratis!",
        text: "Inicia sesión para obtener una entrevista y feedback personalizado",
        imageUrl: "assets/img/Logo-EI.png",
        imageWidth: "35%",
        customClass: {
          confirmButton: "btn btn-lg btn-info",
        },
        confirmButtonText: `<span class="fw-bold" style="color: white">
                              <i class="icofont icofont-login mr-2" style="font-size: 1.2rem"></i>
                            Iniciar Sesión</span>`,
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.showModal = false;
          this.login();
        }
      });
    }
  }

  login(): void {
    this.authService.login();
  }
}
