import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { Workshop } from 'src/app/models/workshops';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { WorkshopsServiceService } from 'src/app/services/workshops-service.service';

@Component({
  selector: 'app-workshop-info',
  templateUrl: './workshop-info.component.html',
  styleUrls: ['./workshop-info.component.css']
})
export class WorkshopInfoComponent implements OnInit {

  constructor(private param: ActivatedRoute, private workshop_servis: WorkshopsServiceService, private chat_service: ChatServiceService, private router: Router) { }

  ngOnInit(): void {
    this.me = JSON.parse(localStorage.getItem("ulogovan"))

    // trazenje radionice sa mojim id i popravljanje ID i datuma
    this.id = this.param.snapshot.paramMap.get('id')
    this.workshop_servis.getAllWorkshops().subscribe((w: Workshop[])=>{
      w.forEach((radionica)=>{
        radionica.date = new Date(radionica.date)
        if(radionica.gallery == null) radionica.gallery=null
      })
      this.workshop = w.find((work)=>{
        this.fixID(work)
        return work.id == this.id
      })
      this.workshop.participants.forEach(p=>{
        if(p.username == this.me.username) this.signedIn = true
      })
      this.fixDate()
      // alert(this.workshop.approved)
    })
  }

  fixID(work){
    work.id = work._id
  }

  fixDate(){
    this.workshop.comments.forEach(com=>{
      com.date = new Date(com.date)
    })
}

  id: any
  workshop: Workshop
  me: User
  signedIn: boolean = false

  initChat(){
    let a = this.me.username
    let b = this.workshop.creator
    this.chat_service.openChat(a, b).subscribe((response)=>{
      if(response["msg"]){
        console.log(response["msg"])
      }
    })
    this.router.navigate(['/chat'])
  }

  signUp(){
    this.workshop_servis.signUp(this.workshop.id, this.me.username).subscribe((response)=>{
      if(response["msg"]){{
        this.router.navigate(['/workshops'])
      }
      }
    })
  }




  
}
