import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from "um_fiwoo";

let headers = new Headers();

let token: any;
let auth: any;

@Injectable()
export class FiwooService {  

  isLoggedIn: boolean;
  redirectUrl: string;

  constructor(private http: Http) {
    token = localStorage.getItem('access_token');

    auth = 'Bearer ' + token ;
    auth = auth.replace(/"([^"]+(?="))"/g, '$1');

    console.log('Headers: ', headers);
  }

    // urlBaseUser: string = 'https://platform.fiwoo.eu/api/user-management/users';  
    // urlLogin: string = 'https://us1.fiwoo.eu:7000/users'; 
    urlBI: string = "";
    urlBaseUser: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';
    urlLogin: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';
   

   private configureGET(){
      headers = new Headers();
      headers.append('Authorization', auth);
   }
   private configureLogin(){
    headers = new Headers();
    headers.append(
      "Authorization",
      "Basic c2VsZWN0NGNpdGllczp3LUB5N0ZDKX55IzlLdWouYkBfTHRyM24mYW1G"
    );
   }
   private configureOthers(){
      headers = new Headers();
      headers.append('Authorization', auth);
      headers.append('Content-Type', 'application/json');
   }
   
  // users service

  // LOGIN
  public doLogin(login):any {
    this.configureLogin();
    return this.http.post(`${this.urlLogin}/login`, login, {headers: headers});     
  }

  // LOGOUT
  public doLogout():any {
    this.configureGET();
    return this.http.get(`${this.urlLogin}/users/logout`, {headers: headers});     
  }


  // GET USERS
  public getMe():any {
    this.configureGET();
    return this.http.get(`${this.urlBaseUser}/me`, {headers: headers}).map(res => res.json());
  } 


  // GET USERS
  public getUsers():any {
    this.configureGET();
    return this.http.get(`${this.urlBaseUser}/users`, {headers: headers}).map(res => res.json());
  } 

  // POST USERS
  public postUser(user:any):any{
    this.configureOthers();
    return this.http.post(`${this.urlBaseUser}/users`, user, {headers: headers});     
  }

  // PUT USERS
  public updateUser(user_id:string, user:any ):any{
    this.configureOthers();
     return this.http.put(`${this.urlBaseUser}/users/${user_id}`, user, {headers: headers});
  }

  // DELETE USERS
  public deleteUser(user_id:any){
    this.configureOthers();
    return this.http.delete(`${this.urlBaseUser}/users/${user_id}`, {headers: headers});
  }

  // assets service

   // GET ASSETS
   public getAssets():any{
    this.configureGET()
    return this.http.get(`${this.urlBaseUser}/assets`, {headers: headers}).map(res => res.json());
  } 

  // POST ASSETS
  public postAsset(asset:any):any{    
    this.configureOthers();
    return this.http.post(`${this.urlBaseUser}/assets`, asset, {headers: headers});     
  }

  // PUT ASSETS
  public updateAsset(asset_id:string, asset:any ):any{
    this.configureOthers();
     return this.http.put(`${this.urlBaseUser}/assets/${asset_id}`, asset, {headers: headers});
  }

  // DELETE ASSETS
  public deleteAsset(asset_id:any){
    this.configureOthers();
    return this.http.delete(`${this.urlBaseUser}/assets/${asset_id}`, {headers: headers});
  }

  // roles service

  // GET ROLES
  public getRoles():any{
    this.configureGET()
    return this.http.get(`${this.urlBaseUser}/roles`, {headers: headers}).map(res => res.json());
  } 

  // POST ROLES
  public postRol(rol:any):any{
    this.configureOthers();
    return this.http.post(`${this.urlBaseUser}/roles`, rol, {headers: headers});     
  }

  // PUT ROLES
  public updateRol(rol_id:string, rol:any ):any{
    this.configureOthers();
     return this.http.put(`${this.urlBaseUser}/roles/${rol_id}`, rol, {headers: headers});
  }

  // DELETE ROLES
  public deleteRol(rol_id:any){
    this.configureOthers();
    return this.http.delete(`${this.urlBaseUser}/roles/${rol_id}`, {headers: headers});
  }


  // resources service
  // GET RESOURCES
  public getResources():any{
    this.configureGET();
    return this.http.get(`${this.urlBaseUser}/resources`, {headers: headers}).map(res => res.json());
  } 

  // devices service

  // templates service



  // BI: models service

  // GET
  public getModels():any{
    this.configureGET()
    return this.http.get(`${this.urlBI}/models`, {headers: headers}).map(res => res.json());
  } 

  // DELETE
  public deleteModel(model_id:any){
    this.configureOthers();
    return this.http.delete(`${this.urlBI}/models/${model_id}`, {headers: headers});
  }


  
}
