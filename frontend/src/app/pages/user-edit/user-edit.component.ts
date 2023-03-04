import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscriber } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/users';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(private param: ActivatedRoute, private servis: UserServiceService) { }

  ngOnInit(): void {

    this.id = this.param.snapshot.paramMap.get('id')
    this.flag = this.param.snapshot.paramMap.get('me')
    this.servis.getAllUsers().subscribe((u: User[])=>{

      this.user = u.find((usr)=>{
        this.fixID(usr)
        return usr.id == this.id
      })
    })
  }

  id: any
  flag: any
  user: User
  message: string
  password2: String

  fileChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement
    const file: File = (target.files as FileList)[0];
    console.log(file)

    this.convertToBase64(file)
  }

  fixID(work){
    work.id = work._id
  }

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
      })

      observable.subscribe((res)=>{
        console.log(res)
        this.user.photo = res
      })
  }
  
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader () ;

    filereader.readAsDataURL(file)

    filereader.onload = () =>{
      subscriber.next(filereader.result);
      subscriber.complete()
    }

    filereader.onerror = () =>{
      subscriber.error()
      subscriber.complete()
    }
  }
  
  saveUserEdit(){
    if(this.user.password != this.password2){
      this.message = "You didnt enter the same password in both fields. Please try again."
      return
    }

    console.log(this.user)
    if(this.flag == 'yes') {
      localStorage.setItem("ulogovan", JSON.stringify(this.user));
    }

    this.servis.saveEdit(this.user).subscribe((response)=>{
      if(response["msg"]){
        console.log(response["msg"])
      }
    })
  }

}
