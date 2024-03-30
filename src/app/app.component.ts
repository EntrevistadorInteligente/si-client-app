import { Component, OnInit } from '@angular/core';
import { NetworkService } from '@core/service/network/network.service';
import { OfflineService } from '@core/service/offline/offline.service';
import { LoginService } from '@shared/service/login.service';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';

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
    private oauthService: OAuthService,
    private loginService: LoginService,
    private networkService: NetworkService,
    private offlineService: OfflineService
  ) {
    this.configure();
  }

  ngOnInit(): void {
    this.configure();

    this.networkService.online$.subscribe((online) => {
      this.online = online;
      if (online) {
        this.offlineMessage = '';
      }
    });

    this.offlineService.offlineMessage$.subscribe((message) => {
      this.offlineMessage = message;
    });
  }

  authConfig: AuthConfig = {
    issuer: 'http://localhost:62098/realms/entrevistador',
    redirectUri: window.location.origin,
    clientId: 'front',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin())
      .then(() => {
        if (this.oauthService.getIdentityClaims()) {
          this.isLogged = this.loginService.getIsLogged();
          this.isAdmin = this.loginService.getIsAdmin();
          this.username = this.loginService.getUsername();
          this.loginService.authenticationChanged.emit(this.isLogged)
          //this.messageService.sendMessage(this.loginService.getUsername());
        }
      });
  }
}



