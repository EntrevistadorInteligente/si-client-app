import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FeedbackDto } from '@shared/model/feedback-dto';
import { FeedbackService } from '@shared/service/feedback.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-paso-4',
  templateUrl: './paso-4.component.html',
  styleUrl: './paso-4.component.scss'
})

export class Paso4Component implements OnInit {
  @Input() idEntrevista: string;
  feedbackItems: any[] = [];

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.obtenerFeedback(this.idEntrevista);
  }

  obtenerFeedback(entrevistaId: string): void {
    this.feedbackService.obtenerFeedback(entrevistaId).subscribe(
      feedback => {
        this.feedbackItems = feedback;
      },
      error => {
        console.error(error);
      }
    );
  }
}