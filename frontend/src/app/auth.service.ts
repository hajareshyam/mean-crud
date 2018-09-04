import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {
  private _getUsersUrl = "http://localhost:5000/api/users";
  private _registerUrl = "http://localhost:5000/api/register";
  private _loginUrl = "http://localhost:5000/api/login";
  private _deleteUserUrl = "http://localhost:5000/api/user";
  private _updateUserUrl = "http://localhost:5000/api/user";

  constructor(private http : HttpClient,
  private _router: Router ) {}

  registerUser(user){
    return this.http.post<any>(this._registerUrl,user);
  }

  loginUser(user){
    return this.http.post<any>(this._loginUrl,user);
  }

  getUsers(){
    return this.http.get<any>(this._getUsersUrl);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

  getToken(){
    return localStorage.getItem('token');
  }

  deleteUser(id : string){
      console.log(this._deleteUserUrl + '/' + id);
      return this.http.delete(this._deleteUserUrl + `/${id}`);
  }

  onUpdate(User){
    return this.http.post<any>(this._updateUserUrl+ `/${User._id}` , User);
  }
}
