import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Typed from 'typed.js';

import { NotificationCommunicationService } from 'src/app/shared/services/domain/notification-communication.service';

@Component({
  selector: 'app-waiting-area',
  templateUrl: './waiting-area.component.html',
  styleUrls: ['./waiting-area.component.scss'],
})
export class WaitingAreaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('typedElement') typedElement: ElementRef;
  @Input() loadingMessage: string = '';

  public currentImageIndex: number = 0;
  public successMessage: string = '';

  public images: string[] = [
    'assets/gifs/candidates-scene.gif',
    'assets/gifs/interview-scene.gif',
    'assets/gifs/success-scene.gif',
  ];

  private subscription: Subscription;

  constructor(
    private notificationCommService: NotificationCommunicationService
  ) {}

  ngOnInit() {
    this.startImageRotation();
    this.subscription = this.notificationCommService.message$.subscribe(
      message => this.handleReceivedMessage(message)
    );
  }

  ngAfterViewInit() {
    this.showWaittingText();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
      loop: true,
    });
  }

  startImageRotation() {
    setTimeout(() => {
      this.currentImageIndex = 1;
    }, 3500);
  }

  handleReceivedMessage(message: string) {
    this.currentImageIndex = message ? 2 : 0;
    this.successMessage = message || '';
  }
}
