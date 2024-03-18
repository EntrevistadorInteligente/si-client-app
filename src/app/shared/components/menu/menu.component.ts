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
  activo: string = "home";
  avatarUrl: string = '';

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

  setActiveLink(link: string): void {
    this.activo = link;
  }

  onAvatarSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result; // Actualiza la URL del avatar con la nueva imagen seleccionada
      };
      reader.readAsDataURL(file);
    }
  }

}
