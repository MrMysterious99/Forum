import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {


  uri = 'http://localhost:4000/users';

  constructor(private http: HttpClient) { }

  openChat(a, b){
    const data = {
      userA: a,
      userB: b
    }
    
    return this.http.post(`${this.uri}/openChat`, data);
  }

  getChats(username){
    const data = {
      username:username
    }

    return this.http.post(`${this.uri}/getAllChats`, data);
  }

  sendMessage(a, b, sender, time, text){
    const data = {
      a:a,
      b:b,
      sender: sender,
      time: time,
      text: text
    }

    return this.http.post(`${this.uri}/sendMessage`, data);
  }

}
