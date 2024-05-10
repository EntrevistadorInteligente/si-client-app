import { Component, OnInit } from '@angular/core';
import { NetworkService } from '@core/service/network/network.service';
import { OfflineService } from '@core/service/offline/offline.service';
import { AuthService } from '@shared/service/auth/auth.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  title = 'landing entrevistador';
  username: string;
  isLogged: boolean;
  isAdmin: boolean;
  online: boolean = true;
  offlineMessage: string = '';

  constructor(
    private networkService: NetworkService,
    private offlineService: OfflineService,
    private keycloakService: KeycloakService,
    private authService:AuthService
  ) {
  }

  ngOnInit(): void {
    this.networkService.online$.subscribe((online) => {
      this.online = online;
      if (online) {
        this.offlineMessage = '';
      }
    });

    this.offlineService.offlineMessage$.subscribe((message) => {
      this.offlineMessage = message;
    });

    this.checkLogin();
    this.subscribeToLoginChanges();
  }

  private checkLogin(): void {
    const isLoggedIn = this.keycloakService.isLoggedIn();
      if (isLoggedIn) {
        this.isLogged = isLoggedIn;
        const userDetails = this.keycloakService.getUsername();
        this.authService.setIsLogged(this.isLogged);
        console.log(userDetails);
      }
  }

  private subscribeToLoginChanges(): void {
    this.authService.isLogged$.subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
  }
  
}



