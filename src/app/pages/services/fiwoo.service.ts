import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable()
export class FiwooService extends BaseService {

  isLoggedIn: boolean;
  redirectUrl: string;

  constructor(public http: HttpClient) {
    super(http);
  }

  // REGISTER
  public doRegister(user):any {
    return this.http.post(`${this.urlBaseUsers}${this.endPointUsers}`, user);
  }

  // LOGIN
  public doLogin(login):any {
    return this.http.post(`${this.urlBaseUsers}${this.endPointLogin}`, login);
  }

  // LOGOUT
  public doLogout():any {
    return this.http.get(`${this.urlBaseUsers}${this.endPointLogout}`);
  }

  // GET USERS
  public getMe():any {
    return this.http.get(`${this.urlBaseUsers}${this.endPointMe}`);
  }

  // GET USERS
  public getUsers():any {
    return this.http.get(`${this.urlBaseUsers}${this.endPointUsers}`);
  }

  // POST USERS
  public postUser(user:any):any{
    return this.http.post(`${this.urlBaseUsers}${this.endPointUsers}`, user);
  }

  // PUT USERS
  public updateUser(user_id:string, user:any ):any{
     return this.http.put(`${this.urlBaseUsers}${this.endPointUsers}/${user_id}`, user);
  }

  // DELETE USERS
  public deleteUser(user_id:any){
    return this.http.delete(`${this.urlBaseUsers}${this.endPointUsers}/${user_id}`);
  }

  // assets service

   // GET ASSETS
  public getAssets():any{
    return this.http.get(`${this.urlBaseUsers}${this.endPointAssets}`);
  }

  // POST ASSETS
  public postAsset(asset:any):any{
    return this.http.post(`${this.urlBaseUsers}${this.endPointAssets}`, asset);
  }

  // PUT ASSETS
  public updateAsset(asset_id:string, asset:any ):any{
    return this.http.put(`${this.urlBaseUsers}${this.endPointAssets}/${asset_id}`, asset);
  }

  // DELETE ASSETS
  public deleteAsset(asset_id:any){
    return this.http.delete(`${this.urlBaseUsers}${this.endPointAssets}/${asset_id}`);
  }

  // roles service

  // GET ROLES
  public getRoles():any{
    return this.http.get(`${this.urlBaseUsers}${this.endPointRoles}`);
  }

  // POST ROLES
  public postRol(rol:any):any{
    return this.http.post(`${this.urlBaseUsers}${this.endPointRoles}`, rol);
  }

  // PUT ROLES
  public updateRol(rol_id:string, rol:any ):any{
     return this.http.put(`${this.urlBaseUsers}${this.endPointRoles}/${rol_id}`, rol);
  }

  // DELETE ROLES
  public deleteRol(rol_id:any){
    return this.http.delete(`${this.urlBaseUsers}${this.endPointRoles}/${rol_id}`);
  }


  // resources service
  // GET RESOURCES
  public getResources():any{
    return this.http.get(`${this.urlBaseUsers}${this.endPointResources}`);
  }

}
