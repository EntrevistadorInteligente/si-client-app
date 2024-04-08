import { Component, OnInit } from '@angular/core';
import { PreguntasDto } from '@shared/model/preguntas-dto';
import { IntegradorService } from '@shared/service/integrador.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-zona-entrevista',
  templateUrl: './zona-entrevista.component.html',
  styleUrl: './zona-entrevista.component.scss'
})
export class ZonaEntrevistaComponent implements OnInit {
  questions: PreguntasDto[] = [];
  currentIndex: number = 0;
  first: number = 0;
   rows: number = 10;
  get currentQuestion(): PreguntasDto {
    return this.questions[this.currentIndex];
  }
  get progressValue(): number {
    return (this.currentIndex + 1) / this.questions.length * 100;
  }

  constructor(private integradorService: IntegradorService) { }

  ngOnInit(): void {
    this.questions = this.integradorService.getQuestions();
  }

  onPageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
}
  previousQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  submitAnswers() {
    // Submit logic here
  }
}