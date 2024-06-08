import { Component, Input, NgZone, OnInit } from '@angular/core';
import { PreguntaComentarioDto } from '@shared/model/pregunta-comentario-dto';
import { RespuestaComentarioDto } from '@shared/model/respuesta-dto';
import { FeedbackService } from '@shared/service/feedback.service';
import { RecordVoiceService } from '@shared/service/record-voice.service';
import { MessageService } from 'primeng/api';
import Swal, { SweetAlertIcon } from 'sweetalert2';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-paso-3',
  templateUrl: './paso-3.component.html',
  styleUrl: './paso-3.component.scss'
})

export class Paso3Component implements OnInit {
  @Input() idEntrevista: string;
  preguntas: PreguntaComentarioDto[] = [];
  respuestas: RespuestaComentarioDto[] = [];
  currentIndex: number = 0;
  visible: boolean = false;
  btn_success: boolean = false;
  progress: number = 0;
  isRecording: boolean = false;
  errorMessage: string = '';

  constructor(
    private integradorService: FeedbackService,
    private messageService: MessageService,
    private voiceRecognitionService: RecordVoiceService
  ) { }

  ngOnInit(): void {
    this.voiceRecognitionService.getSpeechResult().subscribe(result => {
      this.respuestas[this.currentIndex].respuesta += result + '';
    });

    this.voiceRecognitionService.getRecordingStatus().subscribe(status => {
      this.isRecording = status;
    });

    this.voiceRecognitionService.getRecognitionError().subscribe(error => {
      this.errorMessage = `Error: ${error}`;
    });
    this.obtenerPreguntas(this.idEntrevista);
    
  }

  get currentQuestion(): PreguntaComentarioDto {
    return this.preguntas[this.currentIndex];
  }

  progressValue(): number {
    this.progress = ((this.currentIndex + 1) / this.preguntas.length * 100 | 0);
    
    if (this.progress == 100) {
      this.btn_success = true;
    }
    return this.progress
  }

  previousQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.btn_success = false;
    }
  }

  nextQuestion() {
    if(this.respuestas[this.currentIndex].respuesta.trim() === '') 
      this.alert('Campo vacío', 'Debe responder para poder continuar', 'warning');
    else if (this.currentIndex < this.preguntas.length - 1) 
      this.currentIndex++;
  }

  obtenerPreguntas(entrevistaId: string): void {
    this.integradorService.obtenerPreguntas(entrevistaId).subscribe({
      next: preguntas => {
        this.preguntas = preguntas;
        this.respuestas = preguntas.map(p => {
          const respuestaDto: RespuestaComentarioDto = {
            idPregunta: p.idPregunta,
            respuesta: ''
          };
          return respuestaDto;
        });
      },
      error: error => {
        console.error(error);
      }
    });
  }

  toggleVoiceRecognition(index: number) {
    this.currentIndex = index;
    this.errorMessage = '';
    if (this.isRecording) {
      this.voiceRecognitionService.stopRecognition();
    } else {
      this.voiceRecognitionService.startRecognition();
    }
  }

  submitAnswers() {
    const hasEmptyAnswers = this.respuestas.some(respuesta => !respuesta.respuesta);
    if (hasEmptyAnswers) {
      this.alert('Campo vacío', 'Debe responder para poder enviar las respuestas', 'warning');
      return;
    }

    this.integradorService.enviarRespuestas(this.idEntrevista, this.respuestas).subscribe({
      next: (res:any) => {
        console.log('ok: ', res);
        
        this.alert('Éxito', 'Entrevista enviada con éxito, se está generando el feedback', 'success');
      },
      error: (err: any) => {
        console.error('error: ', err);
        
        this.alert('Error', 'Ocurrió un error al enviar la entrevista. Por favor, inténtelo de nuevo más tarde.', 'error');
      },
    });
  }

  alert(title: string, text: string, icon: SweetAlertIcon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'OK'
    })
  }
}