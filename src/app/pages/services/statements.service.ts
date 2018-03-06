import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Http } from '@angular/http';

@Injectable()
export class StatementsService extends BaseService {

  //TODO ADD HEADERS in CALLS
  // , {headers: this.headers}

  constructor(public http: Http) { 
    super(http);
   }

  // GET UserStatements
  public getUserStatements(userName):any {
    this.configureGET();
    return this.http.get(`${this.urlBaseStatements}/${userName}`).map(res => res.json());
  }

  // DELETE UserStatements
  public deleteUserStatements(statement:any){
    this.configureOthers();
    return this.http.delete(`${this.urlBaseStatements}/${statement}`).map(res => res.json());
  }

  // POST USERS
  public postUserStatement(statement:any){
    this.configureOthers();
    return this.http.post(`${this.urlBaseStatements}${this.endPointAdvanced}${this.endPointStatementAdd}`, statement);     
  }

}
