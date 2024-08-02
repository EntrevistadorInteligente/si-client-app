import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseEntrevistaComponent } from '../../base-entrevista/base-entrevista.component';
import { EntrevistaService } from 'src/app/shared/services/domain/entrevista.service';
import { Configuration, NewSessionData, StreamingAvatarApi } from '@heygen/streaming-avatar';
import { ChatBotService } from 'src/app/shared/services/domain/chat-bot.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

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
  remainingTime: string = '10:00';
  private timerInterval: any;
  @ViewChild('userVideo') userVideo: ElementRef<HTMLVideoElement>;
  userStream: MediaStream | undefined;
  circumference = 2 * Math.PI * 45;
  dashOffset = 0;
  private peerConnection: RTCPeerConnection;
  private sessionId: string;
  token:string
  private nameChatHistory: string;

  constructor(entrevistaService: EntrevistaService,
    private chatBotService: ChatBotService,
    private http: HttpClient,
    private authService: AuthService,
  ) {
    super(entrevistaService);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.nameChatHistory = `${this.authService.getUsername()}_chatHistory`;
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
        console.log('Error getting next question:', err);
        this.botTyping = false;
      }
    });
  }

  /*async speakQuestion(question: string) {
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
        console.log('Error speaking question:', error);
      }
    } 
    this.botTyping = false;
  }*/

  async speakQuestion(question: string) {
    if (this.sessionId) {
      try {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        });

        const body = {
          session_id: this.sessionId,
          text: question
        };

        const response: any = await this.http.post('https://api.heygen.com/v1/streaming.task', body, { headers }).toPromise();

        console.log('Speak task response:', response);
        this.processAssistantResponse(question);
      } catch (error) {
        console.error('Error speaking question:', error);
      }
    } else {
      console.error('No active session');
    }
    
    this.botTyping = false;
  }

  processAssistantResponse(response: string): void {
    this.messages = this.entrevistaService.getMessages();
    this.entrevistaService.addAssistantResponse(response);
    this.entrevistaService.saveChatHistory(this.nameChatHistory);
  }
  handleUserResponse(response: string): void {
    this.entrevistaService.addUserResponse(response);
    this.messages = this.entrevistaService.getMessages();
    this.userMessage = '';
    this.showNextQuestion();
    this.entrevistaService.saveChatHistory(this.nameChatHistory);
  }


  override handleHistoryLoaded(): void {
    if (this.messages.length > 0 && this.messages[this.messages.length - 1].type === 'user') {
      setTimeout(() => {
        this.showNextQuestion();
      }, 500);
    } else {
      
    }
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
        this.token = res.token;
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
      /*const res = await this.avatar.createStartAvatar({
        newSessionRequest: {
          quality: "medium",
          avatarName: "Tyler-insuit-20220721",
          voice: { voiceId: "d62a0ce960434056b25c058bc4fa2509" }
        }
      });


      this.sessionData = res;
      this.stream = this.avatar.mediaStream;
      this.setupMediaStream();*/

        // Create a new session
        const sessionData: any = await this.createNewSession();
        const data = sessionData.data;
        this.sessionId = data.session_id;
        const remoteSdp = data.sdp;
  
        // Set up WebRTC
        await this.setupWebRTC(remoteSdp);

      this.startTimer(10 * 60);
      this.startUserCamera();
    } catch (error) {
      console.error("Error starting avatar session:", error);
    }
    this.isLoadingSession = false;
  }

  /*setupMediaStream() {
    if (this.stream && this.mediaStream) {
      this.mediaStream.nativeElement.srcObject = this.stream;
      this.mediaStream.nativeElement.onloadedmetadata = () => {
        this.mediaStream.nativeElement.play();
      };
    }
  }*/

  setupMediaStream() {
    if (this.stream && this.mediaStream && this.mediaStream.nativeElement) {
      this.mediaStream.nativeElement.srcObject = this.stream;
      this.mediaStream.nativeElement.onloadedmetadata = () => {
        this.mediaStream.nativeElement.play().catch(e => console.error("Error playing video:", e));
      };
    } else {
      console.error("Media stream or video element not available");
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

  private async createNewSession() {
    const asd = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post('https://api.heygen.com/v1/streaming.new', 
      {
          quality: "high",
          avatar_id: "josh_lite3_20230714",
          voice: {voice_id: 'd62a0ce960434056b25c058bc4fa2509'},
        }, 
      { headers }
    ).toPromise();
  }

  private async setupWebRTC(remoteSdp: RTCSessionDescriptionInit) {
    this.peerConnection = new RTCPeerConnection();
  
    this.peerConnection.ontrack = (event) => {
      if (!this.stream) {
        this.stream = new MediaStream();
      }
      this.stream.addTrack(event.track);
      this.setupMediaStream();
    };
  
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendIceCandidate(event.candidate);
      }
    };
  
    // Set the remote description first (this is the offer from the server)
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(remoteSdp));
  
    // Create an answer
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
  
    // Send the answer back to the server
    await this.sendAnswer(answer);
  }

  private async sendAnswer(answer: RTCSessionDescriptionInit) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  
    return this.http.post(`https://api.heygen.com/v1/streaming.start`, 
      { 
        session_id: this.sessionId, 
        sdp: answer
      }, 
      { headers }
    ).toPromise();
  }

  private async sendIceCandidate(candidate: RTCIceCandidate) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post('https://api.heygen.com/v1/streaming.ice', 
      { 
        session_id: this.sessionId, 
        candidate: candidate 
      }, 
      { headers }
    ).toPromise();
  }

  async requestPermissions() {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      this.closeFullscreen();
      this.startImmersiveExperience();
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
      alert('No se pudo acceder a la cámara y/o micrófono. Se iniciará el modo chat.');
      //this.startChatMode();
    }
  }
  startImmersiveExperience() {
    this.initializeVoiceDetection();
    // Iniciar la entrevista
    this.showNextQuestion();
  }

  initializeVoiceDetection() {
    let recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
  
    let silenceTimer: any;
    let transcript = '';
  
    recognition.onresult = (event: any) => {
      clearTimeout(silenceTimer);
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }
  
      // Actualizar la UI para mostrar que se está escuchando
      this.updateListeningUI(true);
  
      silenceTimer = setTimeout(() => {
        if (transcript.trim() !== '') {
          this.handleUserResponse(transcript);
          transcript = '';
        }
        this.updateListeningUI(false);
      }, 1500); // Ajusta este valor según necesites
    };
  
    recognition.onerror = (event: any) => {
      console.error('Error en el reconocimiento de voz:', event.error);
      this.updateListeningUI(false);
    };
  
    recognition.start();
  }

  updateListeningUI(isListening: boolean) {
    // Actualizar la UI para mostrar si se está escuchando o no
    // Por ejemplo, cambiar un icono o mostrar un indicador visual
  }
  
}