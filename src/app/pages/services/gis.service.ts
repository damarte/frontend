import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GisService extends BaseService {

  constructor(public http: HttpClient) {
    super(http);
   }


  // GET GIS DATA
  public getGISData():any {
    return this.http.get(`${this.urlBaseGIS}${this.endPointGIS}`);
  }
}
