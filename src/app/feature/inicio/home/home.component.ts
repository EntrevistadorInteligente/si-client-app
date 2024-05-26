import { Component, OnInit } from '@angular/core';
import { VistaPreviaEntrevistaDto } from '@shared/model/vista-previa-entrevista-dto';
import { IntegradorService } from '@shared/service/integrador.service';
import { FeedbackService } from '@shared/service/feedback.service';
import { Observable, map } from 'rxjs';
import { FeedbackComentarioDto } from '@shared/model/feedback-dto';
import { AuthService } from '@shared/service/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  perfiles$!: Observable<any[]>;
  preguntasMuestra: FeedbackComentarioDto[] = [];
  preguntas!: VistaPreviaEntrevistaDto[];
  selectedProduct!: any;
  display: boolean = false;
  previoFeedback: FeedbackComentarioDto[] = [];
  selectedPerfil?: any;
  cargandoPreguntas: boolean = false;

  constructor(
    private integradorService: IntegradorService,
    private feedbackService: FeedbackService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarListaPerfiles();
  }

  cargarListaPerfiles(): void {
    this.perfiles$ = this.integradorService
      .listPerfiles()
      .pipe(map((perfil) => perfil));
  }

  onCargarPreguntas(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation(); // Prevenir el comportamiento predeterminado del enlace
    }
    if (this.selectedPerfil) {
      this.cargandoPreguntas = true;
      this.feedbackService
        .obtenerMuestraPreguntas(this.selectedPerfil.perfilEmpresa)
        .subscribe({
          next: (response: FeedbackComentarioDto[]) => {
            this.preguntasMuestra = response;
            this.previoFeedback = response.map((p) => {
              return {
                idPregunta: p.idPregunta,
                pregunta: p.pregunta,
                respuesta: '',
                feedback: '',
              };
            });
            this.cargandoPreguntas = false;
            console.log(response);
          },
          error: (error) => {
            console.error(error);
            this.cargandoPreguntas = false;
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
