import { Component, HostBinding, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from './shared/services/auth/auth.service';
import { OfflineService } from './shared/services/offline/offline.service';
import { NetworkService } from './shared/services/network/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLogged: boolean;
  isAdmin: boolean;
  online: boolean = true;
  offlineMessage: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService,
    private networkService: NetworkService,
    private offlineService: OfflineService,
    private keycloakService: KeycloakService,
    private authService:AuthService) {
    
  }
  ngOnInit(): void {
    this.networkService.online$.subscribe((online: any) => {
      this.online = online;
      if (online) {
        this.offlineMessage = '';
      }
    });

    this.offlineService.offlineMessage$.subscribe((message: any) => {
      this.offlineMessage = message;
    });

    this.checkLogin();
    this.subscribeToLoginChanges();
  }

  private checkLogin() {
    try {
      const isLoggedIn = this.keycloakService.isLoggedIn();
      
      if (isLoggedIn) {
        const isTokenExpired = this.keycloakService.isTokenExpired();
        this.isLogged = !isTokenExpired;
      } else {
        this.isLogged = false;
      }
      
      this.authService.setIsLogged(this.isLogged);
    } catch (error) {
      console.error('Error checking login status:', error);
      this.isLogged = false;
      this.authService.setIsLogged(this.isLogged);
    }
  }

  private subscribeToLoginChanges(): void {
    this.authService.isLogged$.subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
  }


  @HostBinding('@.disabled')
  public animationsDisabled = false;

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }


  toggleAnimations() {
    this.animationsDisabled = !this.animationsDisabled;
  }

  
}
