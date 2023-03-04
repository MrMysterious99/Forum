import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  constructor(private servis: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"))
  }

  stara: String
  nova1: String
  nova2: String
  message: String
  ulogovan: User

  changePass(){
    if(this.stara != this.ulogovan.password){
      this.message = "You entered wrong password!"
      return
    }
    if(this.nova1 != this.nova2){
      this.message = "Two new passwords you entered are the same"
      return
    }
    if(this.stara == this.nova1){
      this.message = "Your new passowrd is same like your old password"
    }

    this.servis.changePasswordService(this.ulogovan.username, this.nova1).subscribe((response)=>{
      if(response["msg"]){
        localStorage.clear();
        this.router.navigate([''])
      }
    })

  }

}
