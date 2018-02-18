import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';



@Injectable()
export class UsersService {

    constructor(private http:Http) {}
   
    urlBase: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';
   

    public getUsers(){ 
     
            this.http.get(`${this.urlBase}/users`);  
    } 
    
   
}
