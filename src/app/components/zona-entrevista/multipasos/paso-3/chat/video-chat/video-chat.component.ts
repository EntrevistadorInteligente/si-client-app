import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseEntrevistaComponent } from '../../base-entrevista/base-entrevista.component';
import { EntrevistaService } from 'src/app/shared/services/domain/entrevista.service';
import { ChatBotService } from 'src/app/shared/services/domain/chat-bot.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { RecordVoiceService } from 'src/app/shared/services/domain/record-voice.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { TimerService } from 'src/app/shared/services/domain/timer.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrl: './video-chat.component.scss'
})
export class VideoChatComponent extends BaseEntrevistaComponent implements OnInit {
  isLoading: boolean;
  isFullscreen: boolean = true;
  avatarUrl: string = 'https://files2.heygen.ai/avatar/v3/10063c743f114722ab6538b35905c51c_3013/preview_target.webp';

  @ViewChild('mediaStream') mediaStream: ElementRef<HTMLVideoElement>;
  @ViewChild('messageInput') private messageInput: ElementRef;

  stream: MediaStream | undefined;
  sessionData: any;
  isLoadingSession: boolean = false;
  private timerInterval: any;
  remainingTime: string;
  dashOffset: number;
  circumference = 282.7433388230814;
  modalRef: NgbActiveModal;
  
  @ViewChild('userVideo') userVideo: ElementRef<HTMLVideoElement>;
  userStream: MediaStream | undefined;

  private peerConnection: RTCPeerConnection;
  private sessionId: string;
  token: string
  private nameChatHistory: string;
  isRecording: boolean = false;
  isFromChat: boolean = false;

  constructor(entrevistaService: EntrevistaService,
    private chatBotService: ChatBotService,
    private http: HttpClient,
    private authService: AuthService,
    private voiceRecognitionService: RecordVoiceService,
    private timerService: TimerService,
    private activeModal: NgbActiveModal
  ) {
    super(entrevistaService);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.nameChatHistory = `${this.authService.getEmail()}_chatHistory`;
    this.initializeAvatar();
    this.timerService.time$.subscribe(time => {
      this.remainingTime = time;
    });

    this.timerService.dashOffset$.subscribe(offset => {
      this.dashOffset = offset;
    });

    this.interviewFinished = this.entrevistaService.isInterviewFinished();
  }

  showNextQuestion(): void {
    this.botTyping = true;
    this.isFromChat = false;
    this.entrevistaService.getNextQuestion().subscribe({
      next: async (question) => {
        if (this.entrevistaService.isInterviewFinished()) {
          this.botTyping = false;
          this.isLoading = false;
          this.entrevistaService.getClose().subscribe({
            next: async (close) => {
      
              await this.speakQuestion(close);
             
            },
            error: (err: any) => {
              console.log('Error getting next question:', err);
              this.botTyping = false;
            }
          });
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

        if(!this.isFromChat){
          this.processAssistantResponse(question);
        }
        
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


  override async handleHistoryLoaded(): Promise<void> {

  }

  async handleHistoryLoaded2(): Promise<void> {
    const lastMessage = this.messages[this.messages.length - 1];
    if (this.messages.length > 0 && lastMessage.type === 'user') {
      setTimeout(() => {
        this.showNextQuestion();
      }, 500);
    } else {
      this.isFromChat = true;
      setTimeout(() => {
          this.speakQuestion("Continuemos con tu entrevista, ya que la habías dejado a medias. La última pregunta que te hice fue: " + lastMessage.text);
          this.isLoading = false;
      }, 1000);
      
    }
  }

  override sendMessage(): void {
    this.voiceRecognitionService.stopRecognition();
    if (
      this.userMessage.trim() === '' ||
      this.botTyping ||
      this.interviewFinished
    )
      return;
    this.handleUserResponse(this.userMessage);
    this.resetTextarea();
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
  // Modifica el método closeFullscreen para iniciar el temporizador
  closeFullscreen() {
    this.isFullscreen = false;
  }

  async initializeAvatar() {
    this.chatBotService.getHeygenAccesToken().subscribe({
      next: (res: any) => {

        this.token = res.token;
      },
      error: (err: any) => {
        console.error('error: ', err);
        this.alert('Error', 'Ocurrió un error al conectarse con el servidor de video. Por favor, inténtelo de nuevo más tarde.', 'error');
      },
    });
  }

  async startSession() {
    this.isLoadingSession = true;
    try {
      this.timerService.startTimer(10 * 60);

      // Create a new session
      this.sessionData = await this.createNewSession();
      const data = this.sessionData.data;
      this.sessionId = data.session_id;
      const remoteSdp = data.sdp;

      // Set up WebRTC
      await this.setupWebRTC(remoteSdp);
      this.startUserCamera();
      this.handleHistoryLoaded2();
    } catch (error) {
      console.error("Error starting avatar session:", error);
    }
    this.isLoadingSession = false;
  }


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
    this.timerService.stopTimer();
    if (this.sessionData) {
      return this.stopSession();
    }

    return Promise.resolve();


  }

   stopSession() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post('https://api.heygen.com/v1/streaming.stop',
      {
        session_id: this.sessionId,
      },
      { headers }
    ).toPromise();
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
    this.timerService.stopTimer();
    if (this.userStream) {
      this.userStream.getTracks().forEach(track => track.stop());
      this.endSession();
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
        voice: { voice_id: 'd62a0ce960434056b25c058bc4fa2509' },
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
      this.isLoading = true;
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      this.closeFullscreen();
      this.initVoiceRecognition();
      this.startSession();
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
      alert('No se pudo acceder a la cámara y/o micrófono. Se iniciará el modo chat.');
      //this.startChatMode();
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

    });

    this.voiceRecognitionService.getRecordingStatus().subscribe((status: boolean) => {
      this.isRecording = status;
    });

    this.voiceRecognitionService.getRecognitionError().subscribe((error: string) => {
      console.error('Error de reconocimiento de voz:', error);
    });
  }

  toggleVoiceRecognition() {
    if (this.isRecording) {
      this.voiceRecognitionService.stopRecognition();
    } else {
      this.voiceRecognitionService.startRecognition();
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 1000) {
      input.value = input.value.substring(0, 1000);
      this.userMessage = input.value;
    } else {
      this.userMessage = input.value;
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
      confirmButtonText: 'OK',
    });
  }

  closeInterview(){
    this.modalRef.close(); 
    this.finalizeInterview(this.nameChatHistory);
  }

}