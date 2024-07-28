import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  template: '' // Esta componente no necesita template
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
   this.authService.login();
  }
}