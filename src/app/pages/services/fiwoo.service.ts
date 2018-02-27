import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from "um_fiwoo";
import { BaseService } from './base.service';

let headers = new Headers();

let token: any;
let auth: any;

@Injectable()
export class FiwooService extends BaseService {  

  isLoggedIn: boolean;
  redirectUrl: string;

  constructor(public http: Http) { 
    super(http);
   }
  // LOGIN
  public doLogin(login):any {
    this.configureLogin();
    return this.http.post(`${this.urlBaseLogin}${this.endPointLogin}`, login, {headers: headers});     
  }

  // LOGOUT
  public doLogout():any {
    this.configureGET();
    return this.http.get(`${this.urlBaseLogin}${this.endPointLogout}`, {headers: headers});     
  }


  // GET USERS
  public getMe():any {
    this.configureGET();
    return this.http.get(`${this.urlBaseUsers}${this.endPointMe}`, {headers: headers}).map(res => res.json());
  } 


  // GET USERS
  public getUsers():any {
    this.configureGET();
    return this.http.get(`${this.urlBaseUsers}${this.endPointUsers}`, {headers: headers}).map(res => res.json());
  } 

  // POST USERS
  public postUser(user:any):any{
    this.configureOthers();
    return this.http.post(`${this.urlBaseUsers}${this.endPointUsers}`, user, {headers: headers});     
  }

  // PUT USERS
  public updateUser(user_id:string, user:any ):any{
    this.configureOthers();
     return this.http.put(`${this.urlBaseUsers}${this.endPointUsers}/${user_id}`, user, {headers: headers});
  }

  // DELETE USERS
  public deleteUser(user_id:any){
    this.configureOthers();
    return this.http.delete(`${this.urlBaseUsers}${this.endPointUsers}/${user_id}`, {headers: headers});
  }

  // assets service

   // GET ASSETS
   public getAssets():any{
    this.configureGET()
    return this.http.get(`${this.urlBaseUsers}${this.endPointAssets}`, {headers: headers}).map(res => res.json());
  } 

  // POST ASSETS
  public postAsset(asset:any):any{    
    this.configureOthers();
    return this.http.post(`${this.urlBaseUsers}${this.endPointAssets}`, asset, {headers: headers});     
  }

  // PUT ASSETS
  public updateAsset(asset_id:string, asset:any ):any{
    this.configureOthers();
     return this.http.put(`${this.urlBaseUsers}${this.endPointAssets}/${asset_id}`, asset, {headers: headers});
  }

  // DELETE ASSETS
  public deleteAsset(asset_id:any){
    this.configureOthers();
    return this.http.delete(`${this.urlBaseUsers}${this.endPointAssets}/${asset_id}`, {headers: headers});
  }

  // roles service

  // GET ROLES
  public getRoles():any{
    this.configureGET()
    return this.http.get(`${this.urlBaseUsers}${this.endPointRoles}`, {headers: headers}).map(res => res.json());
  } 

  // POST ROLES
  public postRol(rol:any):any{
    this.configureOthers();
    return this.http.post(`${this.urlBaseUsers}${this.endPointRoles}`, rol, {headers: headers});     
  }

  // PUT ROLES
  public updateRol(rol_id:string, rol:any ):any{
    this.configureOthers();
     return this.http.put(`${this.urlBaseUsers}${this.endPointRoles}/${rol_id}`, rol, {headers: headers});
  }

  // DELETE ROLES
  public deleteRol(rol_id:any){
    this.configureOthers();
    return this.http.delete(`${this.urlBaseUsers}${this.endPointRoles}/${rol_id}`, {headers: headers});
  }


  // resources service
  // GET RESOURCES
  public getResources():any{
    this.configureGET();
    return this.http.get(`${this.urlBaseUsers}${this.endPointResources}`, {headers: headers}).map(res => res.json());
  } 

  // devices service

  // templates service



  // BI: models service

  // GET
  public getModels():any{
    this.configureGET()
    return this.http.get(`${this.urlBI}${this.endPointModels}`, {headers: headers}).map(res => res.json());
  } 

  // DELETE
  public deleteModel(model_id:any){
    this.configureOthers();
    return this.http.delete(`${this.urlBI}${this.endPointModels}/${model_id}`, {headers: headers});
  }


  
}
