import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit{

  private router = inject(Router);

  constructor(){}

  ngOnInit(): void {}

  login(): void {
    this.router.navigate(['login']);
  }

  success(): void {
    this.router.navigate(['home']);
  }

}
