import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PreguntaComentarioDto } from 'src/app/shared/model/pregunta-comentario-dto';
import { RespuestaComentarioDto } from 'src/app/shared/model/respuesta-dto';
import { FeedbackService } from 'src/app/shared/services/domain/feedback.service';
import { SpeechService } from 'src/app/shared/services/chat/speech.service';
import Typed from 'typed.js';
import { RecordVoiceService } from 'src/app/shared/services/domain/record-voice.service';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.scss']
})
export class VideoChatComponent implements OnInit, AfterViewInit {
  @ViewChild('chatHistory') private chatHistory: ElementRef;
  @Input() idEntrevista: string;
  public preguntas: PreguntaComentarioDto[] = [];
  public respuestas: RespuestaComentarioDto[] = [];
  public currentIndex: number = 0;
  public messages: any[] = [];
  public userMessage: string = '';
  public botTyping: boolean = false;
  public escribiendo = "Typing..."
  public vacio = ""
  errorMessage: string = '';
  isRecording: boolean = false;

  constructor(private integradorService: FeedbackService,
              private speechService: SpeechService) { }

  ngOnInit(): void {
    this.obtenerPreguntas(this.idEntrevista);
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
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
      }, 0);
    }
  }

  initTypedEffect(elementId: string, text: string) {
    new Typed(elementId, {
      strings: [text],
      typeSpeed: 35,
      showCursor: false,
      onComplete: () => {
        this.botTyping = false;
      }
    });
  }

  sendMessage() {
    if (this.userMessage.trim() === '' || this.botTyping) return;

    this.messages.push({
      type: 'user',
      text: this.userMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.respuestas[this.currentIndex].respuesta = this.userMessage;
    this.userMessage = '';
    this.currentIndex++;

    setTimeout(() => {
      this.showNextQuestion();
    }, 500);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
