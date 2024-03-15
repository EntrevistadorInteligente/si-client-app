import { Component, OnInit, inject } from '@angular/core';
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

  form?: FormGroup;

  constructor() {}

  ngOnInit(): void {

  }

}
