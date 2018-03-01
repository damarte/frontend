import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Http } from '@angular/http';

@Injectable()
export class GisService extends BaseService {

  constructor(public http: Http) { 
    super(http);
   }


  // GET GIS DATA
  public getGISData():any {
    this.configureGET();
    return this.http.get(`${this.urlBaseGIS}${this.endPointGIS}`, {headers: this.headers}).map(res => res.json());
  }
}
