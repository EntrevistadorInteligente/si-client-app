import { Injectable } from '@angular/core';
import { BehaviorSubject, map, observable, Observable } from 'rxjs';
import { Chat, ChatUsers } from '../../model/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public chat: any[] = [];
  public users: any[] = [];
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() {
    this.chat
    this.users
   }
   
    getUsers(): Observable<ChatUsers[]> {
    const users = new Observable(observer => {
      observer.next(this.users);
      observer.complete();
    });
    return <Observable<ChatUsers[]>>users;
    
  }

   public getCurrentUser() {
    return this.getUsers().pipe(map(users => {
      return users.find((item) => {
        return item.authenticate === 0;
      });
    }));
  }


  public chatToUser(id: number) {
    return this.getUsers().pipe(map(users => {
      return users.find((item) => {
        return item.id === id;
      });
    }));
  }

  public getUserChat(): Observable<Chat[]> {
    const chat = new Observable(observer => {
      observer.next(this.chat);
      observer.complete();
    });
    return <Observable<Chat[]>>chat;
  }

  public getChatHistory(id: number) {
    return this.getUserChat().pipe(map(users => {
      return users.find((item) => {
        return item.id === id;
      });
    }));
  }

  getUserData(){
    const data = new Observable(d =>{
      d.next(this.users)
    })
  } 
}
