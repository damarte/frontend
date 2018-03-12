import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class DevicesService extends BaseService {

  constructor(public http: HttpClient) {
    super(http);
   }

  // GET DEVICES



  public getDevices(name?: string, entityName?: string, protocol?: string, entityType?: string, transportProtocol?: string, _public?: boolean, owner?: string, attribute?):any {
    let Params = this.getParamsIOT(name, entityName, protocol, entityType, transportProtocol, _public, owner, attribute);
    return this.http.get(`${this.urlBaseDevices}${this.endPointDevices}`, { params: Params });
  }

  // ADD DEVICES
  public addDevices(device):any {
    return this.http.post(`${this.urlBaseDevices}${this.endPointDevices}`, device);
  }

   // UPDATE DEVICES
   public updateDevice(deviceId, device):any {
    return this.http.put(`${this.urlBaseDevices}${this.endPointDevices}/${deviceId}`, device);
  }

  // DELETE DEVICE
  public deleteDevice(deviceId):any {
    return this.http.delete(`${this.urlBaseDevices}${this.endPointDevices}/${deviceId}`);
  }

  // UPDATE ATTRIBUTE
  public updateAttribute(deviceId: string, attributeId: string, body:any):any {
    return this.http.put(`${this.urlBaseDevices}${this.endPointDevices}/${deviceId}${this.endPointAttrs}/${attributeId}`, body);
  }

  // READ DEVICE ATTRS
  public getDeviceAttrs(deviceId):any {
    return this.http.get(`${this.urlBaseDevices}${this.endPointDevices}/${deviceId}${this.endPointAttrs}`);
  }

  // READ DEVICE ATTR ID
  public getDeviceAttrById(deviceId, attrId):any {
    return this.http.get(`${this.urlBaseDevices}${this.endPointDevices}/${deviceId}${this.endPointAttrs}/${attrId}`);
  }

  // GET DEVICE HISTORICS
  public getHistorics(deviceId, attrId, from?, to?):any {
    let Params = this.getParamsHistorics(deviceId, attrId, from, to);
    return this.http.get(`${this.urlBaseDevices}${this.endPointDevices}${this.endPointHistorics}`,  { params: Params });
  }

  
  //TEMPLATES

  //GET TEMPLATES
  public getTemplates(name?: string, protocol?: string, entityType?: string, transportProtocol?: string, _public?: boolean, owner?: string, attribute?):any {
    let Params = this.getParamsIOT(name, undefined, protocol, entityType, transportProtocol, _public, owner, attribute);
    return this.http.get(`${this.urlBaseDevices}${this.endPointDevices}${this.endPointTemplates}`,  { params: Params });
  }

   // ADD TEMPLATE
   public addTemplate(template):any {
    return this.http.post(`${this.urlBaseDevices}${this.endPointDevices}${this.endPointTemplates}`, template);
  }

   // UPDATE TEMPLATE
   public updateTemplate(templateId, template):any {
    return this.http.put(`${this.urlBaseDevices}${this.endPointDevices}${this.endPointTemplates}/${templateId}`, template);
  }

   // DELETE TEMPLATE
   public deleteTemplate(templateId):any {
    return this.http.delete(`${this.urlBaseDevices}${this.endPointDevices}${this.endPointTemplates}/${templateId}`);
  }









  protected getParamsIOT (name?: string, entityName?: string, protocol?: string, entityType?: string, transportProtocol?: string, _public?: boolean, owner?: string, attribute?){
    let Params = new HttpParams();
    if (name != undefined){
      Params = Params.append('name', name);
    }
    if (entityName != undefined){
      Params = Params.append('entityName', entityName);
    }
    if (protocol != undefined){
      Params = Params.append('protocol', protocol);
    }
    if (entityType != undefined){
      Params = Params.append('entityType', entityType);
    }
    if (transportProtocol != undefined){
      Params = Params.append('transportProtocol', transportProtocol);
    }
    if (_public != undefined){
      Params = Params.append('_public', _public ? "true": "false");
    }
    if (owner != undefined){
      Params = Params.append('owner', owner);
    }
    if (attribute != undefined){
      Params = Params.append('attribute', attribute);
    }
    
    return Params;
  }

  protected getParamsHistorics (deviceId:string, attrId:string, from?: string, to?: string){
    let Params = new HttpParams();
    if (deviceId != undefined){
      Params = Params.append('id', deviceId);
    }
    if (attrId != undefined){
      Params = Params.append('attribute', attrId);
    }
    if (from != undefined){
      Params = Params.append('from', from);
    }
    if (to != undefined){
      Params = Params.append('to', to);
    }
    
    return Params;
  }
  
}
