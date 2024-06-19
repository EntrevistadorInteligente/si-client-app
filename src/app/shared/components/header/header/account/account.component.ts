import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public userName: string;
  public isLogged: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe(isLogged => {
      this.isLogged = isLogged;
      if (isLogged) {
        this.userName = this.authService.getUsername();
      } else {
        this.userName = '';
      }
    });
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
