import { Component } from '@angular/core';
import { LoaderService } from '@core/service/loader/loader.service';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})

export class LoaderComponent {

  constructor(public loaderService: LoaderService){}

  loaderVisible: boolean;

  showLoader(): void {
    this.loaderVisible = true;
  }

  hideLoader(): void {
    this.loaderVisible = false;
  }
}
