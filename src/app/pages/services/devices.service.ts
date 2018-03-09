import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DevicesService extends BaseService {

  constructor(public http: HttpClient) {
    super(http);
   }


  // UPDATE ATTRIBUTE
  public updateAttribute(deviceId: string, attributeId: string, body:any):any {
    return this.http.put(`${this.urlBaseDevices}${this.endPointDevices}/${deviceId}${this.endPointAttrs}/${attributeId}`, body);
  }

}
