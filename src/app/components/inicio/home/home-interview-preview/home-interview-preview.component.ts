import { Component, OnInit } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { StatePreguntas } from 'src/app/shared/model/entrevista-muestra-enums';
import { FeedbackComentarioDto } from 'src/app/shared/model/feedback-dto';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FeedbackService } from 'src/app/shared/services/domain/feedback.service';
import { IntegradorService } from 'src/app/shared/services/domain/integrador.service';

@Component({
  selector: 'app-home-interview-preview',
  templateUrl: './home-interview-preview.component.html',
  styleUrls: [
    './home-interview-preview.component.scss',
    '../../home/home.component.scss',
  ],
})
export class HomeInterviewPreviewComponent implements OnInit {
  public StateEnum = StatePreguntas;
  stateEntrevista = StatePreguntas.off;
  perfiles$!: Observable<any[]>;
  preguntasMuestra: FeedbackComentarioDto[] = [];
  display: boolean = false;
  previoFeedback: FeedbackComentarioDto[] = [];
  selectedPerfil?: any;
  iniciandoMuestra: boolean = false;

  constructor(
    private integradorService: IntegradorService,
    private feedbackService: FeedbackService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.cargarListaPerfiles();
  }

  cargarListaPerfiles(): void {
    this.perfiles$ = this.integradorService.listPerfiles().pipe(
      map((perfil) => perfil),
      shareReplay(1),
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
        .obtenerMuestraPreguntas(this.selectedPerfil.perfilEmpresa)
        .subscribe({
          next: (response: FeedbackComentarioDto[]) => {
            this.preguntasMuestra = response;
            this.stateEntrevista =
              response.length == 0 ? StatePreguntas.error : StatePreguntas.show;
            this.previoFeedback = response.map((p) => {
              return {
                idPregunta: p.idPregunta,
                pregunta: p.pregunta,
                respuesta: '',
                feedback: '',
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
    this.display = true;
  }
  login(): void {
    this.authService.login();
  }
}
