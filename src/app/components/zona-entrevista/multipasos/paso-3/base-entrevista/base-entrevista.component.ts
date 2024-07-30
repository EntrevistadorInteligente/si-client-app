import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RespuestaComentarioDto } from 'src/app/shared/model/respuesta-dto';
import { EntrevistaService } from 'src/app/shared/services/domain/entrevista.service';

@Component({
  selector: 'app-base-entrevista',
  templateUrl: './base-entrevista.component.html',
  styleUrl: './base-entrevista.component.scss'
})
export abstract class BaseEntrevistaComponent implements OnInit {
  @Input() idEntrevista: string;
  @Output() respuestasEntrevista = new EventEmitter<RespuestaComentarioDto[]>();

  public messages: any[] = [];
  public userMessage: string = '';
  public botTyping: boolean = false;
  public interviewFinished: boolean = false;
  public currentTime: string = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  protected constructor(
    protected entrevistaService: EntrevistaService
  ) {}

  ngOnInit(): void {
    this.initializeInterview();
  }

  initializeInterview(): void {
    this.entrevistaService.initializeInterview(this.idEntrevista).subscribe({
      next: () => {
        this.messages = this.entrevistaService.getMessages();
        if (this.entrevistaService.isFirstInteractionCheck()) {
          this.processAssistantResponse(this.entrevistaService.getLastAssistantResponse());
        } else {

          if(this.entrevistaService.isHistoryLoadedCheck()){
            this.handleHistoryLoaded();
          }else {
            this.showNextQuestion();
          }       
        }
      },
      error: (error: any) => console.error(error)
    });
  }

  abstract showNextQuestion(): void;

  abstract processAssistantResponse(response: string): void;

  abstract handleUserResponse(response: string): void;
  
  abstract handleHistoryLoaded(): void;

  endInterview(): void {
    this.interviewFinished = true;
    this.currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  finalizeInterview(): void {
    this.respuestasEntrevista.emit(this.entrevistaService.getRespuestas());
  }

  abstract sendMessage(): void;
}
