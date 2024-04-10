import { Component, OnInit } from '@angular/core';
import { PreguntasDto } from '@shared/model/preguntas-dto';
import { AlertService } from '@shared/service/alert.service';
import { IntegradorService } from '@shared/service/integrador.service';
import { MessageService } from 'primeng/api';

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
  visible: boolean = false;


  get currentQuestion(): PreguntasDto {
    return this.questions[this.currentIndex];
  }
  get progressValue(): number {
    return (this.currentIndex + 1) / this.questions.length * 100;
  }

  constructor(private integradorService: IntegradorService, 
    private alertService:AlertService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.alertService.currentQuestions.subscribe(questions => {
      this.questions = questions;
    });
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
    console.log(this.questions)
    let esValido = false;
    this.questions.forEach(element => {
     
      if(!element.respuesta){

        this.visible= true;

      }else{
        esValido = true
      }
      
    });
    if(esValido){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Entrevista enviada con exito, estaremos generando su feedbak en un momento' });
    }
  }


  
}