import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit{

  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor(){}

  ngOnInit(): void {}

  login(): void {
    this.router.navigate(['login']);
  }

  success(): void {
    this.router.navigate(['home']);
  }

}
