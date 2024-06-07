import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DarkModeService {
  darkModeEnabled: boolean = false;

  constructor() {
    this.loadDarkModePreference();
  }

  toggleDarkMode() {
    this.darkModeEnabled = !this.darkModeEnabled;
    this.saveDarkModePreference();
    this.applyDarkModeStyles();
  }

  private loadDarkModePreference() {
    const darkModeSetting = localStorage.getItem('darkModeEnabled');
    this.darkModeEnabled = darkModeSetting ? JSON.parse(darkModeSetting) : false;
    this.applyDarkModeStyles();
  }

  private saveDarkModePreference() {
    localStorage.setItem('darkModeEnabled', JSON.stringify(this.darkModeEnabled));
  }

  private applyDarkModeStyles() {
    if (this.darkModeEnabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}