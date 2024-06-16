import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/domain/loader.service';
import Typed from 'typed.js';

@Component({
  selector: 'app-waiting-area',
  templateUrl: './waiting-area.component.html',
  styleUrls: ['./waiting-area.component.scss']
})
export class WaitingAreaComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('typedElement') typedElement: ElementRef;
  @Input() loadingMessage: string = 'Estamos generando tu entrevista...';
  
  public loading = true;

  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loaderService.show();
  }

  ngAfterViewInit() {
    this.showWaittingText();
  }

  ngOnDestroy(): void {
    this.loaderService.hide();
  }

  showWaittingText() {
      setTimeout(() => {
        const messageId = `typewriter-${1}`;
        this.initTypedEffect(`#${messageId}`, this.loadingMessage);
      }, 100);

  }

  initTypedEffect(elementId: string, text: string) {
    new Typed(elementId, {
      strings: [text],
      typeSpeed: 35,
      showCursor: false,
      loop: true
    });
  }
}
