import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.scss']
})
export class ChatAppComponent implements OnInit {
  public clickedEvent: any;
  constructor() { }

  ngOnInit(): void {
  }

  childEventClicked(user: Event) {
    this.clickedEvent = user;
  }
}
