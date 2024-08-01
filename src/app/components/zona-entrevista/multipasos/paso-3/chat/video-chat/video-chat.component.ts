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
  remainingTime: string = '10:00';
  private timerInterval: any;
  @ViewChild('userVideo') userVideo: ElementRef<HTMLVideoElement>;
  userStream: MediaStream | undefined;
  circumference = 2 * Math.PI * 45;
  dashOffset = 0;

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

  // Modifica el método closeFullscreen para iniciar el temporizador
  closeFullscreen() {
    this.isFullscreen = false;
  }

  async initializeAvatar() {
    this.chatBotService.getHeygenAccesToken().subscribe({
      next: (res: any) => {

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
      this.startTimer(10 * 60); // 10 minutos
      const res = await this.avatar.createStartAvatar({
        newSessionRequest: {
          quality: "medium",
          avatarName: "Tyler-insuit-20220721",
          voice: { voiceId: "d62a0ce960434056b25c058bc4fa2509" }
        }
      });
      this.sessionData = res;
      this.stream = this.avatar.mediaStream;
      this.setupMediaStream();
      this.startTimer(10 * 60);
      this.startUserCamera();
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

  startTimer(duration: number) {
    let timer = duration;
    const totalTime = duration;
    this.timerInterval = setInterval(() => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;

      this.remainingTime =
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);

      this.dashOffset = this.circumference * (1 - timer / totalTime);

      if (--timer < 0) {
        clearInterval(this.timerInterval);
        this.endSession();
      }
    }, 1000);
  }

  async startUserCamera() {
    if (!this.userVideo) {
      console.error('User video element not found');
      return;
    }
  
    const hasPermission = await this.checkCameraPermission();
    if (!hasPermission) {
      console.error('Camera permission not granted');
      return;
    }
  
    try {
      this.userStream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.userVideo.nativeElement.srcObject = this.userStream;
    } catch (err) {
      console.error('Error accessing user camera:', err);
    }
  }

  async checkCameraPermission(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (err) {
      console.error('Camera permission not granted:', err);
      return false;
    }
  }

  ngOnDestroy() {
    this.endSession();
    if (this.userStream) {
      this.userStream.getTracks().forEach(track => track.stop());
    }
  }

}