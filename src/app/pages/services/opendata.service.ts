import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OpenData, OpenDataMedia, OpenDataFormat, OpenDataTopic } from '../open-data/models/open.data';
import { BaseService } from './base.service';

@Injectable()
export class OpendataService extends BaseService{

  constructor(public http: HttpClient) {
   super(http);
  }
  
  // GET TOPICS
  public getTopics():any {
    return this.http.get(`${this.urlBaseOpenData}${this.endPointOpenDataTags}`);
  }

  public getPackages (): any{
    return this.http.get(`${this.urlBaseOpenData}${this.endPointOpenDataPackages}`);
  }
  public getPackage (package_name: string): any{
    return this.http.get(`${this.urlBaseOpenData}${this.endPointOpenDataPackageInfo}/${package_name}`);
  }

}
