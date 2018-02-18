import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from "um_fiwoo";

let headers = new Headers();

@Injectable()
export class FiwooService {  


  constructor(private http: Http) { 
    
    
    let token = localStorage.getItem('access_token');    
    // headers.append('Content-Type', 'application/json');
     headers.append('Authorization', 'Bearer '+ token );

    console.log('Headers: ', headers);
  }

   urlBaseUser: string = 'https://platform.fiwoo.eu/api/user-management/users';  
  // urlBaseUser: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users'; 

  // users service

  // GET USERS
  public getUsers():any {    
    return this.http.get(`${this.urlBaseUser}/users`, {headers: headers}).map(res => res.json());
  } 

  // POST USERS
  public postUser(user:any):any{  
    headers.append('Content-Type', 'application/json');  
    return this.http.post(`${this.urlBaseUser}/users`, user, {headers: headers});     
  }

  // PUT USERS
  public updateUser(user_id:string, user:any ):any{
    headers.append('Content-Type', 'application/json');
     return this.http.put(`${this.urlBaseUser}/users/${user_id}`, user, {headers: headers});
  }

  // DELETE USERS
  public deleteUser(user_id:any){
    return this.http.delete(`${this.urlBaseUser}/users/${user_id}`, {headers: headers});
  }

  // assets service

   // GET ASSETS
   public getAssets():any{
    return this.http.get(`${this.urlBaseUser}/assets`, {headers: headers}).map(res => res.json());
  } 

  // POST ASSETS
  public postAsset(asset:any):any{    
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.urlBaseUser}/assets`, asset, {headers: headers});     
  }

  // PUT ASSETS
  public updateAsset(asset_id:string, asset:any ):any{
    headers.append('Content-Type', 'application/json');
     return this.http.put(`${this.urlBaseUser}/assets/${asset_id}`, asset, {headers: headers});
  }

  // DELETE ASSETS
  public deleteAsset(asset_id:any){
    return this.http.delete(`${this.urlBaseUser}/assets/${asset_id}`, {headers: headers});
  }

  // roles service

  // GET ROLES
  public getRoles():any{
    return this.http.get(`${this.urlBaseUser}/roles`, {headers: headers}).map(res => res.json());
  } 

  // POST ROLES
  public postRol(rol:any):any{   
    headers.append('Content-Type', 'application/json'); 
    return this.http.post(`${this.urlBaseUser}/roles`, rol, {headers: headers});     
  }

  // PUT ROLES
  public updateRol(rol_id:string, rol:any ):any{
    headers.append('Content-Type', 'application/json');
     return this.http.put(`${this.urlBaseUser}/roles/${rol_id}`, rol, {headers: headers});
  }

  // DELETE ROLES
  public deleteRol(rol_id:any){
    return this.http.delete(`${this.urlBaseUser}/roles/${rol_id}`, {headers: headers});
  }


  // resources service
  // GET RESOURCES
  public getResources():any{
    return this.http.get(`${this.urlBaseUser}/resources`, {headers: headers}).map(res => res.json());
  } 

  // devices service

  // templates service

  
}
