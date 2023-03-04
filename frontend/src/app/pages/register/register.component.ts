import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { User } from 'src/app/models/users';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private servis: UserServiceService) { }

  ngOnInit(): void {
  }

  me: User

  name: String
  surname: String
  username: String
  password: String
  password2: String
  phone: String
  email: String
  organizationName: String = ""
  organizationCountry: String = ""
  organizationCity: String = ""
  organizationPostalcode: String = ""
  organizationStreet: String = ""
  tax: String = ""
  status: String

  picture:Observable<any>
  base64: any = ""
  
  passwordRegEx: RegExp = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)
  // emailRegEx: RegExp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi)
  message: String

  // fileChange($event: Event){ // ne moze ako kazem da je funkcija

  fileChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement
    const file: File = (target.files as FileList)[0];
    console.log(file)

    this.convertToBase64(file)
  }

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
      })

      observable.subscribe((res)=>{
        console.log(res)
        this.picture = res
        this.base64 = res
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

  register(){
    if(this.name == null || this.surname == null || this.username == null || this.password == null || this.phone == null || this.email == null) {
      this.message = "* is required field"
      return
    }

    // this.message = "koca"
    if(!this.passwordRegEx.test(this.password.toString())){
      this.message = "Your password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and must be between 8 and 16 characters long."
      return
    }

    if(!this.email.includes("@")){
      this.message = "Please enter a valid email address"
      return
    }

    if(this.password != this.password2){
      this.message = "You didnt enter the same password in both fields. Please try again."
      return
    }


   this.me = JSON.parse(localStorage.getItem("ulogovan"))
   if(this.me.type == "admin"){
    this.status = "active"
   }else{
    this.status = "pending"
   }

   this.message = ""

    this.servis.register(this.name, this.surname, this.username, this.password, this.phone, this.email, //obavezna polja
      this.organizationName, this.organizationCountry,this.organizationCity, this.organizationPostalcode,
      this.organizationStreet, this.tax, this.base64, this.status).subscribe((resp)=>{
            this.message=resp['message']
        })
  }

}