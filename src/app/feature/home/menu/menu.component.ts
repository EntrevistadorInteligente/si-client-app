import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@shared/service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent implements OnInit{

  @Input() isLogged: boolean;
  @Input() isAdmin: boolean;
  @Input() username: string;
  isMenuOpen = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.isLogged = true;
    this.username = "Entrevistador";
    this.router.navigate(['/home-login']);
  }

  logout() {
    this.isLogged = false;
    this.isAdmin = false;
    this.router.navigate(['/home-sin-login']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
