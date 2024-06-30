import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  // theme layout settings
  public config = {
    settings: {
      sidebar: 'compact-wrapper',
      layout_type: 'ltr',
      layout_version: 'light-only', // default value
      sidebar_type: 'default-sidebar'
    },
    color: {
      primary_color: 'rgb(99, 98, 231)', 
      secondary_color: 'rgb(255, 197, 0)'
    }
  }

  constructor() { 
    this.loadUserPreferences();

    // layout condition
    this.applyLayoutSettings();

    // Apply dark mode based on user preferences
    this.applyDarkModeStyles();
  }

  toggleDarkMode() {
    this.config.settings.layout_version = this.config.settings.layout_version === 'dark-only' ? 'light-only' : 'dark-only';
    this.saveUserPreferences();
    this.applyDarkModeStyles();
  }

  private loadUserPreferences() {
    const darkModeSetting = localStorage.getItem('darkModeEnabled');
    if (darkModeSetting !== null) {
      this.config.settings.layout_version = JSON.parse(darkModeSetting) ? 'dark-only' : 'light-only';
    }
  }

  private saveUserPreferences() {
    const isDarkMode = this.config.settings.layout_version === 'dark-only';
    localStorage.setItem('darkModeEnabled', JSON.stringify(isDarkMode));
  }

  private applyDarkModeStyles() {
    if (this.config.settings.layout_version === 'dark-only') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  private applyLayoutSettings() {
    if(this.config.settings.layout_type === 'rtl'){
      document.getElementsByTagName('html')[0].setAttribute('dir', this.config.settings.layout_type);
      document.documentElement.style.setProperty('--theme-deafult', this.config.color.primary_color);
      document.documentElement.style.setProperty('--theme-secondary', this.config.color.secondary_color);
    }else{
      if(this.config.settings.layout_type === 'box-layout'){
        document.body.classList.add('box-layout')
      }
    }
  }
}
