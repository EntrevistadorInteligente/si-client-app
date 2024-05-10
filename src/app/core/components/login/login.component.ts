import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@shared/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{

  @Input() isLogged: boolean;

  form?: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {}

  login(): void {
    this.authService.login();
  }

  register(): void {
    this.router.navigate(['registro']);
  }
}
