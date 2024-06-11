import { Component, OnInit } from '@angular/core';
import { VistaPreviaEntrevistaDto } from 'src/app/shared/model/vista-previa-entrevista-dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  preguntas!: VistaPreviaEntrevistaDto[];
  selectedProduct!: any;

  constructor() {}

  ngOnInit() {}
}
