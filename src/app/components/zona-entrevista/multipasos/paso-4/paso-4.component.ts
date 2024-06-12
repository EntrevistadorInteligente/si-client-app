import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FeedbackService } from 'src/app/shared/services/domain/feedback.service';
import * as data from '../../../../shared/data/animation/ribbons';

@Component({
  selector: 'app-paso-4',
  templateUrl: './paso-4.component.html',
  styleUrl: './paso-4.component.scss'
})

export class Paso4Component implements OnInit {
  public ribbon = data.ribbons
  public ribbonColor = data.ribbonColor
  @Input() idEntrevista: string;
  feedbackItems: any[] = [];
  paginationSide = "center";
  currentIndex: number = 0;
  pageSize: number = 1;
  maxPagesToShow: number = 5;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.obtenerFeedback(this.idEntrevista);
    
  }

  get currentFeedback() {
    return this.feedbackItems.slice(this.currentIndex, this.currentIndex + this.pageSize);
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

  changePage(index: number): void {
    if (index >= 0 && index < this.totalPages) {
      this.currentIndex = index;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.feedbackItems.length / this.pageSize);
  }

  get pages(): number[] {
    const half = Math.floor(this.maxPagesToShow / 2);
    let start = Math.max(0, this.currentIndex - half);
    let end = Math.min(this.totalPages, start + this.maxPagesToShow);

    if (end - start < this.maxPagesToShow) {
      start = Math.max(0, end - this.maxPagesToShow);
    }

    return Array.from({ length: end - start }, (_, i) => start + i + 1);
  }
}