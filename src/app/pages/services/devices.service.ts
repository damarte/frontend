import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Http } from '@angular/http';


@Injectable()
export class DevicesService extends BaseService {

  constructor(public http: Http) { 
    super(http);
   }


  // UPDATE ATTRIBUTE
  public updateAttribute(deviceId: string, attributeId: string, body:any):any {
    this.configureOthers();
    return this.http.put(`${this.urlBaseDevices}${this.endPointDevices}/${deviceId}${this.endPointAttrs}/${attributeId}`, body, {headers: this.headers});
  }

}
