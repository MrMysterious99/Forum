import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workshop } from '../models/workshops';

@Injectable({
  providedIn: 'root'
})
export class WorkshopsServiceService {

  uri = 'http://localhost:4000/workshops';

  constructor(private http: HttpClient) { }

  getAllWorkshops(){
    return this.http.get(`${this.uri}/getAll`);
  }

  likeWorkshop(id, username){
    const data = {
      id: id,
      username:username
    }

    return this.http.post(`${this.uri}/like`, data);
  }
  
  search(param){
    return this.http.get(`${this.uri}/search?param=${param}`)
  }

  signUp(id, username){
    const data = {
      id:id,
      username:username
    }

    return this.http.post(`${this.uri}/signUp`, data);
  }

  approve(id, username){
    const data = {
      id:id,
      username:username
    }

    return this.http.post(`${this.uri}/approve`, data);
  }

  reject(id, username){
    const data = {
      id:id,
      username:username
    }

    return this.http.post(`${this.uri}/reject`, data);
  }

  saveEdit(w: Workshop){
    const data = {
      id:w.id,
      name: w.name,
      location: w.location,
      date: w.date,
      basicinfo: w.basicinfo,
      longinfo: w.longinfo,
      creator: w.creator,
      comments: w.comments,
      likes: w.likes,
      capacity: w.capacity,
      participants: w.participants,
      photo:w.photo,
      gallery:w.gallery,
      approved: "approved"

    }

    return this.http.post(`${this.uri}/saveEdit`, data);
  }

  
  proposeWorkshop(w: Workshop, isAdmin){
    let approved: string = "pending"
    if(isAdmin) approved = "approved"
    const data = {
      name: w.name,
      location: w.location,
      date: w.date,
      basicinfo: w.basicinfo,
      longinfo: w.longinfo,
      creator: w.creator,
      comments: [],
      likes: [],
      capacity: w.capacity,
      participants: [],
      photo:w.photo,
      gallery:w.gallery,
      approved: approved
    }

    return this.http.post(`${this.uri}/proposeWorkshop`, data);
  }

  approveWokshop(id){
    const data = {
      id:id
    }

    return this.http.post(`${this.uri}/approveWorkshop`, data);
  }

  deleteWorkshop(id){
    const data = {
      id:id
    }

    return this.http.post(`${this.uri}/deleteWorkshop`, data);
  }

}
