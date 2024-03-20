import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);
  @Input() isLogged: boolean;

  form?: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  login(): void {
    this.isLogged = true;
    this.router.navigate(['/inicio']);
  }
}
