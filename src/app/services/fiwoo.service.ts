import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class FiwooService {
  

  constructor(private http: Http) { }

  urlBase: string = 'https://platform.fiwoo.eu/api';


  // users service

  // GET USERS

  private getUsers():void{
    this.http.get(`${this.urlBase}/user-management/users/users`).subscribe(
      data => {          
          let users: any[] = data.json();     
          console.log('Fiwoo getUsers: ', users);  
        },
      err => {        
        console.log(err);          
      } 
    );  
  }

  // POST USERS

  // DELETE USERS


  // assets service

  // roles service

  // devices service

  // templates service

  // 
}
