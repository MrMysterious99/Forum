import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { Workshop } from 'src/app/models/workshops';
import { WorkshopsServiceService } from 'src/app/services/workshops-service.service';
import nodemailer from "nodemailer";

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {

  constructor(private servis: WorkshopsServiceService, private ruter: Router) { }

  ngOnInit(): void {
    this.me = JSON.parse(localStorage.getItem("ulogovan"))
    this.loadWorkshops()

    this.loadPrijave()
  }

  radionice: Workshop[]
  prijave: Workshop[] = []
  searchParam: String
  me: User
  today: Date = new Date(Date.now())

  fixDate(radionice){
      radionice.forEach((radionica)=>{
      radionica.date = new Date(radionica.date)
      this.fixID(radionica)
    })
  }

  fixID(work){
    work.id = work._id
  }

  loadWorkshops(){
    this.servis.getAllWorkshops().subscribe((w: Workshop[])=>{
      this.radionice = w;
      this.fixDate(this.radionice)
      this.radionice = this.radionice.filter(radionica=>{
        return radionica.approved == "approved"
      })
      sessionStorage.setItem("radionice", JSON.stringify(this.radionice));
    })
  }

  loadPrijave(){
    this.servis.getAllWorkshops().subscribe((w: Workshop[])=>{
      w.forEach(rad=>{
        rad.date = new Date(rad.date)
      })
      w.forEach(radionica =>{
        if(radionica.date > new Date(Date.now())){
          radionica.participants.forEach(part=>{
            // ako treba samo one koje su odobrene/neodobrene samo dodam ovaj uslov:  && part.approved==true
            if(part.username == this.me.username) this.prijave.push(radionica)
          })
        }
        
      })
      this.fixDate(this.prijave)
      sessionStorage.setItem("prijave", JSON.stringify(this.prijave));

    })
  }


  like(workshops){
    this.servis.likeWorkshop(workshops._id, this.me.username).subscribe((response)=>{
      if(response["msg"]){
        this.loadWorkshops()
      }
    })
  }

  search(){
    this.radionice = JSON.parse(sessionStorage.getItem("radionice")).filter(rad => rad.name.toLowerCase().includes(this.searchParam.toLowerCase()) || rad.location.toLowerCase().includes(this.searchParam.toLowerCase()));
    this.prijave = JSON.parse(sessionStorage.getItem("prijave")).filter(rad => rad.name.toLowerCase().includes(this.searchParam.toLowerCase()) || rad.location.toLowerCase().includes(this.searchParam.toLowerCase()));
    
    this.fixDate(this.radionice)
    this.fixDate(this.prijave)
  }

  sortName(){
    // this.radionice = this.radionice.sort((one, two) => (one < two ? -1 : 1))
    this.radionice.sort((a, b) => a.name.localeCompare(b.name))
    sessionStorage.setItem("radionice", JSON.stringify(this.radionice));

  }

  sortDate(){
    this.radionice = this.radionice.sort((a,b)=>{
      if(a.date<b.date){
        return -1;
      }else{
        if(a.date==b.date){
          return 0;
        }
        else{
          return 1;
        }
      }
    });
    sessionStorage.setItem("radionice", JSON.stringify(this.radionice));
  }


  cancelWorkshop(name){

  //   const transporter = nodemailer.createTransport({
  //     service: "hotmail",
  //     auth: {user: "kocapia@outlook.com", pass: "piapia3000"}});

  //   const options = {
  //     from: "kocapia@outlook.com",
  //     to: "kocicn911@gmail.com",
  //     subject: "Workshops.pia notification. Canceled workshop",
  //     text: "We are sorry to inform you that workshop: " + name + " is canceled."
  //  };
   

  //   transporter.sendMail(options, function(err, info){
  //     if(err){
  //       console.log(err);
  //       return
  //     }
  //     console.log("Sent: " + info.response)
  //   })


  }




}
