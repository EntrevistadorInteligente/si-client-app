import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-waiting-area',
  templateUrl: './waiting-area.component.html',
  styleUrls: ['./waiting-area.component.scss']
})
export class WaitingAreaComponent implements OnInit, AfterViewInit {
  @ViewChild('typedElement') typedElement: ElementRef;
  @Input() loadingMessage: string = 'Estamos generando tu entrevista...';
  
  public loading = true;

  constructor(
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.showWaittingText();
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
