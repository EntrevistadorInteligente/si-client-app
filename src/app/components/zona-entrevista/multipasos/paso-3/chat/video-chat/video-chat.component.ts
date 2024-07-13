import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
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
  styleUrls: ['./video-chat.component.scss'],
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
  public escribiendo = 'Escribiendo...';
  public vacio = '';
  public interviewFinished: boolean = false;
  public currentTime: string = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  errorMessage: string = '';
  isRecording: boolean = false;
  private finalTranscript: string = '';
  public lastSeenBootTyping: string = '';
  private resizeObserver: ResizeObserver;

  public respuestasHistorial: RespuestaComentarioDto[] = [];
  isHistoryLoaded: boolean = false;
  mostrarBotMessage: boolean = false;

  constructor(
    private integradorService: FeedbackService,
    private speechService: SpeechService,
    private voiceRecognitionService: RecordVoiceService
  ) {}

  ngOnInit(): void {
    this.loadChatHistory();
    this.obtenerPreguntas(this.idEntrevista);
    this.lastSeenBootTyping = this.currentTime;
    this.voiceRecognitionService
      .getSpeechResult()
      .subscribe((result: string) => {
        if (result.length > 1000) {
          this.userMessage = result.substring(0, 1000);
          this.voiceRecognitionService.stopRecognition();
          alert('Llegaste a la cantidad límite de caracteres');
        } else {
          this.userMessage = result;
        }
        this.scrollToEnd();
      });

    this.voiceRecognitionService
      .getRecordingStatus()
      .subscribe((status: boolean) => {
        this.isRecording = status;
      });

    this.voiceRecognitionService
      .getRecognitionError()
      .subscribe((error: string) => {
        this.errorMessage = `Error: ${error}`;
      });
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.adjustTextareaHeight();
    });
    this.resizeObserver.observe(this.messageInput.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  obtenerPreguntas(entrevistaId: string): void {
    this.integradorService.obtenerPreguntas(entrevistaId).subscribe({
      next: preguntas => {
        this.preguntas = preguntas;
        const respuestasIniciales = preguntas.map(p => ({
          idPregunta: p.idPregunta,
          respuesta: '',
        }));

        this.respuestas = respuestasIniciales;

        if (this.respuestasHistorial.length === 0) {
          this.respuestasHistorial = respuestasIniciales;
        } else {
          this.respuestas = preguntas.map(p => {
            const historial = this.respuestasHistorial.find(
              r => r.idPregunta === p.idPregunta
            );
            return {
              idPregunta: p.idPregunta,
              respuesta: historial ? historial.respuesta : '',
            };
          });
        }

        if (this.isHistoryLoaded) {
          if (
            this.messages.length > 0 &&
            this.messages[this.messages.length - 1].type === 'bot'
          ) {
            this.isHistoryLoaded = false;
            this.insertMessageInTypewriter();
          } else {
            setTimeout(() => {
              this.showNextQuestion();
            }, 2000);
          }
        } else {
          setTimeout(() => {
            this.showNextQuestion();
          }, 2000);
        }
      },
      error: error => {
        console.error(error);
      },
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
      this.voiceRecognitionService.stopRecognition();
    } else {
      this.voiceRecognitionService.startRecognition();
    }
  }

  showNextQuestion() {
    if (this.currentIndex < this.preguntas.length) {
      this.resetMessageState();
      const question = this.preguntas[this.currentIndex].pregunta;
      const messageId = `typewriter-${this.messages.length}`;
      this.botTyping = true;
      let typingTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      this.lastSeenBootTyping = typingTime;
      this.messages.push({
        id: this.messages.length,
        type: 'bot',
        text: question,
        time: typingTime,
      });
      this.saveChatHistory();
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
      showCursor: true,
      onComplete: () => {
        this.botTyping = false;
        this.scrollToBottom();
      },
    });
  }

  insertMessageInTypewriter(): void {
    this.messages.forEach(message => {
      if (message.type === 'bot') {
        const typewriterElement = document.getElementById(
          'typewriter-' + message.id
        );
        if (typewriterElement) {
          typewriterElement.innerHTML = message.text;
        }
      }
    });
  }

  addBotMessage(text: string) {
    this.messages.push({
      type: 'bot',
      text: text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });

    this.scrollToBottom();
  }

  addUserMessage(text: string) {
    this.messages.push({
      type: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
    this.scrollToBottom();
  }

  sendMessage() {
    this.voiceRecognitionService.stopRecognition();
    if (
      this.userMessage.trim() === '' ||
      this.botTyping ||
      this.interviewFinished
    )
      return;
    this.addUserMessage(this.userMessage);
    this.respuestas[this.currentIndex].respuesta = this.userMessage;
    this.respuestasHistorial[this.currentIndex].respuesta = this.userMessage;
    this.userMessage = '';
    this.finalTranscript = '';
    this.currentIndex++;
    this.saveChatHistory();
    setTimeout(() => {
      this.showNextQuestion();
    }, 500);
    this.resetTextarea();
  }

  endInterview() {
    this.interviewFinished = true;
    this.currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  finalizeInterview() {
    this.respuestasEntrevista.emit(this.respuestas);
  }

  scrollToBottom(): void {
    try {
      this.chatHistory.nativeElement.scrollTop =
        this.chatHistory.nativeElement.scrollHeight;
    } catch (err) {}
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
    this.adjustTextareaHeight();
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
      confirmButtonText: 'OK',
    });
  }

  private resetMessageState() {
    this.userMessage = '';
    this.finalTranscript = '';
    this.voiceRecognitionService.resetRecognitionBuffer();
  }

  resetTextarea(): void {
    this.messageInput.nativeElement.value = '';
    this.adjustTextareaHeight();
  }

  adjustTextareaHeight(): void {
    const textarea = this.messageInput.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  private saveChatHistory() {
    const chatData = {
      messages: this.messages,
      respuestas: this.respuestasHistorial,
      currentIndex: this.currentIndex,
      interviewFinished: this.interviewFinished,
    };
    localStorage.setItem('chatHistory', JSON.stringify(chatData));
  }

  private loadChatHistory() {
    const chatData = localStorage.getItem('chatHistory');
    if (chatData) {
      this.isHistoryLoaded = true;
      this.mostrarBotMessage = true;
      const parsedData = JSON.parse(chatData);
      this.messages = parsedData.messages || [];
      this.respuestasHistorial = parsedData.respuestas || [];
      this.currentIndex = parsedData.currentIndex || 0;
      this.interviewFinished = parsedData.interviewFinished || false;
    }
  }
}
