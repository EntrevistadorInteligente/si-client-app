import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.loginService.login();
  }

  public logout(): void {
    this.loginService.logout();
  }

}
