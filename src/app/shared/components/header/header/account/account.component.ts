import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public userName: string;
  public profileImg: 'assets/images/dashboard/profile.jpg';

  constructor(
    private authService: AuthService
  ) { }
  ngOnInit(): void {
  }
  login(): void {
    this.authService.login();
  }

  logout(): void {
    //this.isLogged = false;
    this.authService.logout();
    //this.router.navigate(['/inicio']);
  }

}


