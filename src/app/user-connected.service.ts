import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import{ userInterface } from './Interfaces/userInterface'
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class UserConnectedService {
  urlBase = "https://reseau.jdedev.fr/api/user"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  userConnected?:userInterface;
  user: { id:number, token: string } |null =JSON.parse(localStorage.getItem("user")!);
  constructor(private http:HttpClient, private router:Router) {
  }
  getUser(){
    this.user = JSON.parse(localStorage.getItem("user")!);
    if(this.user) {
      const headers = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.user.token,
        })
      }
      return this.http.get<userInterface>(this.urlBase + `/${this.user.id}`, headers)
        .subscribe(user => {
          this.userConnected = user;
        });
    }else{
      this.router.navigate(["/login"]);
      return 0;
    }
  }

  disconnect(){
    localStorage.clear();
    this.user = null;
  }

}
