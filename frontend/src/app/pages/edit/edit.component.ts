import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { User } from 'src/app/models/users';
import { Workshop } from 'src/app/models/workshops';
import { WorkshopsServiceService } from 'src/app/services/workshops-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private param: ActivatedRoute, private servis: WorkshopsServiceService) { }

  ngOnInit(): void {
    this.me = JSON.parse(localStorage.getItem("ulogovan"))
    this.id = this.param.snapshot.paramMap.get('id')

    this.servis.getAllWorkshops().subscribe((w: Workshop[])=>{
      this.workshop = w.find((work)=>{
        this.fixID(work)
        return work.id == this.id
      })
      this.workshop.date = new Date(this.workshop.date)
      this.workshop.id = this.id
      this.picture = this.workshop.photo
      this.getPrijave()
    })


  }

  id: any
  workshop: Workshop
  prijavljeni: String[] = []
  me: User
  message: string

  fixID(work){
    work.id = work._id
  }

  getPrijave(){
    this.workshop.participants.forEach(prijava=>{
      if(prijava.approved == "pending"){
        this.prijavljeni.push(prijava.username)
      }
    })
  }

  approve(user){
    this.servis.approve(this.workshop.id, user).subscribe((response)=>{
      if(response["msg"]){
        console.log(response["msg"])
      }
      this.prijavljeni.length = 0
      this.getPrijave()

    })
  }

  approveWorkshop(user){
    // this.servis.approve(this.workshop.id, user).subscribe((response)=>{
    //   if(response["msg"]){
    //     console.log(response["msg"])
    //   }
    //   this.prijavljeni.length = 0
    //   this.getPrijave()

    // })
  }

  reject(user){
    this.servis.reject(this.workshop.id, user).subscribe((response)=>{
      if(response["msg"]){
        console.log(response["msg"])
      }
      this.prijavljeni.length = 0
      this.getPrijave()
    })
  }


  deleteButton(i){
    let tmp = this.workshop.gallery[i]
    this.workshop.gallery.forEach((item, index)=>{
      if(item == tmp) this.workshop.gallery.splice(index, 1)
    })
  }



  //slika:
  picture:Observable<any>
  base64: any = ""

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

  saveEdit(){
    console.log(this.workshop)

    this.servis.saveEdit(this.workshop).subscribe((response)=>{
      if(response["msg"]){
        console.log(response["msg"])
      }
    })
  }


  saveAsTemplate(){
    const jsonString = JSON.stringify(this.workshop);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = this.workshop.name + "_template.json";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
