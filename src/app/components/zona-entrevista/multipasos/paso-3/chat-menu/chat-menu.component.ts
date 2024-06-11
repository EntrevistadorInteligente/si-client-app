import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss']
})
export class ChatMenuComponent implements OnInit {
  public openTab : string = "call";

  // data
  public calls = undefined//chatData.ChatDB.call

  constructor() { }

  public tabbed(val: string) {
  	this.openTab = val
  }
  
  ngOnInit(): void {
  }

}
