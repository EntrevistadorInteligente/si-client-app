import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseEntrevistaComponent } from '../../base-entrevista/base-entrevista.component';
import { EntrevistaService } from 'src/app/shared/services/domain/entrevista.service';
import { Configuration, NewSessionData, StreamingAvatarApi } from '@heygen/streaming-avatar';
import { ChatBotService } from 'src/app/shared/services/domain/chat-bot.service';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrl: './video-chat.component.scss'
})
export class VideoChatComponent extends BaseEntrevistaComponent implements OnInit {

  isFullscreen: boolean = true;
  avatarUrl: string = 'https://files2.heygen.ai/avatar/v3/a3fdb0c652024f79984aaec11ebf2694_34350/preview_target.webp'; // URL de la imagen del avatar

  @ViewChild('mediaStream') mediaStream: ElementRef<HTMLVideoElement>;

  stream: MediaStream | undefined;
  sessionData: NewSessionData | undefined;
  avatar: StreamingAvatarApi;
  isLoadingSession: boolean = false;
  debug: string = '';

  constructor(entrevistaService: EntrevistaService,
    private chatBotService: ChatBotService,
  ) {
    super(entrevistaService);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.initializeAvatar();
  }

   showNextQuestion(): void {
    this.botTyping = true;
    this.entrevistaService.getNextQuestion().subscribe({
      next: async (question) => {
        if (this.entrevistaService.isInterviewFinished()) {
          this.botTyping = false;
          this.endInterview();
          return;
        }

        await this.speakQuestion(question);
      },
      error: (err) => {
        this.debug = `Error al obtener la siguiente pregunta: ${err}`;
        this.botTyping = false;
      }
    });
  }

  async speakQuestion(question: string) {
    if (this.sessionData) {
      try {
        await this.avatar.speak({
          taskRequest: {
            text: question,
            sessionId: this.sessionData.sessionId
          }
        });
        this.processAssistantResponse(question);
      } catch (error) {
        this.debug = `Error al hacer hablar al avatar: ${error}`;
      }
    } else {
      this.debug = 'No hay una sesión activa para el avatar';
    }
    this.botTyping = false;
  }

  
  processAssistantResponse(response: string): void {
    // Implementación específica para video chat
  }

  handleUserResponse(response: string): void {
    // Implementación específica para video chat
  }

  override handleHistoryLoaded(): void {
    throw new Error('Method not implemented.');
  }
  override sendMessage(): void {
    throw new Error('Method not implemented.');
  }

  closeFullscreen() {
    this.isFullscreen = false;
    // Aquí puedes emitir un evento para cerrar el componente si es necesario
  }

  async initializeAvatar() {
    this.chatBotService.getHeygenAccesToken().subscribe({
      next: (res:any) => {
    
        this.avatar = new StreamingAvatarApi(
          new Configuration({ accessToken: res.token })
        );
        //this.alert('Éxito', 'Entrevista enviada con éxito, se está generando el feedback', 'success');
      },
      error: (err: any) => {
        console.error('error: ', err);
        
        //this.alert('Error', 'Ocurrió un error al enviar la entrevista. Por favor, inténtelo de nuevo más tarde.', 'error');
      },
    });
  }

  async startSession() {
    this.isLoadingSession = true;
    try {
      const res = await this.avatar.createStartAvatar({
        newSessionRequest: {
          quality: "medium",
          avatarName: "Tyler-insuit-20220721", // Reemplaza con el ID de avatar adecuado
          voice: { voiceId: "d62a0ce960434056b25c058bc4fa2509" } // Reemplaza con el ID de voz adecuado
        }
      });
      this.sessionData = res;
      this.stream = this.avatar.mediaStream;
      this.setupMediaStream();
    } catch (error) {
      console.error("Error starting avatar session:", error);
      this.debug = "Error starting the session.";
    }
    this.isLoadingSession = false;
  }

  setupMediaStream() {
    if (this.stream && this.mediaStream) {
      this.mediaStream.nativeElement.srcObject = this.stream;
      this.mediaStream.nativeElement.onloadedmetadata = () => {
        this.mediaStream.nativeElement.play();
      };
    }
  }

  async endSession() {
    if (this.sessionData) {
      await this.avatar.stopAvatar({
        stopSessionRequest: { sessionId: this.sessionData.sessionId }
      });
      this.stream = undefined;
      this.sessionData = undefined;
    }
  }

  ngOnDestroy() {
    this.endSession();
  }

}