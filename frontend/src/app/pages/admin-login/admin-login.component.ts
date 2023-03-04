import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private servis: UserServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  username: String
  password: String
  type: String
  message: String

  login(){
    this.servis.loginService(this.username, this.password).subscribe((user: User)=>{
      if(user){
        if(user.status == "inactive"){
          this.message = "Your account is inactive at the moment. Please check again later"
          return
        }
        if(user.type != "admin"){
          this.message = "You are not administrator! This is hacking attempt!! Your computer will selfdestroy in 5 seconds !!!"
          return
        }
        this.message = ""
        localStorage.setItem("ulogovan", JSON.stringify(user));
        this.router.navigate(['/profile'])
      }else{
        this.message = "Something went wrong"
      }
    })
  }


}
