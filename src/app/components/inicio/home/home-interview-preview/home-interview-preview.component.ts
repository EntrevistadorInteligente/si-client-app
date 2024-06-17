import { Component, OnInit } from "@angular/core";
import { Observable, map, shareReplay } from "rxjs";
import { StatePreguntas } from "src/app/shared/model/entrevista-muestra-enums";
import { FeedbackComentarioDto } from "src/app/shared/model/feedback-dto";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { FeedbackService } from "src/app/shared/services/domain/feedback.service";
import { IntegradorService } from "src/app/shared/services/domain/integrador.service";
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-home-interview-preview",
  templateUrl: "./home-interview-preview.component.html",
  styleUrls: ["./home-interview-preview.component.scss"],
})
export class HomeInterviewPreviewComponent implements OnInit {
  public StateEnum = StatePreguntas;
  stateEntrevista = StatePreguntas.off;
  perfiles$!: Observable<any[]>;
  preguntasMuestra: FeedbackComentarioDto[] = [];
  previoFeedback: FeedbackComentarioDto[] = [];
  selectedPerfil?: any;
  iniciandoMuestra: boolean = false;

  constructor(
    private integradorService: IntegradorService,
    private feedbackService: FeedbackService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarListaPerfiles();
  }

  cargarListaPerfiles(): void {
    this.perfiles$ = this.integradorService.listPerfiles().pipe(
      map((perfil) => perfil),
      shareReplay(1)
    );
  }

  onCargarPreguntas(event?: Event): void {
    this.iniciandoMuestra = true;
    this.stateEntrevista = StatePreguntas.load;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (this.selectedPerfil) {
      this.feedbackService
        .obtenerMuestraPreguntas(this.selectedPerfil)
        .subscribe({
          next: (response: FeedbackComentarioDto[]) => {
            this.preguntasMuestra = response;
            this.stateEntrevista =
              response.length == 0 ? StatePreguntas.error : StatePreguntas.show;
            this.previoFeedback = response.map((p) => {
              return {
                idPregunta: p.idPregunta,
                pregunta: p.pregunta,
                respuesta: "",
                feedback: "",
              };
            });
          },
          error: (error) => {
            console.error(error);
            this.stateEntrevista = StatePreguntas.error;
          },
        });
    }
  }

  submitAnswers(event?: Event): void {
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
        this.login();
      }
    });
  }
  login(): void {
    this.authService.login();
  }
}
