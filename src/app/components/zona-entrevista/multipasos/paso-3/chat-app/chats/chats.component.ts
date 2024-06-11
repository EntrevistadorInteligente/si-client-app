import { Component, OnInit } from '@angular/core';
import { ChatUsers } from 'src/app/shared/model/chat.model';
import { ChatService } from 'src/app/shared/services/chat/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  public openTab : string = "call";
  public searchUsers: ChatUsers[] = []
  public users: ChatUsers[] = []
  public chatUser: any;
  public chats: any;
  public id:any
  show = false;
  active = 1;
 
  constructor() {}

  ngOnInit(): void {  }

  // manu open
  openMenu(){
    this.show = !this.show
  }

}
