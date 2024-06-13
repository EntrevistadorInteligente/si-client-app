import { Component, OnInit } from '@angular/core';
import { ChatUsers } from 'src/app/shared/model/chat.model';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
@Component({
  selector: 'app-users-chats',
  templateUrl: './users-chats.component.html',
  styleUrls: ['./users-chats.component.scss']
})
export class UsersChatsComponent implements OnInit {
  public profile : any;
  public users: ChatUsers[] = []
  public searchUsers: ChatUsers[] = []
  public id: any;
  public chatUser: any;
  public chats: any;


  //get chat data
  constructor(private chatService: ChatService) {
    this.chatService.getUsers().subscribe(users => { 
      this.searchUsers = users
      this.users = users 
    })
   }

  ngOnInit(): void {
    this.getProfile()
    this.userChat(this.id)
  }

  public getProfile() {
    this.chatService.getCurrentUser().subscribe(userProfile => this.profile = userProfile)
  }

  searchTerm(term: any) {
    if(!term) return this.searchUsers = this.users
    term = term.toLowerCase();
    let user: ChatUsers[] = []
    this.users.filter(users => {
      if(users?.name?.toLowerCase().includes(term)) {
        user.push(users)
      } 
    })
    this.searchUsers = user
    return
  }

  public userChat(id:any =1){    
    this.chatService.chatToUser(id).subscribe(chatUser => this.chatUser = chatUser)
    this.chatService.getChatHistory(id).subscribe(chats => this.chats = chats)
  }
}
