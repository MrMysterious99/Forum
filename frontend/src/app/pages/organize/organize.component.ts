import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { User } from 'src/app/models/users';
import { Workshop } from 'src/app/models/workshops';
import { WorkshopsServiceService } from 'src/app/services/workshops-service.service';

@Component({
  selector: 'app-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.css']
})
export class OrganizeComponent implements OnInit {

  constructor(private servis: WorkshopsServiceService) { }

  ngOnInit(): void {
    this.me = JSON.parse(localStorage.getItem("ulogovan"))
      this.workshop.gallery = []
      this.workshop.date = new Date(Date.now())
  }

  workshop: Workshop = new Workshop()
  me: User
  message: string


  openTemplate(){
    const inputElement = document.createElement('input');
    inputElement.type = 'file';

    inputElement.addEventListener('change', () => {
      const file = inputElement.files[0];

      const reader = new FileReader();
      reader.readAsText(file);

      reader.addEventListener('load', () => {
        const jsonString = reader.result;
        const jsonObject = JSON.parse(jsonString as string);
        this.workshop = jsonObject
        this.workshop.date = new Date(this.workshop.date)
        this.workshop.likes.length = 0
        this.workshop.participants.length = 0
        this.workshop.comments.length = 0

        console.log(jsonObject as Workshop);
        // document.body.removeChild(inputElement)
      });

      reader.addEventListener('error', () => {
        console.error(reader.error);
      });
    });

    // document.body.appendChild(inputElement);
    inputElement.click()
  }

  saveWorkshop(){
    this.workshop.creator = this.me.username
    let isAdmin: boolean = false
    if(this.me.type == "admin") isAdmin = true
    this.servis.proposeWorkshop(this.workshop, isAdmin).subscribe((response)=>{
      if(response["msg"]){
        console.log(response["msg"])
      }
    })
  }




  // -  - - - - - - - - --  - - - - - - - - - - - - - - --  - - - - - - - - - - - -- 


  deleteButton(i){
    let tmp = this.workshop.gallery[i]
    this.workshop.gallery.forEach((item, index)=>{
      if(item == tmp) this.workshop.gallery.splice(index, 1)
    })
  }



  //slika:
  // picture:Observable<any>
  // base64: any = ""

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

  //main photo
  fileChangeMain = ($event: Event) => {
    const target = $event.target as HTMLInputElement
    const file: File = (target.files as FileList)[0];
    console.log(file)

    this.convertToBase64Main(file)
  }

  convertToBase64Main(file: File){
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
      })

      observable.subscribe((res)=>{
        console.log(res)
        this.workshop.photo = res
        // this.picture = res
        // this.base64 = res
      })
  }

//gallery
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
        this.workshop.gallery.push({"photo":res})
        // this.picture = res
        // this.base64 = res
      })
  }


}
