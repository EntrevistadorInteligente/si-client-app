import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { EntrevistaService } from 'src/app/shared/services/domain/entrevista.service';
import { SpeechService } from 'src/app/shared/services/chat/speech.service';
import { RecordVoiceService } from 'src/app/shared/services/domain/record-voice.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { BaseEntrevistaComponent } from '../../base-entrevista/base-entrevista.component';
import Typed from 'typed.js';
import { VideoChatComponent } from '../video-chat/video-chat.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaximizeService } from 'src/app/shared/services/domain/maximize.service';
import { AudioChatComponent } from '../audio-chat/audio-chat.component';

@Component({
  selector: 'app-text-chat',
  templateUrl: './text-chat.component.html',
  styleUrl: './text-chat.component.scss'
})
export class TextoChatComponent extends BaseEntrevistaComponent implements OnInit, OnDestroy {
  @ViewChild('chatHistory') private chatHistory: ElementRef;
  @ViewChild('messageInput') private messageInput: ElementRef;

  public escribiendo = 'Escribiendo...';
  public vacio = '';
  public lastSeenBootTyping: string = '';
  private resizeObserver: ResizeObserver;
  private nameChatHistory: string;
  private finalTranscript: string = '';
  errorMessage: string = '';
  isRecording: boolean = false;

  constructor(
    entrevistaService: EntrevistaService,
    private speechService: SpeechService,
    private voiceRecognitionService: RecordVoiceService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: NgbModal,
    private maximizeService: MaximizeService
  ) {
    super(entrevistaService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.nameChatHistory = `${this.authService.getUsername()}_chatHistory`;
    this.speechService.initialize();
    this.lastSeenBootTyping = this.currentTime;
    this.initVoiceRecognition();
  }

  processAssistantResponse(response: string): void {
    this.messages = this.entrevistaService.getMessages();

    const messageId = `typewriter-${this.messages.length }`;
    this.botTyping = true;
    let typingTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    
    this.lastSeenBootTyping = typingTime;
    this.entrevistaService.addAssistantResponse(response);
    
    this.saveChatHistory();
    setTimeout(() => {
      this.initTypedEffect(`#${messageId}`, response);
      this.speechService.start(response, 1);
      this.scrollToBottom();
    }, 10);
  }

  private saveChatHistory(): void {
    this.entrevistaService.saveChatHistory(this.nameChatHistory);
  }

  private initTypedEffect(elementId: string, text: string) {
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

  sendMessage(): void {
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
    
  handleUserResponse(response: string): void {
    this.entrevistaService.addUserResponse(response);
    this.messages = this.entrevistaService.getMessages();
    this.userMessage = '';
    this.showNextQuestion();
    this.saveChatHistory();
  }

  showNextQuestion(): void {
    this.botTyping = true;
    this.entrevistaService.getNextQuestion().subscribe({
      next: question => {
        
        if (this.entrevistaService.isInterviewFinished()) {
          this.botTyping = false;
          this.endInterview();
          return;
        }

        this.processAssistantResponse(question);
      },
      error: err => {
        console.error(err);
        this.botTyping = false;
      }
    });
  }

  handleHistoryLoaded(): void {
    this.changeDetectorRef.detectChanges();
    this.insertMessageInTypewriter();
    if (this.messages.length > 0 && this.messages[this.messages.length - 1].type === 'user') {
      setTimeout(() => {
        this.showNextQuestion();
      }, 500);
    } else {
      
    }
  }
  private insertMessageInTypewriter(): void {
    for (let i = 0; i < this.messages.length; i++) {
      const message = this.messages[i];
      if (message.type === 'bot') {
        const typewriterElement = document.getElementById(
          'typewriter-' + i
        );
        if (typewriterElement) {
          typewriterElement.innerHTML = message.text;
        }
      }
    }

    this.scrollToBottom();
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

  openAudioChat(): void {
       // Primero, abre el modal
       const modalRef = this.modalService.open(AudioChatComponent, { 
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });
  
      // Luego, cambia a pantalla completa
      this.maximizeService.toggleFullScreen();
  
      modalRef.result.then(
        (result) => {
          console.log('Modal cerrado');
          // Asegúrate de salir del modo pantalla completa si es necesario
          if (this.maximizeService.navServices.fullScreen) {
            this.maximizeService.toggleFullScreen();
          }
        },
        (reason) => {
          console.log('Modal descartado');
          // Asegúrate de salir del modo pantalla completa si es necesario
          if (this.maximizeService.navServices.fullScreen) {
            this.maximizeService.toggleFullScreen();
          }
        }
      );
  }

  openVideoChat(): void {
    // Primero, abre el modal
    const modalRef = this.modalService.open(VideoChatComponent, { 
      size: 'xl',
      backdrop: 'static',
      keyboard: false
    });

    // Luego, cambia a pantalla completa
    this.maximizeService.toggleFullScreen();

    modalRef.result.then(
      (result) => {
        console.log('Modal cerrado');
        // Asegúrate de salir del modo pantalla completa si es necesario
        if (this.maximizeService.navServices.fullScreen) {
          this.maximizeService.toggleFullScreen();
        }
      },
      (reason) => {
        console.log('Modal descartado');
        // Asegúrate de salir del modo pantalla completa si es necesario
        if (this.maximizeService.navServices.fullScreen) {
          this.maximizeService.toggleFullScreen();
        }
      }
    );
  }


}