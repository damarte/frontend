import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Http } from '@angular/http';

@Injectable()
export class DensityMapService extends BaseService {

  constructor(public http: Http) { 
    super(http);
   }


  // GET Density Map
  public getDensityMap():any {
    this.configureGET();
    return this.http.get(`${this.urlBaseDensityMaps}?city=0`, {headers: this.headers}).map(res => res.json());
  }

}
