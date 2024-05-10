import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/service/auth/auth.service';
import { DarkModeService } from '@shared/service/dark-mode.service';
import { MenuItem } from 'primeng/api';

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
  isAvatarMenuActive: boolean = false;
  message: string = '¡Bienvenid@!';
  items: MenuItem[];
  activeItem: MenuItem;

  constructor(
    private router: Router,
    private _eref: ElementRef,
    public darkModeService: DarkModeService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.isLogged = false;
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setActiveLink(link: string): void {
    this.activo = link;
  }

  onDocumentClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target) && !this.isAvatarClicked(event))
      this.isAvatarMenuActive = false;
  }

  avatarMenu() {
    this.isAvatarMenuActive = !this.isAvatarMenuActive;
  }

  isAvatarClicked(event: any): boolean {
    const avatarElement = document.querySelector('.perfil');
    return avatarElement.contains(event.target);
  }

  perfil():void {
    this.router.navigate(['perfil']);
  }

  home(): void {
    this.router.navigate(['home']);
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
