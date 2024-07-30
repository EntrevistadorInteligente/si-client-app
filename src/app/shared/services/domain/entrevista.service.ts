import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { ChatBotService } from './chat-bot.service';
import { FeedbackService } from './feedback.service';
import { IntegradorService } from './integrador.service';
import { EntrevistaUsuarioDto } from '../../model/entrevista-usuario-dto';
import { RespuestaComentarioDto } from '../../model/respuesta-dto';
import { PreguntaComentarioDto } from '../../model/pregunta-comentario-dto';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EntrevistaService {
 
  private preguntas: PreguntaComentarioDto[] = [];
  private respuestas: RespuestaComentarioDto[] = [];
  private currentIndex: number = 0;
  private messages: any[] = [];
  private interviewFinished: boolean = false;
  private entrevistaUsuario: EntrevistaUsuarioDto;
  private lastAssistantResponse: string = '';
  private lastUserResponse: string = '';
  private isFirstInteraction: boolean = true;
  private isHistoryLoaded: boolean = false;

  constructor(
    private feedbackService: FeedbackService,
    private chatBotService: ChatBotService,
    private integradorService: IntegradorService,
    private authService: AuthService
  ) {}



  initializeInterview(idEntrevista: string): Observable<any> {
    const nameChatHistory = `${this.authService.getUsername()}_chatHistory`;
    const chatData = this.loadChatHistory(nameChatHistory);
    
    if (chatData) {
      this.restoreFromCache(chatData);
      this.isHistoryLoaded = true;
      return this.loadExistingInterview(idEntrevista);
    }

    this.isFirstInteraction = true;
    return this.loadNewInterview(idEntrevista);
  }

  private loadNewInterview(idEntrevista: string): Observable<any> {
    return forkJoin([
      this.feedbackService.obtenerPreguntas(idEntrevista),
      this.integradorService.obtenerEntrevistaEnProceso(idEntrevista)
    ]).pipe(
      switchMap(([preguntas, entrevista]) => {
        return this.chatBotService.generarIntroduction(entrevista).pipe(
          map(introduccion => ({preguntas, entrevista, introduccion}))
        );
      }),
      tap(({preguntas, entrevista, introduccion}) => {
        this.preguntas = preguntas;
        this.entrevistaUsuario = entrevista;
        this.lastAssistantResponse = introduccion.response;
        this.initializeRespuestas();
      })
    );
  }

  private loadExistingInterview(idEntrevista: string): Observable<any> {
    return forkJoin([
      this.feedbackService.obtenerPreguntas(idEntrevista),
      this.integradorService.obtenerEntrevistaEnProceso(idEntrevista)
    ]).pipe(
      tap(([preguntas, entrevista]) => {
        this.preguntas = preguntas;
        this.entrevistaUsuario = entrevista;
        this.updateRespuestas();
      })
    );
  }

  private initializeRespuestas(): void {
    this.respuestas = this.preguntas.map(p => ({
      idPregunta: p.idPregunta,
      respuesta: '',
    }));
  }

  private updateRespuestas(): void {
    this.respuestas = this.preguntas.map(p => {
      const existingRespuesta = this.respuestas.find(r => r.idPregunta === p.idPregunta);
      return {
        idPregunta: p.idPregunta,
        respuesta: existingRespuesta ? existingRespuesta.respuesta : '',
      };
    });
  }

  isHistoryLoadedCheck(): boolean {
    return this.isHistoryLoaded;
  }

  getNextQuestion(): Observable<string> {
    if (this.currentIndex < this.preguntas.length) {
      this.isFirstInteraction = false;
      const question = this.preguntas[this.currentIndex].pregunta;
      return this.chatBotService.getQuestionChatBotInterview(
        question,
        this.lastUserResponse,
        this.lastAssistantResponse,
        this.entrevistaUsuario
      ).pipe(
        tap(data => {
          this.lastAssistantResponse = data.response;
        }),
        map(data => data.response)
      );
    } else {
      this.interviewFinished = true;
      return of('Entrevista finalizada');
    }
  }

  addUserResponse(response: string): void {
    this.lastUserResponse = response;
    
    if(!this.isFirstInteraction){
      this.respuestas[this.currentIndex].respuesta = response;
      this.currentIndex++;
    }

    this.messages.push({
      type: 'user',
      text: response,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    
    
  }

  addAssistantResponse(response: string): void {
    this.messages.push({
      type: 'bot',
      text: response,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  }

  isInterviewFinished(): boolean {
    return this.interviewFinished;
  }

  getMessages(): any[] {
    return this.messages;
  }

  getRespuestas(): RespuestaComentarioDto[] {
    return this.respuestas;
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }

  isFirstInteractionCheck(): boolean {
    return this.isFirstInteraction;
  }

  getLastAssistantResponse(): string {
    return this.lastAssistantResponse;
  }

  saveChatHistory(nameChatHistory: string): void {
    const chatData = {
      messages: this.messages,
      respuestas: this.respuestas,
      currentIndex: this.currentIndex,
      interviewFinished: this.interviewFinished,
    };
    localStorage.setItem(nameChatHistory, JSON.stringify(chatData));
  }

  private loadChatHistory(nameChatHistory: string): any {
    const chatData = localStorage.getItem(nameChatHistory);
    return chatData ? JSON.parse(chatData) : null;
  }

  private restoreFromCache(cachedData: any): void {
    this.messages = cachedData.messages || [];
    this.respuestas = cachedData.respuestas || [];
    this.currentIndex = cachedData.currentIndex || 0;
    this.interviewFinished = cachedData.interviewFinished || false;
    this.isFirstInteraction = false;

    const lastMessage = this.messages[this.messages.length - 1];
    const beforeLastMessage = this.messages[this.messages.length - 2];

    if (lastMessage.type === 'bot') {
      this.lastAssistantResponse = lastMessage.text;
      this.lastUserResponse = beforeLastMessage ? beforeLastMessage.text : '';
    } else {
      this.lastAssistantResponse = beforeLastMessage.text;
      this.lastUserResponse = lastMessage.text;
    }
  }
}