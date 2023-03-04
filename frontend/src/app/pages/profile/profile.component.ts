import { Component, OnInit } from '@angular/core';
import { mojKomentar } from 'src/app/models/mojKomentar';
import { User } from 'src/app/models/users';
import { Workshop } from 'src/app/models/workshops';
import { UserServiceService } from 'src/app/services/user-service.service';
import { WorkshopsServiceService } from 'src/app/services/workshops-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private workshopServis: WorkshopsServiceService, private usersService: UserServiceService) { }

  ngOnInit(): void {
    this.me = JSON.parse(localStorage.getItem("ulogovan"))
    this.fixID(this.me)
    this.loadWorkshops()
    this.loadWorkshopsAdmin()
    this.loadComments()
    this.loadLikes()
    this.loadUsers()
  }

  me: User
  radionice: Workshop[] = []
  sveRadionice: Workshop[] = []
  liked: Workshop[] = []
  comments: mojKomentar[] = []
  users: User[] = []

  loadWorkshopsAdmin(){
    this.workshopServis.getAllWorkshops().subscribe((w: Workshop[])=>{
      w.forEach(rad=>{
        rad.date = new Date(rad.date)
        this.fixID(rad)
      })
      this.sveRadionice = w
      this.fixDateAdmin()
      sessionStorage.setItem("radioniceAdmin", JSON.stringify(this.sveRadionice));
    })
  }

approveWorkshop(id){
  this.workshopServis.approveWokshop(id).subscribe((response)=>{
    if(response["msg"]){
      console.log(response["msg"])
    }
    this.loadWorkshopsAdmin()

  })
}

deleteWorkshop(id){
  alert(id)
  return
  this.workshopServis.deleteWorkshop(id).subscribe((response)=>{
    if(response["msg"]){
      console.log(response["msg"])
    }
    this.loadWorkshopsAdmin()

  })
}

deleteUser(id){
  return
  this.usersService.deleteUser(id).subscribe((response)=>{
    if(response["msg"]){
      console.log(response["msg"])
    }
    this.loadWorkshopsAdmin()

  })
}

  loadUsers(){
    this.usersService.getAllUsers().subscribe((users: User[])=>{
      this.users = users.filter(user=>{
        return user.type != 'admin'
      })
      this.users.forEach(user=>{
        this.fixID(user)
      })
    })
  }


  loadWorkshops(){
    this.workshopServis.getAllWorkshops().subscribe((w: Workshop[])=>{
      w.forEach(rad=>{
        rad.date = new Date(rad.date)
      })
      w.forEach(radionica =>{
        if(radionica.date < new Date(Date.now())){
          radionica.participants.forEach(part=>{
            if(part.username == this.me.username && part.approved=="approved") this.radionice.push(radionica)
          })
        }
        
      })
      this.fixDate()
      sessionStorage.setItem("radionice", JSON.stringify(this.radionice));

    })
  }

  loadLikes(){
    this.workshopServis.getAllWorkshops().subscribe((w:Workshop[])=>{
      w.forEach((radionica)=>{
        radionica.date = new Date(radionica.date)
        this.fixID(radionica)
      })
      w.forEach(ww=>{
        ww.likes.forEach(like=>{
          if(like.username == this.me.username) this.liked.push(ww)
        })
      })
    })
  }


  loadComments(){
    this.workshopServis.getAllWorkshops().subscribe((w:Workshop[])=>{
      w.forEach((radionica)=>{
        radionica.date = new Date(radionica.date)
        this.fixID(radionica)
      })
      w.forEach((ww)=>{
        ww.comments.forEach(com=>{
          if(com.username == this.me.username){
            let komentar: mojKomentar = {
              workshop:ww,
              komentar:com
            }

            this.comments.push(komentar)
          }
        })
      })
      this.comments.forEach(kom=>{
        kom.komentar.date = new Date(kom.komentar.date)
      })
    })
  }

  fixDateAdmin(){
    this.sveRadionice.forEach((radionica)=>{
    radionica.date = new Date(radionica.date)
    this.fixID(radionica)
  })
}

  fixDate(){
    this.radionice.forEach((radionica)=>{
    radionica.date = new Date(radionica.date)
    this.fixID(radionica)
  })
}

fixID(work){
  work.id = work._id
}

sortName(){
  this.radionice.sort((a, b) => a.name.localeCompare(b.name))
  sessionStorage.setItem("radionice", JSON.stringify(this.radionice));
}

sortLocation(){
  this.radionice.sort((a, b) => a.location.localeCompare(b.location))
  sessionStorage.setItem("radionice", JSON.stringify(this.radionice));
}

sortBasicInfo(){
  this.radionice.sort((a, b) => a.basicinfo.localeCompare(b.basicinfo))
  sessionStorage.setItem("radionice", JSON.stringify(this.radionice));
}

sortCreator(){
  this.radionice.sort((a, b) => a.creator.localeCompare(b.creator))
  sessionStorage.setItem("radionice", JSON.stringify(this.radionice));
}

sortLikes(){
  this.radionice = this.radionice.sort((a,b)=>{
    if(a.likes<b.likes){
      return -1;
    }else{
      if(a.likes==b.likes){
        return 0;
      }
      else{
        return 1;
      }
    }
  });
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

}
