import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '@shared/service/login.service';

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
    private loginService: LoginService,
    ) { }

  ngOnInit(): void {}

  login(): void {
    this.loginService.login();
  }

  register(): void {
    this.router.navigate(['registro']);
  }
}
