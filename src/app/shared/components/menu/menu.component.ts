import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@shared/service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent implements OnInit {

  @Input() isLogged: boolean;
  @Input() isAdmin: boolean;
  @Input() username: string;

  isMenuOpen = false;
  activo: string = '';
  avatarUrl: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  login(): void {
    this.isLogged = true;
    this.username = '';
    console.log('Bienvenido');
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.isLogged = false;
    this.isAdmin = false;
    console.log('Sesión cerrada');
    this.router.navigate(['/home']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setActiveLink(link: string): void {
    this.activo = link;
  }
}
