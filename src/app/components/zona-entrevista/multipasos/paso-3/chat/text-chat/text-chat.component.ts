import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
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
import { environment } from 'src/environments/environment';

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
    this.nameChatHistory = `${this.authService.getEmail()}_chatHistory`;
    this.speechService.initialize();
    this.lastSeenBootTyping = this.currentTime;
    this.initVoiceRecognition();
    this.interviewFinished = this.entrevistaService.isInterviewFinished();

  }

  processAssistantResponse(response: string): void {
    this.messages = this.entrevistaService.getMessages();

    const messageId = `typewriter-${this.messages.length}`;
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
    this.finalTranscript = '';
    this.showNextQuestion();
    this.saveChatHistory();
  }

  showNextQuestion(): void {
    this.botTyping = true;
    this.entrevistaService.getNextQuestion().subscribe({
      next: question => {
        this.resetMessageState();
        if (this.entrevistaService.isInterviewFinished()) {
          this.entrevistaService.getClose().subscribe({
            next: async (close) => {
              this.botTyping = false;

              this.processAssistantResponse(close);
            
              this.endInterview();
             
            },
            error: (err: any) => {
              console.log('Error getting next question:', err);
              this.botTyping = false;
            }
          });
          
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

  private resetMessageState() {
    this.userMessage = '';
    this.finalTranscript = '';
    this.voiceRecognitionService.resetRecognitionBuffer();
  }

  handleHistoryLoaded(): void {
    this.changeDetectorRef.detectChanges();
    this.insertMessageInTypewriter();
    if (this.messages.length > 0 && this.messages[this.messages.length - 1].type === 'user') {
      setTimeout(() => {
        this.showNextQuestion();
      }, 500);
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
    const textarea = this.messageInput.nativeElement;
    textarea.value = '';
    this.userMessage = '';
    this.adjustTextareaHeight(textarea);
  }

  adjustTextareaHeight(element: HTMLTextAreaElement): void {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
    this.scrollToBottom();
    element.scrollTop = element.scrollHeight;
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

      const textarea = this.messageInput.nativeElement;
      textarea.value = this.userMessage;
      this.adjustTextareaHeight(textarea);
      this.changeDetectorRef.detectChanges();
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
      const textarea = this.messageInput.nativeElement;
      this.adjustTextareaHeight(textarea);
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
    const input = event.target as HTMLTextAreaElement;
    if (input.value.length > 1000) {
      input.value = input.value.substring(0, 1000);
    }
    this.userMessage = input.value;
    this.finalTranscript = this.userMessage;
    this.adjustTextareaHeight(input);
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

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resetMessageState();
      this.resizeObserver.disconnect();
    }
  }

  openAudioChat(): void {
    const modalRef = this.modalService.open(AudioChatComponent, {
      size: 'xl',
      backdrop: 'static',
      keyboard: false
    });

    this.maximizeService.toggleFullScreen();

    modalRef.result.then(
      (result) => {
        if (this.maximizeService.navServices.fullScreen) {
          this.maximizeService.toggleFullScreen();
          this.resetMessageState();
        }
      },
      (reason) => {
        if (this.maximizeService.navServices.fullScreen) {
          this.maximizeService.toggleFullScreen();
        }
      }
    );
  }

  openVideoChat(): void {
    if(!this.interviewFinished){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      
      Swal.fire({
        title: "Ingresa la clave de prueba exclusiva de previews",
        input: "password",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "aceptar",
        showLoaderOnConfirm: true,
        preConfirm: (key) => {
          return new Promise<void>((resolve, reject) => {
            if (key === environment.previewKey) {
              resolve();
            } else {
              reject('Clave incorrecta');
            }
          });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
           // Primero, abre el modal
           const modalRef = this.modalService.open(VideoChatComponent, {
            size: 'xl',
            backdrop: 'static',
            keyboard: false
          });
          modalRef.componentInstance.idEntrevista = this.idEntrevista;
          modalRef.componentInstance.modalRef = modalRef;
          // Luego, cambia a pantalla completa
          this.maximizeService.toggleFullScreen();
  
          modalRef.result.then(
            (result) => {
              if (this.maximizeService.navServices.fullScreen) {
                this.maximizeService.toggleFullScreen();
                this.resetMessageState();
              }
            },
            (reason) => {
              if (this.maximizeService.navServices.fullScreen) {
                this.maximizeService.toggleFullScreen();
              }
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          console.log("Acción cancelada por el usuario.");
        }
      }).catch(error => {
        swalWithBootstrapButtons.fire({
          title: "Acceso denegado",
          text: "No tienes acceso a la preview. Contacta al administrador si necesitas acceso.",
          icon: "error",
          confirmButtonText: "Entendido"
        });
      });
    }else {
      Swal.fire("Tu entrevista ya finalizó. Por favor, solicita tu feedback y podrás iniciar una nueva entrevista.");
    }
   
  }

  
  closeInterview(){
    this.finalizeInterview(this.nameChatHistory);
    this.resetMessageState();
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustTextareaHeight(this.messageInput.nativeElement);
  }

}