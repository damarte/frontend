import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './base.service';

@Injectable()
export class FiwooService extends BaseService {

  isLoggedIn: boolean;
  redirectUrl: string;

  constructor(public http: Http) {
    super(http);
  }

  // REGISTER
  public doRegister(user):any {
    return this.http.post(`${this.urlBaseUsers}${this.endPointUsers}`, user);
  }

  // LOGIN
  public doLogin(login):any {
    this.configureLogin();
    return this.http.post(`${this.urlBaseLogin}${this.endPointLogin}`, login, {headers: this.headers});
  }

  // LOGOUT
  public doLogout():any {
    this.configureGET();
    return this.http.get(`${this.urlBaseUsers}${this.endPointLogout}`, {headers: this.headers});
  }


  // GET USERS
  public getMe():any {
    this.configureGET();
    return this.http.get(`${this.urlBaseUsers}${this.endPointMe}`, {headers: this.headers}).map(res => res.json());
  }


  // GET USERS
  public getUsers():any {
    this.configureGET();
    return this.http.get(`${this.urlBaseUsers}${this.endPointUsers}`, {headers: this.headers}).map(res => res.json());
  }

  // POST USERS
  public postUser(user:any):any{
    this.configureOthers();
    return this.http.post(`${this.urlBaseUsers}${this.endPointUsers}`, user, {headers: this.headers});
  }

  // PUT USERS
  public updateUser(user_id:string, user:any ):any{
    this.configureOthers();
     return this.http.put(`${this.urlBaseUsers}${this.endPointUsers}/${user_id}`, user, {headers: this.headers});
  }

  // DELETE USERS
  public deleteUser(user_id:any){
    this.configureOthers();
    return this.http.delete(`${this.urlBaseUsers}${this.endPointUsers}/${user_id}`, {headers: this.headers});
  }

  // assets service

   // GET ASSETS
   public getAssets():any{
    this.configureGET()
    return this.http.get(`${this.urlBaseUsers}${this.endPointAssets}`, {headers: this.headers}).map(res => res.json());
  }

  // POST ASSETS
  public postAsset(asset:any):any{
    this.configureOthers();
    return this.http.post(`${this.urlBaseUsers}${this.endPointAssets}`, asset, {headers: this.headers});
  }

  // PUT ASSETS
  public updateAsset(asset_id:string, asset:any ):any{
    this.configureOthers();
     return this.http.put(`${this.urlBaseUsers}${this.endPointAssets}/${asset_id}`, asset, {headers: this.headers});
  }

  // DELETE ASSETS
  public deleteAsset(asset_id:any){
    this.configureOthers();
    return this.http.delete(`${this.urlBaseUsers}${this.endPointAssets}/${asset_id}`, {headers: this.headers});
  }

  // roles service

  // GET ROLES
  public getRoles():any{
    this.configureGET()
    return this.http.get(`${this.urlBaseUsers}${this.endPointRoles}`, {headers: this.headers}).map(res => res.json());
  }

  // POST ROLES
  public postRol(rol:any):any{
    this.configureOthers();
    return this.http.post(`${this.urlBaseUsers}${this.endPointRoles}`, rol, {headers: this.headers});
  }

  // PUT ROLES
  public updateRol(rol_id:string, rol:any ):any{
    this.configureOthers();
     return this.http.put(`${this.urlBaseUsers}${this.endPointRoles}/${rol_id}`, rol, {headers: this.headers});
  }

  // DELETE ROLES
  public deleteRol(rol_id:any){
    this.configureOthers();
    return this.http.delete(`${this.urlBaseUsers}${this.endPointRoles}/${rol_id}`, {headers: this.headers});
  }


  // resources service
  // GET RESOURCES
  public getResources():any{
    this.configureGET();
    return this.http.get(`${this.urlBaseUsers}${this.endPointResources}`, {headers: this.headers}).map(res => res.json());
  }

}
