import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LayoutService } from 'src/app/shared/services/layout/layout.service';
import { NavService } from 'src/app/shared/services/nav.service';
import { MaximizeService } from 'src/app/shared/services/domain/maximize.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public dark: boolean;
  isLogged: boolean = false;

  collapseSidebar: boolean = true;
    constructor(private navServices: NavService, public layout: LayoutService, 
      private authService: AuthService,
      private maximizeService: MaximizeService
    ) {
      this.dark = this.layout.config.settings.layout_version == 'dark-only';
  }

  sidebarToggle( ) {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }

  layoutToggle() {
    this.dark = !this.dark;
    this.layout.config.settings.layout_version = this.dark ? 'dark-only' : 'light';
  }

  searchToggle(){
    this.navServices.search = true;
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe(isLogged => {
      this.isLogged = isLogged;
    });
  }

  maximize() {
    this.maximizeService.toggleFullScreen();
  }
  
}
