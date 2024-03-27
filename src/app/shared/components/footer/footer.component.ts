import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

export class FooterComponent {

  email = 'entrevistador@gmail.com';
  activo: string = "home";

  constructor() {}

}
