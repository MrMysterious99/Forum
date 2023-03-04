import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  uri = 'http://localhost:4000/users';

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get(`${this.uri}/getAll`);
  }


  loginService(username, password){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/login`, data);
  }

  changePasswordService(username, newPassword){
    const data = {
      username: username,
      newPassword: newPassword
    }

    return this.http.post(`${this.uri}/changePass`, data);
  }

  register(firstname, lastname, username, password, phone, email, organizationName,
     organizationCountry, organizationCity, organizationPostalcode, organizationStreet,taxNumber, picture, status){
      
    const data = {
      name: firstname,
      surname: lastname,
      username: username,
      password: password,
      email: email,
      phone: phone,
      organization: organizationName,
      country: organizationCountry,
      city : organizationCity,
      postalcode: organizationPostalcode,
      street: organizationStreet,
      taxNumber: taxNumber,
      photo: picture,
      status: status
    }
    
    return this.http.post(`${this.uri}/register`, data);
  }


  saveEdit(u: User){
    const data = {
      id:u.id,
      name: u.name,
      surname: u.surname,
      username: u.username,
      password: u.password,
      email: u.email,
      phone: u.phone,
      organization: u.organization,
      country: u.country,
      city: u.city,
      postalcode: u.postalcode,
      street: u.street,
      type: u.type,
      status: u.status,
      taxNumber: u.taxNumber,
      photo: u.photo
    }

    return this.http.post(`${this.uri}/saveEdit`, data);
  }


  deleteUser(id){
    const data = {
      id:id
    }

    return this.http.post(`${this.uri}/deleteUser`, data);
  }

}
