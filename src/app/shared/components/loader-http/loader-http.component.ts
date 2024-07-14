import { Component } from '@angular/core';
import { LoaderService } from '../../services/domain/loader.service';

@Component({
  selector: 'app-loader-http',
  templateUrl: './loader-http.component.html',
  styleUrl: './loader-http.component.scss'
})
export class LoaderHttpComponent {
  isLoading: boolean;
  constructor(private loaderService: LoaderService) {}
  ngOnInit() {
    this.loaderService.isLoading$.subscribe(isLoading => this.isLoading = isLoading);

  }
}
