import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from '../../models/users'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
        if(user.status == "pending"){
          this.message = "Your account is inactive at the moment. Please check again later"
          return
        }
        if(user.type == "admin"){
          this.message = "You are the administrator, please proceed to your top secret login page"
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
