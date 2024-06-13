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
    this.users = [
      { id: 1, name: 'Ethan Gonzalez', authenticate: 0, avatar: 'assets/images/ethan.jpg' },
      { id: 2, name: 'Bryan Wallace', authenticate: 0, avatar: 'assets/images/bryan.jpg' },
      { id: 3, name: 'Avery Stewart', authenticate: 0, avatar: 'assets/images/avery.jpg' },
      { id: 4, name: 'Katie Peterson', authenticate: 0, avatar: 'assets/images/katie.jpg' },
      { id: 5, name: 'Ray Edwards', authenticate: 0, avatar: 'assets/images/ray.jpg' }
    ];

    this.chat = [
      {
        id: 1,
        userId: 1,
        messages: [
          { text: 'Hi there!', sender: 1, date: new Date() },
          { text: 'Hello', sender: 0, date: new Date() }
        ]
      },
      {
        id: 2,
        userId: 2,
        messages: [
          { text: 'Hi there!', sender: 2, date: new Date() },
          { text: 'Hello', sender: 0, date: new Date() }
        ]
      },
      {
        id: 3,
        userId: 3,
        messages: [
          { text: 'Hi there!', sender: 3, date: new Date() },
          { text: 'Hello', sender: 0, date: new Date() }
        ]
      },
      {
        id: 4,
        userId: 4,
        messages: [
          { text: 'Hi there!', sender: 4, date: new Date() },
          { text: 'Hello', sender: 0, date: new Date() }
        ]
      },
      {
        id: 5,
        userId: 5,
        messages: [
          { text: 'Hi there!', sender: 5, date: new Date() },
          { text: 'Hello', sender: 0, date: new Date() }
        ]
      }
    ];
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
