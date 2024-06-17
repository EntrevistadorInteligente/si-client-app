import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { PreguntaComentarioDto } from 'src/app/shared/model/pregunta-comentario-dto';
import { RespuestaComentarioDto } from 'src/app/shared/model/respuesta-dto';
import { FeedbackService } from 'src/app/shared/services/domain/feedback.service';
import { SpeechService } from 'src/app/shared/services/chat/speech.service';
import { RecordVoiceService } from 'src/app/shared/services/domain/record-voice.service';
import Typed from 'typed.js';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.scss']
})
export class VideoChatComponent implements OnInit {
  @ViewChild('chatHistory') private chatHistory: ElementRef;
  @ViewChild('messageInput') private messageInput: ElementRef;
  @Input() idEntrevista: string;
  @Output() respuestasEntrevista = new EventEmitter<RespuestaComentarioDto[]>();

  public preguntas: PreguntaComentarioDto[] = [];
  public respuestas: RespuestaComentarioDto[] = [];
  public currentIndex: number = 0;
  public messages: any[] = [];
  public userMessage: string = '';
  public botTyping: boolean = false;
  public escribiendo = "Typing...";
  public vacio = "";
  public interviewFinished: boolean = false;
  public currentTime: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  errorMessage: string = '';
  isRecording: boolean = false;
  private finalTranscript: string = '';

  constructor(private integradorService: FeedbackService,
              private speechService: SpeechService,
              private voiceRecognitionService: RecordVoiceService) { }

  ngOnInit(): void {
    this.obtenerPreguntas(this.idEntrevista);

    this.voiceRecognitionService.getSpeechResult().subscribe(({ interim, final }) => {
      if (final) {
        this.finalTranscript += final;
      }
      if (this.finalTranscript.length + interim.length > 1000) {
        this.finalTranscript = this.finalTranscript.substring(0, 1000 - interim.length);
        interim = '';
        this.voiceRecognitionService.stopRecognition();
        alert('Llegaste a la cantidad límite de caracteres');
      }
      this.userMessage = this.finalTranscript + interim;
      this.moveCaretToEnd();
      this.scrollToEnd();
    });

    this.voiceRecognitionService.getRecordingStatus().subscribe((status: boolean) => {
      this.isRecording = status;
    });

    this.voiceRecognitionService.getRecognitionError().subscribe((error: string) => {
      this.errorMessage = `Error: ${error}`;
    });
  }

  obtenerPreguntas(entrevistaId: string): void {
    this.integradorService.obtenerPreguntas(entrevistaId).subscribe({
      next: preguntas => {
        this.preguntas = preguntas;
        this.respuestas = preguntas.map(p => ({
          idPregunta: p.idPregunta,
          respuesta: ''
        }));
        setTimeout(() => {
          this.showNextQuestion();
        }, 2000);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  moveCaretToEnd() {
    const input = this.messageInput.nativeElement;
    input.selectionStart = input.selectionEnd = input.value.length;
  }

  scrollToEnd() {
    const input = this.messageInput.nativeElement;
    input.scrollLeft = input.scrollWidth;
  }

  toggleVoiceRecognition() {
    this.errorMessage = '';
    if (this.isRecording) {
      this.finalTranscript += this.userMessage.substring(this.finalTranscript.length);
      this.voiceRecognitionService.stopRecognition();
    } else {
      this.voiceRecognitionService.startRecognition();
    }
  }

  showNextQuestion() {
    if (this.currentIndex < this.preguntas.length) {
      const question = this.preguntas[this.currentIndex].pregunta;
      const messageId = `typewriter-${this.messages.length}`;
      this.botTyping = true;
      this.messages.push({
        id: this.messages.length,
        type: 'bot',
        text: question,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      setTimeout(() => {
        this.initTypedEffect(`#${messageId}`, question);
        this.speechService.start(question, 1);
        this.scrollToBottom();
      }, 0);
    } else {
      this.endInterview();
    }
  }

  initTypedEffect(elementId: string, text: string) {
    new Typed(elementId, {
      strings: [text],
      typeSpeed: 35,
      showCursor: false,
      onComplete: () => {
        this.botTyping = false;
        this.scrollToBottom();
      }
    });
  }

  addBotMessage(text: string) {
    this.messages.push({
      type: 'bot',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.scrollToBottom(); 
  }

  addUserMessage(text: string) {
    this.messages.push({
      type: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.userMessage.trim() === '' || this.botTyping || this.interviewFinished) return;

    this.addUserMessage(this.userMessage);
    this.respuestas[this.currentIndex].respuesta = this.userMessage;
    this.userMessage = '';
    this.finalTranscript = '';
    this.currentIndex++;

    setTimeout(() => {
      this.showNextQuestion();
    }, 500);
  }

  endInterview() {
    this.interviewFinished = true;
    this.currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  finalizeInterview() {
    this.respuestasEntrevista.emit(this.respuestas);
  }

  scrollToBottom(): void {
    try {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    } catch (err) { }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 1000) {
      input.value = input.value.substring(0, 1000);
      this.userMessage = input.value;
    } else {
      this.userMessage = input.value;
      this.finalTranscript = this.userMessage;
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    this.alert('Alerta', '¿En una entrevista harás eso?', 'warning');
  }

  alert(title: string, text: string, icon: SweetAlertIcon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }
}
