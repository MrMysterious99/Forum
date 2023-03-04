import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { WorkshopsComponent } from 'src/app/pages/workshops/workshops.component';
import { WorkshopsServiceService } from 'src/app/services/workshops-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private servisWorkshop: WorkshopsServiceService) { }

  ngOnInit(): void {
    // this.me = JSON.parse(localStorage.getItem("ulogovan"))
  }

  search(){
    // new WorkshopsComponent(this.servisWorkshop, this.router).search(this.searchText);
  }

  searchText: String

  logout(){
    localStorage.clear();
    this.router.navigate([''])
  }
  
  // me: User

}
