import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SkipSelf } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { User } from 'src/app/models/users';
import { ChatServiceService } from 'src/app/services/chat-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private servis: ChatServiceService, private http: HttpClient) { }

  ngOnInit(): void {
    this.me = JSON.parse(localStorage.getItem("ulogovan"))
    this.loadChatsFirst()
    
    var self = this
    setInterval(()=>{
      self.loadChats()
    }, 500);
    
  }

  self = this
  chats: Chat[]
  showChat: Chat
  novaPoruka: String
  me: User



  loadChatsFirst(){
    // alert("load")
    this.servis.getChats(this.me.username).subscribe((c: Chat[])=>{
      this.chats = c;
      this.fixDate()
      let messageBody =  document.getElementById('skrolovanje')
      // messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
      this.showChat = c[0]
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    })
  }

  loadChats(){
    // alert("load")
    this.servis.getChats(this.me.username).subscribe((c: Chat[])=>{
      this.chats = c;
      this.fixDate()
    })

  }

  fixDate(){
    this.chats.forEach((chat)=>{
      chat.active = false

      chat.messages.forEach(msg => {
        msg.time = new Date(msg.time)
      });
  })
}

  setActive(chat){
    this.chats.forEach((chat)=>{
      chat.active=false
    })
    chat.active = true
  }

  changeChat(chat){
    this.showChat = chat
  }

  

  sendMsg(){
    let messageBody =  document.getElementById('skrolovanje')
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

    let a = this.showChat.userA
    let b = this.showChat.userB
    let sender = this.me.username
    let time  = new Date()
    let text = this.novaPoruka
    if(text=="" || text == null) return
    
    this.servis.sendMessage(a, b, sender, time, text).subscribe((response)=>{
      if(response["msg"]){
        this.loadChats()
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
      }
    })

  }





}
