import { AuthService } from 'src/app/shared/services/auth/auth.service';
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

import { ChatBotService } from 'src/app/shared/services/domain/chat-bot.service';
import { forkJoin } from 'rxjs';
import { IntegradorService } from 'src/app/shared/services/domain/integrador.service';
import { EntrevistaUsuarioDto } from 'src/app/shared/model/entrevista-usuario-dto';
@Component({
  selector: 'app-old-chat',
  templateUrl: './old-chat.component.html',
  styleUrls: ['./old-chat.component.scss'],
})
export class OldChatComponent implements OnInit {
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
  private nameChatHistory: string = 'username_chatHistory';
  private lastAssistantResponse: string = '';
  private lastUserResponse: string = '';
  public respuestasHistorial: RespuestaComentarioDto[] = [];
  isHistoryLoaded: boolean = false;
  isFirstInteraction:boolean = true;;
  private entrevistaUsuario:EntrevistaUsuarioDto

  constructor(
    private feedbackService: FeedbackService,
    private speechService: SpeechService,
    private voiceRecognitionService: RecordVoiceService,
    private authService: AuthService,
    private chatBotService: ChatBotService,
    private integradorService: IntegradorService
  ) { }

  ngOnInit(): void {
    this.nameChatHistory = `${this.authService.getUsername()}_chatHistory`;
    this.loadChatHistory();
    this.speechService.initialize();
    this.lastSeenBootTyping = this.currentTime;
  
    if (this.isFirstInteraction) {
      forkJoin([
        this.feedbackService.obtenerPreguntas(this.idEntrevista),
        this.chatBotService.generarIntroduction(this.entrevistaUsuario),
        this.integradorService.obtenerEntrevistaEnProceso(this.idEntrevista)
      ]).subscribe({
        next: ([preguntas, introduccion, entrevista]) => {
          this.entrevistaUsuario = entrevista;
          this.lastAssistantResponse = introduccion.response;
          this.processInitialData(preguntas);
        },
        error: error => {
          console.error(error);
        }
      });
    } else {
      forkJoin([
        this.feedbackService.obtenerPreguntas(this.idEntrevista),
        this.integradorService.obtenerEntrevistaEnProceso(this.idEntrevista)
      ]).subscribe({
        next: ([preguntas, entrevista]) => {
          this.entrevistaUsuario = entrevista;
          this.processInitialData(preguntas);
        },
        error: error => {
          console.error(error);
        }
      });
    }
  
    this.initVoiceRecognition();
  }

  processInitialData(preguntas: any): void {
    this.preguntas = preguntas;
    if (this.respuestasHistorial.length === 0) {
      const respuestasIniciales = preguntas.map((p: { idPregunta: any; }) => ({
        idPregunta: p.idPregunta,
        respuesta: '',
      }));
      this.respuestas = respuestasIniciales;
      this.respuestasHistorial = respuestasIniciales;
    } else {
      this.respuestas = preguntas.map((p: { idPregunta: string; }) => {
        const historial = this.respuestasHistorial.find(
          r => r.idPregunta === p.idPregunta
        );
        return {
          idPregunta: p.idPregunta,
          respuesta: historial ? historial.respuesta : '',
        };
      });
    }
  
    if (this.isFirstInteraction) {
      this.resetMessageState();
      this.processAssistantResponse(this.lastAssistantResponse)
      return;
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
  }

  private initVoiceRecognition() {
    this.voiceRecognitionService.getSpeechResult().subscribe((result: string) => {
      if (result.length > 1000) {
        this.userMessage = result.substring(0, 1000);
        this.voiceRecognitionService.stopRecognition();
        alert('Llegaste a la cantidad límite de caracteres');
      } else {
        this.userMessage = result;
      }
      this.scrollToEnd();
    });

    this.voiceRecognitionService.getRecordingStatus().subscribe((status: boolean) => {
      this.isRecording = status;
    });

    this.voiceRecognitionService.getRecognitionError().subscribe((error: string) => {
      this.errorMessage = `Error: ${error}`;
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
    this.isFirstInteraction = false;
    if (this.currentIndex < this.preguntas.length) {
      this.resetMessageState();
      const question = this.preguntas[this.currentIndex].pregunta;

      this.chatBotService.getQuestionChatBotInterview(question,
        this.lastUserResponse, 
        this.lastAssistantResponse,
        this.entrevistaUsuario).subscribe({
          next: data => {
            this.processAssistantResponse(data.response);
          },
          error: err => {
            console.error(err);
            this.processAssistantResponse(question);
          }
        });

    } else {
      this.endInterview();
    }
  }

  processAssistantResponse(response: string) {
    this.lastAssistantResponse = response;

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
      text: this.lastAssistantResponse,
      time: typingTime,
    });
    this.saveChatHistory();
    setTimeout(() => {
      this.initTypedEffect(`#${messageId}`, this.lastAssistantResponse);
      this.speechService.start(this.lastAssistantResponse, 1);
      this.scrollToBottom();
    }, 500);
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

  private insertMessageInTypewriter(): void {
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
    this.scrollToBottom();
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
    this.lastUserResponse = this.userMessage;
    if(!this.isFirstInteraction){
      this.respuestas[this.currentIndex].respuesta = this.userMessage;
      this.respuestasHistorial[this.currentIndex].respuesta = this.userMessage;
      this.currentIndex++;
    }

    this.userMessage = '';
    this.finalTranscript = '';
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
    localStorage.removeItem(this.nameChatHistory);
  }

  scrollToBottom(): void {
    try {
      this.chatHistory.nativeElement.scrollTop =
        this.chatHistory.nativeElement.scrollHeight;
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
    localStorage.setItem(this.nameChatHistory, JSON.stringify(chatData));
  }

  private loadChatHistory() {
    const chatData = localStorage.getItem(this.nameChatHistory);
    if (chatData) {
      this.isFirstInteraction = false;
      this.isHistoryLoaded = true;
      const parsedData = JSON.parse(chatData);
      this.messages = parsedData.messages || [];
      this.respuestasHistorial = parsedData.respuestas || [];
      this.currentIndex = parsedData.currentIndex || 0;
      this.interviewFinished = parsedData.interviewFinished || false;

      const lastMessage = this.messages[this.messages.length - 1];
      const beforeLastMessage = this.messages[this.messages.length - 2];

      if(lastMessage.type==='bot'){
        this.lastAssistantResponse=lastMessage.text;
        this.lastUserResponse= beforeLastMessage ? beforeLastMessage.text : '';
      }else{
        this.lastAssistantResponse=beforeLastMessage.text;
        this.lastUserResponse=lastMessage.text;
      }

    }
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

}
